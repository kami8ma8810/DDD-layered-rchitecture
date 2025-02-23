# DDD Learning Todo App 📝

[日本語](./README.md) ｜English

## Overview 🎯

This is a Todo application designed to help learn Domain-Driven Design (DDD) concepts in a practical way.

## Demo 🚀

[Live Demo](https://ddd-layered-rchitecture.vercel.app/)

## Features ✨

- Clean Architecture based design
- Practical learning of DDD patterns
- Modern UI/UX with animations
- Accessibility considerations
- Interactive tutorial system

## Tech Stack 🛠️

- TypeScript
- React
- Tailwind CSS
- DaisyUI
- Vite

## Architecture 🏗️ 

```
src/
├── domain/        # Domain layer: Core business logic
│   ├── todo/      # Todo domain
│   └── shared/    # Shared domain logic
├── application/   # Application layer: Use cases
│   └── todo/      # Todo use cases
├── infrastructure/# Infrastructure layer: External implementations
│   └── todo/      # Todo persistence
└── presentation/  # Presentation layer: UI
    └── components/# UI components
```

## Related Links 🔗

- [DDD Reference](https://www.domainlanguage.com/ddd/)

## License 📄

[MIT](./LICENSE)
