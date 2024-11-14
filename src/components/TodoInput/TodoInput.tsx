import { useTodoInput } from '@hooks';
import styles from './TodoInput.module.css';

export function TodoInput() {
    const { todo, todoInputRef, handleTodoChange, handleKeyDown } = useTodoInput();

    return (
        <div className={styles.container}>
            <input
                className={styles.todoInput}
                ref={todoInputRef}
                type="text"
                name="todo"
                value={todo}
                placeholder="New Todo"
                autoComplete="off"
                autoFocus
                onChange={handleTodoChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
