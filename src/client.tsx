import React from 'react';
import { createRoot } from 'react-dom/client';
import { TodoList } from './presentation/components/TodoList';
import { TodoService } from './application/todo/TodoService';
import { InMemoryTodoRepository } from './infrastructure/todo/InMemoryTodoRepository';
import { InMemoryCategoryRepository } from './infrastructure/todo/InMemoryCategoryRepository';

// クライアントサイドのTodoServiceインスタンスを作成
const todoRepository = new InMemoryTodoRepository();
const categoryRepository = new InMemoryCategoryRepository();
const todoService = new TodoService(todoRepository, categoryRepository);

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TodoList todoService={todoService} />
    </React.StrictMode>
  );
} 