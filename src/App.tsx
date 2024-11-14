import { TodoInput, TodoList } from '@components';
import './App.css';

function App() {
    return (
        <>
            <div className="container">
                <h2>Todo List</h2>
                <TodoInput />
                <TodoList />
            </div>
        </>
    );
}

export default App;
