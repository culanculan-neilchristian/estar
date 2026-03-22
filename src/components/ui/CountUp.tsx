'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
    shouldAnimate?: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ 
    end, 
    duration = 2000, 
    decimals = 0,
    suffix = '',
    shouldAnimate = true
}) => {
    const [count, setCount] = useState(shouldAnimate ? 0 : end);
    const [isCounting, setIsCounting] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!shouldAnimate) return;

        const currentRef = containerRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsCounting(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [shouldAnimate]);

    useEffect(() => {
        if (!isCounting) return;

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / duration, 1);
            
            const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            setCount(easeOutExpo * end);

            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            startTimeRef.current = null;
        };
    }, [end, duration, isCounting]);

    const formattedCount = count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return (
        <span ref={containerRef}>{formattedCount}{suffix}</span>
    );
};

export default CountUp;
