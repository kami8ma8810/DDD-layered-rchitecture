import { Priority } from './Priority';

// ドメインエンティティ
export class Todo {
  private _id: string;
  private _title: string;
  private _completed: boolean;
  private _priority: Priority;
  private _categoryId: string | null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string, 
    title: string,
    priority: Priority = Priority.MEDIUM,
    categoryId: string | null = null
  ) {
    this.validateTitle(title);
    this._id = id;
    this._title = title;
    this._completed = false;
    this._priority = priority;
    this._categoryId = categoryId;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  private validateTitle(title: string): void {
    if (title.length < 3) {
      throw new Error('タイトルは3文字以上である必要があります');
    }
  }

  updateTitle(newTitle: string): void {
    this.validateTitle(newTitle);
    this._title = newTitle;
    this._updatedAt = new Date();
  }

  setPriority(priority: Priority): void {
    this._priority = priority;
    this._updatedAt = new Date();
  }

  setCategory(categoryId: string | null): void {
    this._categoryId = categoryId;
    this._updatedAt = new Date();
  }

  complete(): void {
    this._completed = true;
    this._updatedAt = new Date();
  }

  uncomplete(): void {
    this._completed = false;
    this._updatedAt = new Date();
  }

  // ゲッター
  get id(): string { return this._id; }
  get title(): string { return this._title; }
  get completed(): boolean { return this._completed; }
  get priority(): Priority { return this._priority; }
  get categoryId(): string | null { return this._categoryId; }
  get createdAt(): Date { return new Date(this._createdAt); }
  get updatedAt(): Date { return new Date(this._updatedAt); }
} 