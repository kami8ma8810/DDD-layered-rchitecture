// ドメインエンティティ
export class Todo {
  private _id: string;
  private _title: string;
  private _completed: boolean;
  private _createdAt: Date;

  constructor(id: string, title: string) {
    this._id = id;
    this._title = title;
    this._completed = false;
    this._createdAt = new Date();
  }

  // バリューオブジェクト
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get completed(): boolean {
    return this._completed;
  }

  // ドメインロジック
  complete(): void {
    this._completed = true;
  }

  uncomplete(): void {
    this._completed = false;
  }

  updateTitle(newTitle: string): void {
    if (newTitle.length < 3) {
      throw new Error('タイトルは3文字以上である必要があります');
    }
    this._title = newTitle;
  }
} 