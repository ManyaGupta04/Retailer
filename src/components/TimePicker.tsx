import { useState, useRef, useEffect } from 'react';
import './TimePicker.css';

interface TimePickerProps {
    value: string; // e.g., "9:00 AM"
    onChange: (value: string) => void;
    label: string;
}

export default function TimePicker({ value, onChange, label }: TimePickerProps) {
    // Parse initial value
    const parseTime = (timeStr: string) => {
        const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (match) {
            return {
                hour: parseInt(match[1]),
                minute: parseInt(match[2]),
                period: match[3].toUpperCase() as 'AM' | 'PM'
            };
        }
        return { hour: 9, minute: 0, period: 'AM' as const };
    };

    const parsed = parseTime(value);
    const [hour, setHour] = useState(parsed.hour);
    const [minute, setMinute] = useState(parsed.minute);
    const [period, setPeriod] = useState<'AM' | 'PM'>(parsed.period);
    const [isOpen, setIsOpen] = useState(false);

    const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12
    const minutes = Array.from({ length: 60 }, (_, i) => i); // 0-59
    const periods: ('AM' | 'PM')[] = ['AM', 'PM'];

    const hourRef = useRef<HTMLDivElement>(null);
    const minuteRef = useRef<HTMLDivElement>(null);

    // Scroll to selected value when opened
    useEffect(() => {
        if (isOpen) {
            if (hourRef.current) {
                const hourIndex = hours.indexOf(hour);
                hourRef.current.scrollTop = hourIndex * 40;
            }
            if (minuteRef.current) {
                minuteRef.current.scrollTop = minute * 40;
            }
        }
    }, [isOpen, hour, minute]);

    // Update parent when values change
    const updateTime = (h: number, m: number, p: 'AM' | 'PM') => {
        const formattedTime = `${h}:${m.toString().padStart(2, '0')} ${p}`;
        onChange(formattedTime);
    };

    const handleHourSelect = (h: number) => {
        setHour(h);
        updateTime(h, minute, period);
    };

    const handleMinuteSelect = (m: number) => {
        setMinute(m);
        updateTime(hour, m, period);
    };

    const handlePeriodSelect = (p: 'AM' | 'PM') => {
        setPeriod(p);
        updateTime(hour, minute, p);
    };

    const formatDisplayTime = () => {
        return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    return (
        <div className="time-picker-container">
            <label className="time-picker-label">{label}</label>

            <button
                type="button"
                className="time-picker-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="time-picker-icon">🕐</span>
                <span className="time-picker-value">{formatDisplayTime()}</span>
            </button>

            {isOpen && (
                <div className="time-picker-dropdown">
                    <div className="time-picker-header">
                        <span>Select Time</span>
                        <button
                            type="button"
                            className="time-picker-done"
                            onClick={() => setIsOpen(false)}
                        >
                            Done
                        </button>
                    </div>

                    <div className="time-picker-columns">
                        {/* Hours Column */}
                        <div className="time-picker-column" ref={hourRef}>
                            <div className="column-label">Hour</div>
                            <div className="column-scroll">
                                {hours.map(h => (
                                    <div
                                        key={h}
                                        className={`time-option ${h === hour ? 'selected' : ''}`}
                                        onClick={() => handleHourSelect(h)}
                                    >
                                        {h}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Minutes Column */}
                        <div className="time-picker-column" ref={minuteRef}>
                            <div className="column-label">Min</div>
                            <div className="column-scroll">
                                {minutes.map(m => (
                                    <div
                                        key={m}
                                        className={`time-option ${m === minute ? 'selected' : ''}`}
                                        onClick={() => handleMinuteSelect(m)}
                                    >
                                        {m.toString().padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AM/PM Column */}
                        <div className="time-picker-column period-column">
                            <div className="column-label">AM/PM</div>
                            <div className="column-scroll">
                                {periods.map(p => (
                                    <div
                                        key={p}
                                        className={`time-option ${p === period ? 'selected' : ''}`}
                                        onClick={() => handlePeriodSelect(p)}
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
