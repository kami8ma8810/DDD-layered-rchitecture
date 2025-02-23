import React from 'react';
import { createRoot } from 'react-dom/client';
import { TodoList } from './presentation/components/TodoList';
import { TodoService } from './application/todo/TodoService';
import { InMemoryTodoRepository } from './infrastructure/todo/InMemoryTodoRepository';
import { InMemoryCategoryRepository } from './infrastructure/todo/InMemoryCategoryRepository';
import './index.css';
import { TutorialProvider } from './contexts/TutorialContext';

// アプリケーションの初期化
const todoRepository = new InMemoryTodoRepository();
const categoryRepository = new InMemoryCategoryRepository();
const todoService = new TodoService(todoRepository, categoryRepository);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TutorialProvider>
        <TodoList todoService={todoService} />
      </TutorialProvider>
    </React.StrictMode>
  );
} 