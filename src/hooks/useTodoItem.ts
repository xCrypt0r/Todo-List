import { type TodoItem } from '@globals/types';
import { useStore } from '@store';
import { useEffect, useRef, useState } from 'react';

export function useTodoItem(todoItem: TodoItem) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newContent, setNewContent] = useState<string>(todoItem.content);
    const todoEditorRef = useRef<HTMLInputElement>(null);
    const { checkItem, deleteItem, editItem } = useStore((state) => state.actions);
    const handleCheckTodoItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkItem(todoItem.id, e.target.checked);
    };
    const handleDeleteTodoItem = () => {
        deleteItem(todoItem.id);
    };
    const handleStartEdit = () => {
        setIsEditing(true);
    };
    const handleEndEdit = () => {
        setIsEditing(false);

        let content = newContent.trim();

        if (content !== '') {
            editItem(todoItem.id, content);
        } else {
            deleteItem(todoItem.id);
        }
    };
    const handleEditTodoItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewContent(e.target.value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            todoEditorRef.current?.blur();
        }
    };

    useEffect(() => {
        if (isEditing) {
            todoEditorRef.current?.focus();
            todoEditorRef.current?.setSelectionRange(todoItem.content.length, todoItem.content.length);
        }
    }, [isEditing]);

    return {
        isEditing,
        newContent,
        todoEditorRef,
        handleCheckTodoItem,
        handleDeleteTodoItem,
        handleStartEdit,
        handleEndEdit,
        handleEditTodoItem,
        handleKeyDown
    };
}
