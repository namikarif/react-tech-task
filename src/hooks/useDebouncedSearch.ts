import { useEffect, useState } from "react";

export function useDebouncedSearch(callbackHandler: () => void, delay: number = 500) {
    const [searchInputValue, setSearchInputValue] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(callbackHandler, delay);

        return () => clearTimeout(timeoutId);
    }, [searchInputValue]);

    return {
        searchInputValue,
        setSearchInputValue,
    };
}
