import { type TodoItem } from '@globals/types';
import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

type State = {
    todoList: TodoItem[];
};
type Actions = {
    actions: {
        addItem: (content: TodoItem['content']) => void;
        checkItem: (id: TodoItem['id'], checked: boolean) => void;
        deleteItem: (id: TodoItem['id']) => void;
        deleteAllItems: () => void;
        editItem: (id: TodoItem['id'], content: TodoItem['content']) => void;
    };
};
export type TodoListSlice = State & Actions;

const getInitialState = () => {
    const todoList = JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_NAME) ?? '[]') as TodoItem[];

    return todoList;
};

export const todoListSlice: StateCreator<TodoListSlice> = (set, get) => ({
    todoList: getInitialState(),
    actions: {
        addItem: (content: TodoItem['content']) =>
            set(() => ({
                todoList: [...get().todoList, { id: uuidv4(), content, done: false }]
            })),
        checkItem: (id: TodoItem['id'], checked: boolean) =>
            set(() => ({
                todoList: get().todoList.map((t) => (t.id === id ? { ...t, done: checked } : t))
            })),
        deleteItem: (id: TodoItem['id']) =>
            set({
                todoList: get().todoList.filter((t) => t.id !== id)
            }),
        deleteAllItems: () => set({ todoList: [] }),
        editItem: (id: TodoItem['id'], content: TodoItem['content']) =>
            set(() => ({
                todoList: get().todoList.map((t) =>
                    t.id === id ? { ...t, content, done: t.done && t.content === content } : t
                )
            }))
    }
});
