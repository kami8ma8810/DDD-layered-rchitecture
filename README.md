# DDD学習用Todoアプリ 📝

日本語｜[English](./README.en.md) 

## 概要 🎯

このアプリケーションは、ドメイン駆動設計（DDD）の概念を実践的に学ぶために作られたTodoアプリです。

## デモ 🚀

[Live Demo](https://ddd-layered-rchitecture.vercel.app/)

## 特徴 ✨

- クリーンアーキテクチャに基づいた設計
- DDDのパターンを実践的に学習
- モダンなUIとインタラクション
- アクセシビリティに配慮
- インタラクティブなチュートリアル

## 技術スタック 🛠️

- TypeScript
- React
- Tailwind CSS
- DaisyUI
- Vite

## アーキテクチャ 🏗️ 

```
src/
├── domain/        # ドメイン層：核となるビジネスロジック
│   ├── todo/      # Todoドメイン
│   └── shared/    # 共有ドメインロジック
├── application/   # アプリケーション層：ユースケース
│   └── todo/      # Todoのユースケース
├── infrastructure/# インフラストラクチャ層：外部実装
│   └── todo/      # Todoの永続化
└── presentation/  # プレゼンテーション層：UI
    └── components/# UIコンポーネント
```

## 関連リンク 🔗

- [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/) - Eric Evans氏による公式リファレンス
- [DDD Quickly](https://www.infoq.com/minibooks/domain-driven-design-quickly/) - DDDの入門書

## ライセンス 📄

[MIT](./LICENSE)
