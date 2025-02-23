// アプリケーションサービス
import { Todo } from '../../domain/todo/Todo';
import { TodoRepository } from '../../domain/todo/TodoRepository';
import { CategoryRepository } from '../../domain/todo/CategoryRepository';
import { Priority } from '../../domain/todo/Priority';
import { v4 as uuidv4 } from 'uuid';

export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async createTodo(title: string, priority: string = 'medium'): Promise<Todo> {
    const todo = new Todo(
      uuidv4(),
      title,
      Priority.fromString(priority)
    );
    
    if (todo.categoryId) {
      const category = await this.categoryRepository.findById(todo.categoryId);
      if (!category) throw new Error('カテゴリが見つかりません');
      category.addTodo(todo);
      await this.categoryRepository.save(category);
    }

    await this.todoRepository.save(todo);
    return todo;
  }

  async updateTodoTitle(id: string, newTitle: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new Error('Todoが見つかりません');
    
    todo.updateTitle(newTitle);
    await this.todoRepository.save(todo);
  }

  async updateTodoPriority(id: string, priority: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new Error('Todoが見つかりません');
    
    todo.setPriority(Priority.fromString(priority));
    await this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new Error('Todoが見つかりません');
    
    if (todo.categoryId) {
      const category = await this.categoryRepository.findById(todo.categoryId);
      if (category) {
        category.removeTodo(id);
        await this.categoryRepository.save(category);
      }
    }

    await this.todoRepository.delete(id);
  }

  async completeTodo(id: string): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('Todoが見つかりません');
    }

    // ドメインロジックの実行
    todo.complete();
    await this.todoRepository.save(todo);
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
} 