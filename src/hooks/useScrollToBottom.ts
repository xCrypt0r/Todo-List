import { useLayoutEffect, useRef } from 'react';

export function useScrollToBottom(dependencies: any[]) {
    const scrollRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [...dependencies]);

    return scrollRef;
}
