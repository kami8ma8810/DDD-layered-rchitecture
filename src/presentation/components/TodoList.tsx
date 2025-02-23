// 既存のimportに追加
import { TUTORIAL_STEPS } from '../../constants/tutorialSteps';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import { Priority } from '../../domain/todo/Priority';

// プレゼンテーションレイヤー
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Todo } from '../../domain/todo/Todo';
import { TodoService } from '../../application/todo/TodoService';
import { useTutorial } from '../../contexts/TutorialContext';

interface TodoListProps {
  todoService: TodoService;
}

// 共通のスタイル定義を更新
const COMMON_STYLES = {
  container: "min-h-[100svh] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-2 sm:p-4 md:py-20",
  innerContainer: "container mx-auto px-2 sm:px-4 md:px-8 max-w-3xl",
  card: "card bg-white shadow-2xl border-2 border-primary/10 backdrop-blur-sm rounded-xl md:rounded-3xl",
  cardBody: "card-body p-3 sm:p-6 md:p-10 lg:p-14", // パディングを調整
  title: "text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-6 font-serif tracking-wide drop-shadow-md mt-8 sm:mt-0", // マージントップを追加
  subtitle: "badge badge-lg badge-primary badge-outline py-2 sm:py-4 px-3 sm:px-6 font-medium text-sm sm:text-base shadow-sm",
  headerSection: "text-center mb-6 sm:mb-8 md:mb-12", // マージンを調整
};

// Todoアイテムのコンポーネントを分離
const TodoItem: React.FC<{
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onUpdatePriority: (id: string, priority: string) => void;
}> = ({ todo, onComplete, onDelete, onUpdateTitle, onUpdatePriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // キーボードイベントハンドラーを更新
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editTitle.length >= 3) {
        onUpdateTitle(todo.id, editTitle);
        setIsEditing(false);
      }
    }
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  // TodoItemコンポーネントのスタイル定義を追加
  const BUTTON_STYLES = {
    base: "btn relative group px-3 h-10",
    tooltip: "invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap",
  };

  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-all duration-200">
      <div className="p-3 sm:p-6"> {/* パディングを調整 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            {isEditing ? (
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="input input-bordered w-full h-10 text-base px-3"
                      autoFocus
                      name="todo-title"
                      onKeyDown={handleKeyDown}
                      placeholder="Todoのタイトルを入力"
                    />
                    <div className="text-xs text-gray-500 mt-1 px-1">
                      {editTitle.length}/50文字 (3文字以上)
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditTitle(todo.title);
                        setIsEditing(false);
                      }}
                      className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 min-w-[4rem]"
                      type="button"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={() => {
                        if (editTitle.length >= 3) {
                          onUpdateTitle(todo.id, editTitle);
                          setIsEditing(false);
                        }
                      }}
                      className={`btn btn-sm min-w-[4rem] ${
                        editTitle.length >= 3 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={editTitle.length < 3}
                      type="button"
                    >
                      保存
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div 
                  role="status"
                  className={`
                    px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium whitespace-nowrap
                    ${todo.completed 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'}
                  `}
                >
                  {todo.completed ? '完了' : '未完了'}
                </div>
                <h3 className={`
                  text-sm sm:text-base font-medium flex-1 break-all
                  ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}
                `}>
                  {todo.title}
                </h3>
              </>
            )}
          </div>
          
          {/* ボタングループをスマホでは下に配置 */}
          {!isEditing && (
            <div role="toolbar" className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
              {!todo.completed && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`${BUTTON_STYLES.base} text-gray-600 hover:bg-gray-100 hover:text-gray-900`}
                    type="button"
                  >
                    <span className={BUTTON_STYLES.tooltip}>編集</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onComplete(todo.id)}
                    className={`${BUTTON_STYLES.base} bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 border border-green-200`}
                    type="button"
                  >
                    <span className={BUTTON_STYLES.tooltip}>完了</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  if (window.confirm('このTodoを削除してもよろしいですか？')) {
                    onDelete(todo.id);
                  }
                }}
                className={`${BUTTON_STYLES.base} bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200`}
                type="button"
              >
                <span className={BUTTON_STYLES.tooltip}>削除</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* 優先度と更新日時を2行に分ける（スマホ） */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <label htmlFor={`priority-${todo.id}`} className="text-sm text-gray-600">優先度:</label>
            <select
              id={`priority-${todo.id}`}
              value={todo.priority.toString()}
              onChange={(e) => onUpdatePriority(todo.id, e.target.value)}
              className="select select-bordered select-sm h-8 min-h-[2rem] text-sm"
              disabled={todo.completed}
              name="priority"
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
          <time 
            dateTime={todo.updatedAt.toISOString()}
            className="text-xs sm:text-sm text-gray-500"
          >
            最終更新: {formatDate(todo.updatedAt)}
          </time>
        </div>
      </div>
    </article>
  );
};

// 日付フォーマット用のヘルパー関数
const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return '今';
  if (minutes < 60) return `${minutes}分前`;
  if (hours < 24) return `${hours}時間前`;
  if (days < 7) return `${days}日前`;

  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// TodoListコンポーネントのソート関連の型と状態を更新
type SortType = 'priority' | 'createdAt' | 'updatedAt';

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
  const [sortBy, setSortBy] = useState<SortType>('updatedAt');

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  useEffect(() => {
    if (step.code) {
      Prism.highlightAll();
    }
  }, [step.code]);

  const loadTodos = async () => {
    const loadedTodos = await todoService.getAllTodos();
    setTodos(loadedTodos);
  };

  const handleCreateTodo = async () => {
    try {
      await todoService.createTodo(newTodoTitle, 'medium');
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

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      await loadTodos();
      setDddTip('ドメインレイヤー: Todoが削除されました');
    } catch (error) {
      console.error('Todo削除エラー:', error);
    }
  };

  const handleUpdateTitle = async (id: string, newTitle: string) => {
    try {
      await todoService.updateTodoTitle(id, newTitle);
      await loadTodos();
      setDddTip('ドメインレイヤー: Todoのタイトルが更新されました');
    } catch (error) {
      console.error('Todoタイトル更新エラー:', error);
    }
  };

  const handleUpdatePriority = async (id: string, priority: string) => {
    try {
      await todoService.updateTodoPriority(id, priority);
      await loadTodos();
      setDddTip('ドメインレイヤー: Todoの優先度が更新されました');
    } catch (error) {
      console.error('Todo優先度更新エラー:', error);
    }
  };

  // ソート関数を更新
  const sortTodos = (todos: Todo[]) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...todos].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return priorityOrder[a.priority.toString() as keyof typeof priorityOrder] 
            - priorityOrder[b.priority.toString() as keyof typeof priorityOrder];
        case 'createdAt':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'updatedAt':
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        default:
          return 0;
      }
    });
  };

  const groupByPriority = (todos: Todo[]) => {
    return todos.reduce((groups, todo) => {
      const priority = todo.priority.toString();
      if (!groups[priority]) {
        groups[priority] = [];
      }
      groups[priority].push(todo);
      return groups;
    }, {} as Record<string, Todo[]>);
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
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line mb-4">
                      {step.description}
                    </p>
                    {step.learnMoreLink && (
                      <a
                        href={step.learnMoreLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        <span>{step.learnMoreLink.text}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {step.code && (
                  <div className="bg-[#1E1E1E] rounded-xl overflow-hidden mb-8 md:mb-12">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <span className="text-gray-400 text-sm ml-2">TypeScript</span>
                      </div>
                      <span className="text-xs text-gray-500">DDDの実装例</span>
                    </div>
                    <div className="p-4 sm:p-6 overflow-x-auto">
                      <pre className="!bg-transparent !m-0 !p-0">
                        <code
                          className="language-typescript"
                          dangerouslySetInnerHTML={{
                            __html: Prism.highlight(
                              step.code.trim(),
                              Prism.languages.typescript,
                              'typescript'
                            ),
                          }}
                        />
                      </pre>
                    </div>
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
                <div className="flex items-center gap-3 md:gap-4 order-1 sm:order-2">
                  <button
                    onClick={deactivateMode}
                    className="btn btn-ghost text-gray-500 hover:text-gray-600 text-sm w-[100px] sm:w-[120px]"
                  >
                    スキップする
                  </button>
                  <div className="flex gap-2 w-[200px] sm:w-[240px] justify-end">
                    {currentStep > 0 ? (
                      <button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="btn bg-white hover:bg-gray-50 text-blue-500 hover:text-blue-600 border-2 border-blue-200 
                          rounded-xl shadow-sm hover:shadow-md
                          transform hover:-translate-y-0.5 transition-all duration-300
                          h-12 sm:h-14 w-[100px] sm:w-[120px]
                          flex items-center justify-center gap-2"
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
                          h-12 sm:h-14 w-[100px] sm:w-[120px]
                          flex items-center justify-center gap-2"
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
                          h-12 sm:h-14 w-[100px] sm:w-[120px]
                          flex items-center justify-center gap-2"
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
            <div className="mb-8 sm:mb-0 sm:absolute sm:top-4 sm:right-4">
              <button
                onClick={activateMode}
                className="btn btn-link text-blue-500 hover:text-blue-600 normal-case text-sm sm:text-base"
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
                    className={`btn border-0 rounded-xl shadow-lg h-12 sm:h-14 px-6 sm:px-8
                      ${newTodoTitle.length >= 3 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-blue-200/50 transform hover:-translate-y-0.5' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    onClick={handleCreateTodo}
                    disabled={newTodoTitle.length < 3}
                    title={newTodoTitle.length < 3 ? '3文字以上入力してください' : '新しいTodoを追加'}
                  >
                    <span className="font-bold">追加</span>
                  </button>
                </div>
                <div className={`absolute -bottom-6 left-4 text-sm transition-colors duration-200
                  ${newTodoTitle.length < 3 ? 'text-red-500/70' : 'text-blue-500/70'}`}
                >
                  3文字以上で入力してください {newTodoTitle.length > 0 && `(現在${newTodoTitle.length}文字)`}
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

            <section aria-labelledby="todo-list-heading" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 id="todo-list-heading" className="text-lg font-medium text-gray-700">
                  Todoリスト
                </h2>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select">並び順:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="select select-bordered select-sm"
                    name="sort"
                  >
                    <option value="updatedAt">更新日時順</option>
                    <option value="createdAt">作成日時順</option>
                    <option value="priority">優先度順</option>
                  </select>
                </div>
              </div>

              <div className="space-y-8">
                {Object.entries(groupByPriority(sortTodos(todos))).map(([priority, groupTodos]) => (
                  <section key={priority} className="space-y-4">
                    <h3 className={`
                      px-4 py-2 rounded-lg text-sm font-medium inline-block mb-4
                      ${priority === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                        priority === 'medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                        'bg-green-50 text-green-700 border border-green-200'}
                    `}>
                      優先度: {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
                      <span className="ml-2 text-xs">({groupTodos.length})</span>
                    </h3>
                    <div role="list" className="space-y-4">
                      {groupTodos.map(todo => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onComplete={handleCompleteTodo}
                          onDelete={handleDeleteTodo}
                          onUpdateTitle={handleUpdateTitle}
                          onUpdatePriority={handleUpdatePriority}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>

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