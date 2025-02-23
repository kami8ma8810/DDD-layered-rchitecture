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

  const handleCompleteTodo = async (id: string) => {
    try {
      await todoService.completeTodo(id);
      await loadTodos();
      setDddTip('ドメインレイヤー: Todoのステータスが更新されました');
    } catch (error) {
      console.error('Todo完了エラー:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">DDD学習用Todoアプリ</h2>
          <p className="text-base-content/70">
            ドメイン駆動設計の概念を実践的に学ぶためのアプリケーション
          </p>

          <div className="join w-full my-4">
            <input
              type="text"
              value={newTodoTitle}
              onChange={handleInputChange}
              placeholder="新しいTodoを入力"
              className="input input-bordered join-item w-full"
            />
            <button 
              className="btn btn-primary join-item"
              onClick={handleCreateTodo}
            >
              追加
            </button>
          </div>

          {dddTip && (
            <div className="alert alert-info mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{dddTip}</span>
            </div>
          )}

          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="card bg-base-200">
                <div className="card-body p-4 flex-row justify-between items-center">
                  <span className={todo.completed ? 'line-through opacity-50' : ''}>
                    {todo.title}
                  </span>
                  <button
                    className={`btn btn-circle btn-sm ${todo.completed ? 'btn-disabled' : 'btn-success'}`}
                    onClick={() => handleCompleteTodo(todo.id)}
                    disabled={todo.completed}
                  >
                    ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 