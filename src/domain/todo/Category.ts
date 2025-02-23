import { Todo } from './Todo';

// 集約ルートの例
export class Category {
  private constructor(
    private readonly _id: string,
    private _name: string,
    private _todos: Todo[] = []
  ) {
    this.validateName(_name);
  }

  private validateName(name: string): void {
    if (name.length < 2) {
      throw new Error('カテゴリ名は2文字以上である必要があります');
    }
  }

  static create(id: string, name: string): Category {
    return new Category(id, name);
  }

  addTodo(todo: Todo): void {
    this._todos.push(todo);
  }

  removeTodo(todoId: string): void {
    this._todos = this._todos.filter(todo => todo.id !== todoId);
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get todos(): Todo[] { return [...this._todos]; }
} 