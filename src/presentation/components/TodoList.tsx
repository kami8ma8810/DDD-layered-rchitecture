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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-20">
      <div className="container mx-auto px-8 max-w-3xl">
        <div className="card bg-white shadow-2xl border-2 border-primary/10 backdrop-blur-sm rounded-3xl">
          <div className="card-body p-10 md:p-14">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-primary mb-8 font-serif tracking-wide drop-shadow-md">
                DDD学習用Todoアプリ
              </h1>
              <div className="badge badge-lg badge-primary badge-outline py-5 px-8 font-medium text-base shadow-sm">
                ドメイン駆動設計の概念を実践的に学ぶためのアプリケーション
              </div>
            </div>

            <div className="form-control w-full mb-16">
              <div className="relative">
                <div className="flex gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={newTodoTitle}
                      onChange={handleInputChange}
                      placeholder="新しいTodoを入力してみましょう！"
                      className="input input-lg w-full pl-16 pr-6 bg-white border-2 border-gray-200 
                        focus:border-blue-400 rounded-2xl shadow-sm hover:border-gray-300 
                        transition-all duration-300"
                    />
                  </div>
                  <button 
                    className="btn btn-lg bg-blue-500 hover:bg-blue-600 text-white border-0 
                      rounded-xl px-8 shadow-lg hover:shadow-blue-200/50 min-w-[120px]
                      transform hover:-translate-y-0.5 transition-all duration-300"
                    onClick={handleCreateTodo}
                  >
                    <span className="font-bold">追加</span>
                  </button>
                </div>
                <div className="absolute -bottom-7 left-5 text-sm text-blue-500/70">
                  3文字以上で入力してください
                </div>
              </div>
            </div>

            {dddTip && (
              <div className="alert bg-blue-50 border-2 border-blue-200 mb-16 p-8 rounded-2xl">
                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-blue-700">DDDのヒント！</h3>
                    <div className="text-blue-600/80 text-lg leading-relaxed">{dddTip}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="bg-white border-2 border-gray-100 hover:border-gray-200 rounded-2xl
                    transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  <div className="p-8 flex justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                      <div className={`
                        px-6 py-3 rounded-xl font-medium text-base
                        ${todo.completed 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'}
                      `}>
                        {todo.completed ? '完了' : '未完了'}
                      </div>
                      <span className={`
                        text-xl font-medium
                        ${todo.completed 
                          ? 'line-through text-gray-400' 
                          : 'text-gray-700'}
                      `}>
                        {todo.title}
                      </span>
                    </div>
                    <button
                      className={`
                        min-w-[3.5rem] h-14 rounded-xl shadow-sm
                        ${todo.completed 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-green-500 hover:bg-green-600 text-white transform hover:-translate-y-0.5'}
                        transition-all duration-300
                      `}
                      onClick={() => handleCompleteTodo(todo.id)}
                      disabled={todo.completed}
                    >
                      <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {todos.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <svg className="w-24 h-24 mx-auto mb-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-2xl font-medium text-gray-600 mb-4">まだTodoがありません</p>
                <p className="text-gray-500 text-lg">新しいTodoを追加してみましょう！</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 