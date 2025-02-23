// リポジトリインターフェース
import { Todo } from './Todo';

export interface TodoRepository {
  save(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  delete(id: string): Promise<void>;
} 