import { useStore } from '@store';
import { useEffect, useRef, useState } from 'react';

export function useTodoInput() {
    const [todo, setTodo] = useState<string>('');
    const addItem = useStore((state) => state.actions.addItem);
    const todoInputRef = useRef<HTMLInputElement>(null);
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();

            let content = todo.trim();

            if (content !== '') {
                addItem(content);
            }

            setTodo('');
        }
    };
    const handleDocumentSlashKeyDown = (e: KeyboardEvent) => {
        if (e.key === '/') {
            e.preventDefault();
            todoInputRef.current?.focus();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleDocumentSlashKeyDown);

        return () => {
            document.removeEventListener('keydown', handleDocumentSlashKeyDown);
        };
    }, []);

    return { todo, todoInputRef, handleTodoChange, handleKeyDown };
}
