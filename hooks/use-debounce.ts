import { useState, useEffect } from "react";

export function useDebounce(value: string, delay = 500, cb?: (value: string) => void) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
            if (cb) cb(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}
