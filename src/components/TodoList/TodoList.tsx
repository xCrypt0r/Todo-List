import { TodoItem } from '@components';
import { useScrollToBottom } from '@hooks';
import { useStore } from '@store';
import { useEffect } from 'react';
import styles from './TodoList.module.css';

export function TodoList() {
    const todoList = useStore((state) => state.todoList);
    const totalCount = todoList.length;
    const leftCount = todoList.filter((todoItem) => !todoItem.done).length;
    const scrollRef = useScrollToBottom([totalCount]);

    useEffect(() => {
        localStorage.setItem(import.meta.env.VITE_LOCAL_STORAGE_NAME, JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className={styles.container}>
            <p>
                {totalCount} todos ({leftCount} left, {totalCount - leftCount} done)
            </p>
            <ul ref={scrollRef}>
                {totalCount > 0 ? (
                    todoList.map((todoItem) => (
                        <TodoItem
                            key={todoItem.id}
                            todoItem={todoItem}
                        />
                    ))
                ) : (
                    <p>Nothing to display</p>
                )}
            </ul>
        </div>
    );
}
