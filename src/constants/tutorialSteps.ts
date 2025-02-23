export const TUTORIAL_STEPS = [
  {
    title: 'DDD ドメイン駆動設計を学ぼう！',
    description: `DDDは、複雑なビジネスロジックを整理し、より理解しやすいコードを書くための設計手法です。

以下のような課題を解決するのに役立ちます：

• ビジネスルールが複雑で分かりにくい
• コードの保守や機能追加が難しい
• チーム間でビジネスの理解が異なる`,
    highlight: 'header',
  },
  {
    title: 'DDDの基本的な考え方',
    description: `DDDでは、アプリケーションを4つの層（レイヤー）に分けて考えます：

1. ドメインレイヤー
ビジネスルールの中心。「何ができるか」「どんな制約があるか」を定義

2. アプリケーションレイヤー
ユーザーの操作（ユースケース）を実現する層

3. インフラストラクチャレイヤー
データの保存や外部システムとの連携を担当

4. プレゼンテーションレイヤー
ユーザーとのやり取りを担当（画面表示や入力受付）

これらの層を明確に分けることで、コードが整理され、変更や機能追加が容易になります。`,
    highlight: 'overview',
  },
  {
    title: 'なぜレイヤーに分けるの？',
    description: `レイヤーに分ける主なメリットは以下の通りです：

• 関心の分離
それぞれのレイヤーが特定の役割に集中できる

• 変更の影響を局所化
あるレイヤーの変更が他のレイヤーに影響しにくい

• テストのしやすさ
レイヤーごとに独立してテストができる

• チームでの開発効率
役割分担がしやすく、並行して開発できる

このTodoアプリでは、これらのレイヤーを実際に体験できます。`,
    highlight: 'benefits',
  },
  {
    title: 'Todoアプリで学ぶDDD',
    description: `これから、シンプルなTodoアプリを通じてDDDの各レイヤーを見ていきます。

具体的には：
• Todoの作成（タイトルは3文字以上必要）
• Todoの完了
• Todoの一覧表示

という機能を、DDDの考え方に基づいて実装しています。

それでは、各レイヤーの詳細を見ていきましょう！`,
    highlight: 'example',
  },
  {
    title: 'ドメインレイヤー - ビジネスルールの中心',
    description: `ドメインレイヤーは、アプリケーションの中心となる業務ロジックを担当します。

例えば、「Todoのタイトルは3文字以上必要」というルールは、このレイヤーで管理します。`,
    highlight: 'domain',
    code: `
// Todoの基本的なルールを定義
class Todo {
  constructor(
    private id: string,
    private title: string,
    private completed: boolean = false
  ) {
    // タイトルの文字数チェック
    if (title.length < 3) {
      throw new Error('タイトルは3文字以上必要です');
    }
  }
}`,
  },
  {
    title: 'アプリケーションレイヤー - ユースケースの実現',
    description: `アプリケーションレイヤーは、「Todoを作成する」「Todoを完了する」といった、
ユーザーが実際に行う操作（ユースケース）を実現するためのレイヤーです。`,
    highlight: 'application',
    code: `
// Todoアプリの主な操作を管理
class TodoService {
  async createTodo(title: string) {
    // 新しいTodoを作成
    const todo = new Todo(
      generateId(),
      title
    );
    
    // 保存して返却
    await this.repository.save(todo);
    return todo;
  }
}`,
  },
  {
    title: 'インフラストラクチャレイヤー - データの保存',
    description: `インフラストラクチャレイヤーは、データの保存や読み込みを担当します。
    
このアプリではメモリ上にデータを保持していますが、実際のアプリではデータベースなどに保存します。`,
    highlight: 'infrastructure',
    code: `
// データの保存を担当
class TodoRepository {
  private todos = new Map();

  async save(todo: Todo) {
    this.todos.set(todo.id, todo);
  }

  async findAll() {
    return Array.from(this.todos.values());
  }
}`,
  },
  {
    title: 'プレゼンテーションレイヤー - ユーザーとの対話',
    description: `プレゼンテーションレイヤーは、ユーザーインターフェース（UI）を担当します。

ユーザーの入力を受け付け、適切なレイヤーに処理を依頼し、その結果を表示します。今見ているこの画面がまさにプレゼンテーションレイヤーです。`,
    highlight: 'presentation',
  },
]; 