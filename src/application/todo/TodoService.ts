// アプリケーションサービス
import { Todo } from '../../domain/todo/Todo';
import { TodoRepository } from '../../domain/todo/TodoRepository';
import { v4 as uuidv4 } from 'uuid';

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodo(title: string): Promise<Todo> {
    // ドメインオブジェクトの生成
    const todo = new Todo(uuidv4(), title);
    
    // 永続化
    await this.todoRepository.save(todo);
    return todo;
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