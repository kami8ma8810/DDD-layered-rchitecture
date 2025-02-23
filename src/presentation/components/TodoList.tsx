// 既存のimportに追加
import { TUTORIAL_STEPS } from '../../constants/tutorialSteps';

// プレゼンテーションレイヤー
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Todo } from '../../domain/todo/Todo';
import { TodoService } from '../../application/todo/TodoService';
import { useTutorial } from '../../contexts/TutorialContext';

interface TodoListProps {
  todoService: TodoService;
}

// 共通のスタイル定義
const COMMON_STYLES = {
  container: "min-h-[100svh] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-2 sm:p-4 md:py-20",
  innerContainer: "container mx-auto px-2 sm:px-4 md:px-8 max-w-3xl",
  card: "card bg-white shadow-2xl border-2 border-primary/10 backdrop-blur-sm rounded-2xl md:rounded-3xl",
  cardBody: "card-body p-4 sm:p-6 md:p-10 lg:p-14",
  title: "text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-6 font-serif tracking-wide drop-shadow-md",
  subtitle: "badge badge-lg badge-primary badge-outline py-2 sm:py-4 px-3 sm:px-6 font-medium text-sm sm:text-base shadow-sm",
  headerSection: "text-center mb-8 md:mb-12",
};

export const TodoList: React.FC<TodoListProps> = ({ todoService }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [dddTip, setDddTip] = useState<string>(
    'ここにDDDの各レイヤーでの動作が表示されます。Todoを追加したり完了したりして、実際のDDDの動きを確認してみましょう！'
  );
  const { 
    isActive, 
    currentStep, 
    nextStep, 
    deactivateMode, 
    activateMode,
    setCurrentStep
  } = useTutorial();
  const step = TUTORIAL_STEPS[currentStep];
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentStep]);

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

  if (isActive) {
    return (
      <div className={COMMON_STYLES.container}>
        <div className={COMMON_STYLES.innerContainer}>
          <div className={COMMON_STYLES.card}>
            <div className={`${COMMON_STYLES.cardBody} flex flex-col h-[calc(100dvh-1rem)] sm:h-[calc(100dvh-2rem)] md:h-[calc(100dvh-10rem)]`}>
              <div className="flex-1 overflow-y-auto pr-2" ref={scrollRef}>
                <div className={COMMON_STYLES.headerSection}>
                  <h1 className={COMMON_STYLES.title}>{step.title}</h1>
                  <div className="max-w-2xl mx-auto text-left">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                </div>

                {step.code && (
                  <div className="bg-gray-900 rounded-xl p-4 sm:p-6 mb-8 md:mb-12 overflow-x-auto">
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-3 md:mb-4">
                      <span className="font-medium">TypeScript</span>
                      <span className="text-xs">DDDの実装例</span>
                    </div>
                    <pre className="text-gray-300 font-mono text-sm md:text-base whitespace-pre-wrap break-words text-left">
                      {step.code}
                    </pre>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100 mt-6 bg-white">
                <div className="flex gap-2 md:gap-3 order-2 sm:order-1">
                  {TUTORIAL_STEPS.map((_, index) => (
                    <span
                      key={index}
                      className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-blue-500 scale-110' 
                          : index < currentStep 
                            ? 'bg-blue-200' 
                            : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 md:gap-4 order-1 sm:order-2 w-full sm:w-auto">
                  <button
                    onClick={deactivateMode}
                    className="btn btn-ghost text-gray-500 hover:text-gray-600 text-sm min-w-[100px] sm:min-w-[120px]"
                  >
                    スキップする
                  </button>
                  <div className="flex gap-2 min-w-[100px] sm:min-w-[120px]">
                    {currentStep > 0 ? (
                      <button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="btn bg-white hover:bg-gray-50 text-blue-500 hover:text-blue-600 border-2 border-blue-200 
                          rounded-xl shadow-sm hover:shadow-md
                          transform hover:-translate-y-0.5 transition-all duration-300
                          h-12 sm:h-14 px-6 sm:px-8 flex-1
                          flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        戻る
                      </button>
                    ) : (
                      <div className="w-[100px] sm:w-[120px]" />
                    )}
                    {currentStep < TUTORIAL_STEPS.length - 1 ? (
                      <button
                        onClick={nextStep}
                        className="btn bg-blue-500 hover:bg-blue-600 text-white border-0 
                          rounded-xl shadow-lg hover:shadow-blue-200/50
                          transform hover:-translate-y-0.5 transition-all duration-300
                          h-12 sm:h-14 px-6 sm:px-8 flex-1
                          flex items-center gap-2"
                      >
                        次へ
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={deactivateMode}
                        className="btn bg-blue-500 hover:bg-blue-600 text-white border-0 
                          rounded-xl shadow-lg hover:shadow-blue-200/50
                          transform hover:-translate-y-0.5 transition-all duration-300
                          h-12 sm:h-14 px-6 sm:px-8 flex-1
                          flex items-center gap-2"
                      >
                        始める
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={COMMON_STYLES.container}>
      <div className={COMMON_STYLES.innerContainer}>
        <div className={COMMON_STYLES.card}>
          <div className={COMMON_STYLES.cardBody}>
            <div className="absolute top-4 right-4">
              <button
                onClick={activateMode}
                className="btn btn-link text-blue-500 hover:text-blue-600 normal-case text-base"
                title="チュートリアルを見る"
              >
                チュートリアルを見る
              </button>
            </div>

            <div className={COMMON_STYLES.headerSection}>
              <h1 className={COMMON_STYLES.title}>
                DDD学習用Todoアプリ
              </h1>
              <div className={COMMON_STYLES.subtitle}>
                ドメイン駆動設計の概念を実践的に学ぶためのアプリケーション
              </div>
            </div>

            <div className="form-control w-full mb-8 sm:mb-12">
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={newTodoTitle}
                      onChange={handleInputChange}
                      placeholder="新しいTodoを入力してみましょう！"
                      className="input w-full pl-12 pr-4 bg-white border-2 border-gray-200 
                        focus:border-blue-400 rounded-xl shadow-sm hover:border-gray-300 
                        transition-all duration-300 h-12 sm:h-14 text-base"
                    />
                  </div>
                  <button 
                    className="btn bg-blue-500 hover:bg-blue-600 text-white border-0 
                      rounded-xl shadow-lg hover:shadow-blue-200/50
                      transform hover:-translate-y-0.5 transition-all duration-300
                      h-12 sm:h-14 px-6 sm:px-8"
                    onClick={handleCreateTodo}
                  >
                    <span className="font-bold">追加</span>
                  </button>
                </div>
                <div className="absolute -bottom-6 left-4 text-sm text-blue-500/70">
                  3文字以上で入力してください
                </div>
              </div>
            </div>

            {dddTip && (
              <div className="alert bg-blue-50 border-2 border-blue-200 mb-8 sm:mb-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-bold text-lg sm:text-xl text-blue-700">DDDのヒント！</h3>
                    <div className="text-blue-600/80 text-sm sm:text-base leading-relaxed">
                      {dddTip}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="bg-white border-2 border-gray-100 hover:border-gray-200 rounded-xl
                    transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                  <div className="p-4 sm:p-6 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`
                        px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base
                        ${todo.completed 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'}
                      `}>
                        {todo.completed ? '完了' : '未完了'}
                      </div>
                      <span className={`
                        text-base sm:text-lg font-medium
                        ${todo.completed 
                          ? 'line-through text-gray-400' 
                          : 'text-gray-700'}
                      `}>
                        {todo.title}
                      </span>
                    </div>
                    <button
                      className={`
                        min-w-[2.5rem] sm:min-w-[3rem] h-10 sm:h-12 rounded-lg shadow-sm
                        ${todo.completed 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-green-500 hover:bg-green-600 text-white transform hover:-translate-y-0.5'}
                        transition-all duration-300
                      `}
                      onClick={() => handleCompleteTodo(todo.id)}
                      disabled={todo.completed}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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