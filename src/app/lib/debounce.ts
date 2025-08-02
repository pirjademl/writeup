import { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<Args extends any[]>(
    func: (...args: Args) => void | Promise<void>,
    delay: number,
) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (...args: Args) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            void func(...args);
        }, delay);
    };
}
