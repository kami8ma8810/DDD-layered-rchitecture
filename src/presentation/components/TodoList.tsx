// プレゼンテーションレイヤー
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Todo } from '../../domain/todo/Todo';
import { TodoService } from '../../application/todo/TodoService';

interface TodoListProps {
  todoService: TodoService;
}

export const TodoList: React.FC<TodoListProps> = ({ todoService }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [dddTip, setDddTip] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const loadedTodos = await todoService.getAllTodos();
    setTodos(loadedTodos);
  };

  const handleCreateTodo = async () => {
    try {
      await todoService.createTodo(newTodoTitle);
      setNewTodoTitle('');
      await loadTodos();
      setDddTip('ドメインレイヤー: Todoエンティティが作成され、バリデーションが実行されました');
    } catch (error) {
      console.error('Todo作成エラー:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  return (
    <div className="_p-4">
      <h1 className="_text-2xl _font-bold _mb-4">DDD学習用Todoアプリ</h1>
      
      <div className="_mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={handleInputChange}
          className="_border _p-2 _mr-2"
          placeholder="新しいTodoを入力"
        />
        <button
          onClick={handleCreateTodo}
          className="_bg-blue-500 _text-white _px-4 _py-2 _rounded"
        >
          追加
        </button>
      </div>

      {dddTip && (
        <div className="_bg-yellow-100 _p-3 _mb-4 _rounded">
          <p className="_text-sm">💡 {dddTip}</p>
        </div>
      )}

      <ul className="_space-y-2">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="_flex _items-center _p-2 _border _rounded"
          >
            <span className={todo.completed ? '_line-through' : ''}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}; 