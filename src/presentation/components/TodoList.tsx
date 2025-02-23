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
    <div className="min-h-screen bg-base-200 py-16 bg-gradient-to-b from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="card bg-base-100 shadow-2xl border-2 border-primary/20">
          <div className="card-body p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-primary mb-6 font-serif tracking-wide">
                DDD学習用Todoアプリ
              </h1>
              <div className="badge badge-primary badge-outline p-4 font-medium text-base">
                ドメイン駆動設計の概念を実践的に学ぶためのアプリケーション
              </div>
            </div>

            <div className="form-control w-full mb-12">
              <div className="join w-full shadow-lg">
                <input
                  type="text"
                  value={newTodoTitle}
                  onChange={handleInputChange}
                  placeholder="新しいTodoを入力してみましょう！"
                  className="input input-bordered input-lg join-item w-full bg-base-100 border-2 focus:border-primary px-6"
                />
                <button 
                  className="btn btn-primary btn-lg join-item hover:btn-secondary transition-colors duration-300 px-8"
                  onClick={handleCreateTodo}
                >
                  <span className="font-bold text-lg">追加</span>
                </button>
              </div>
            </div>

            {dddTip && (
              <div className="alert bg-primary/10 border-2 border-primary mb-12 shadow-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-primary">DDDのヒント！</h3>
                    <div className="text-base-content/80 text-lg leading-relaxed">{dddTip}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="card bg-base-200 hover:bg-base-300 transition-all duration-300 transform hover:-translate-y-1 border border-base-300"
                >
                  <div className="card-body py-6 px-8 flex-row justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className={`
                        badge badge-lg p-4 font-medium text-base
                        ${todo.completed 
                          ? 'badge-success text-success-content' 
                          : 'badge-secondary text-secondary-content'}
                      `}>
                        {todo.completed ? '完了' : '未完了'}
                      </div>
                      <span className={`
                        text-xl font-medium
                        ${todo.completed 
                          ? 'line-through opacity-50' 
                          : 'text-primary'}
                      `}>
                        {todo.title}
                      </span>
                    </div>
                    <button
                      className={`
                        btn btn-circle btn-lg
                        ${todo.completed 
                          ? 'btn-disabled bg-base-300' 
                          : 'btn-success hover:btn-primary'}
                        transition-all duration-300
                      `}
                      onClick={() => handleCompleteTodo(todo.id)}
                      disabled={todo.completed}
                    >
                      <span className="text-2xl">✓</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {todos.length === 0 && (
              <div className="text-center py-16 bg-base-200 rounded-box border-2 border-dashed border-base-300">
                <div className="text-6xl mb-6">📝</div>
                <p className="text-2xl font-medium text-primary mb-3">まだTodoがありません</p>
                <p className="text-base-content/60 text-lg">新しいTodoを追加してみましょう！</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 