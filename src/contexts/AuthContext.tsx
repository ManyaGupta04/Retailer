import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Retailer } from '../types';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    retailer: Retailer | null;
    loading: boolean;
    signUp: (email: string, password: string, shopName: string, shopAddress?: string, phone?: string) => Promise<{ error: Error | null }>;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    refreshRetailer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [retailer, setRetailer] = useState<Retailer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchRetailerProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchRetailerProfile(session.user.id);
            } else {
                setRetailer(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchRetailerProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('retailers')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code === 'PGRST116') {
                // No retailer profile exists, create one
                console.log('No retailer profile found, creating one...');
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: newRetailer, error: insertError } = await supabase
                        .from('retailers')
                        .insert({
                            id: userId,
                            shop_name: user.user_metadata?.shop_name || 'My Shop',
                            shop_address: user.user_metadata?.shop_address || null,
                            phone: user.user_metadata?.phone || null,
                            email: user.email || '',
                        })
                        .select()
                        .single();

                    if (insertError) {
                        console.error('Error creating retailer profile:', insertError);
                    } else {
                        setRetailer(newRetailer);
                        return;
                    }
                }
            } else if (error) {
                console.error('Error fetching retailer:', error);
            }
            setRetailer(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string, shopName: string, shopAddress?: string, phone?: string) => {
        try {
            // Pass shop info as user metadata - the database trigger will create the retailer profile
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        shop_name: shopName,
                        shop_address: shopAddress || null,
                        phone: phone || null,
                    }
                }
            });

            if (error) return { error };

            // The database trigger 'on_auth_user_created' automatically creates the retailer profile
            // No need to manually insert - it's handled by the trigger with SECURITY DEFINER

            return { error: null };
        } catch (error) {
            return { error: error as Error };
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return { error };
        } catch (error) {
            return { error: error as Error };
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setRetailer(null);
    };

    const refreshRetailer = async () => {
        if (user) {
            await fetchRetailerProfile(user.id);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, retailer, loading, signUp, signIn, signOut, refreshRetailer }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
