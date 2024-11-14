import { IoMdTrash, RiPencilFill } from '@globals/icons';
import { type TodoItem } from '@globals/types';
import { useTodoItem } from '@hooks';
import styles from './TodoItem.module.css';

interface TodoItemProps {
    todoItem: TodoItem;
}

export function TodoItem({ todoItem }: TodoItemProps) {
    const {
        isEditing,
        newContent,
        todoEditorRef,
        handleCheckTodoItem,
        handleDeleteTodoItem,
        handleStartEdit,
        handleEndEdit,
        handleEditTodoItem,
        handleKeyDown
    } = useTodoItem(todoItem);

    return (
        <div className={styles.container}>
            {isEditing ? (
                <>
                    <input
                        className={styles.todoItemEditing}
                        ref={todoEditorRef}
                        type="text"
                        value={newContent}
                        onBlur={handleEndEdit}
                        onChange={handleEditTodoItem}
                        onKeyDown={handleKeyDown}
                    />
                </>
            ) : (
                <>
                    <input
                        type="checkbox"
                        name="done"
                        checked={todoItem.done}
                        onChange={handleCheckTodoItem}
                    />
                    <li className={styles.todoItem}>
                        <span className={`${todoItem.done ? styles.todoItemDone : ''}`}>{todoItem.content}</span>
                    </li>
                </>
            )}
            <div className={styles.icons}>
                {!isEditing && (
                    <RiPencilFill
                        className={styles.icon}
                        size="1.2rem"
                        color="#ffb606"
                        onClick={handleStartEdit}
                    />
                )}
                <IoMdTrash
                    className={styles.icon}
                    size="1.2rem"
                    color={getComputedStyle(document.documentElement).getPropertyValue('--color-danger')}
                    onClick={handleDeleteTodoItem}
                />
            </div>
        </div>
    );
}
