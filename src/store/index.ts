import { type TodoListSlice, todoListSlice } from '@store/todoListSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create<TodoListSlice>()(
    devtools((...a) => ({
        ...todoListSlice(...a)
    }))
);
