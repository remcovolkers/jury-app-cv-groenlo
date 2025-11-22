# Jury App - CV Groenlo

A React application built with **Hexagonal Architecture** (also known as Ports and Adapters architecture) for the CV Groenlo jury management system.

## Architecture Overview

This project follows the **Hexagonal Architecture** pattern, which separates the application into distinct layers:

```
src/
├── domain/                 # Core business logic (innermost layer)
│   ├── entities/          # Business entities (e.g., Jury)
│   └── ports/             # Interfaces/contracts (e.g., IJuryRepository)
├── application/           # Application services & use cases
│   └── use-cases/         # Business use cases (e.g., GetAllJuries, CreateJury)
├── infrastructure/        # External integrations (outermost layer)
│   ├── api/              # HTTP API clients
│   └── persistence/      # Data persistence implementations
└── adapters/             # Interface adapters
    └── ui/               # User interface layer
        ├── components/   # Reusable UI components
        └── pages/        # Page-level components
```

## Hexagonal Architecture Principles

### 1. **Domain Layer** (Core)
- Contains business entities and rules
- No dependencies on external frameworks or libraries
- Defines ports (interfaces) that outer layers must implement
- Examples: `Jury` entity, `IJuryRepository` port

### 2. **Application Layer**
- Contains use cases that orchestrate business logic
- Depends only on the domain layer
- Examples: `GetAllJuries`, `CreateJury`

### 3. **Infrastructure Layer**
- Implements domain ports
- Handles external concerns (databases, APIs, file systems)
- Examples: `InMemoryJuryRepository`, `ApiClient`

### 4. **Adapters Layer**
- Converts data between external interfaces and internal use cases
- UI components consume use cases
- Examples: `JuryList` component using `GetAllJuries` use case

## Benefits

- **Testability**: Business logic is isolated and easy to test
- **Flexibility**: Easy to swap implementations (e.g., in-memory → database)
- **Maintainability**: Clear separation of concerns
- **Independence**: Domain logic doesn't depend on UI or infrastructure

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
npm install
```

### Available Scripts

#### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

#### `npm test`
Launches the test runner in interactive watch mode

#### `npm run build`
Builds the app for production to the `build` folder

#### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## Project Structure Details

### Domain Layer (`src/domain/`)
```typescript
// entities/Jury.ts - Business entity
export interface Jury {
  id: string;
  name: string;
  category: string;
  createdAt: Date;
}

// ports/IJuryRepository.ts - Contract for data access
export interface IJuryRepository {
  getAll(): Promise<Jury[]>;
  getById(id: string): Promise<Jury | null>;
  save(jury: Jury): Promise<Jury>;
  delete(id: string): Promise<void>;
}
```

### Application Layer (`src/application/`)
```typescript
// use-cases/GetAllJuries.ts
export class GetAllJuries {
  constructor(private readonly juryRepository: IJuryRepository) {}
  async execute(): Promise<Jury[]> {
    return await this.juryRepository.getAll();
  }
}
```

### Infrastructure Layer (`src/infrastructure/`)
```typescript
// persistence/InMemoryJuryRepository.ts
export class InMemoryJuryRepository implements IJuryRepository {
  // Implementation of the port
}
```

### Adapters Layer (`src/adapters/`)
```typescript
// ui/components/JuryList.tsx
// UI component that uses use cases via dependency injection
```

## Extending the Application

### Adding a New Feature

1. **Define entities** in `src/domain/entities/`
2. **Create ports** (interfaces) in `src/domain/ports/`
3. **Implement use cases** in `src/application/use-cases/`
4. **Create infrastructure** implementations in `src/infrastructure/`
5. **Build UI components** in `src/adapters/ui/components/`

### Example: Adding a Delete Jury Feature

```typescript
// 1. Domain port already has delete method in IJuryRepository

// 2. Add use case
// src/application/use-cases/DeleteJury.ts
export class DeleteJury {
  constructor(private readonly juryRepository: IJuryRepository) {}
  async execute(id: string): Promise<void> {
    await this.juryRepository.delete(id);
  }
}

// 3. Infrastructure already implements delete

// 4. Use in UI component
const deleteJury = new DeleteJury(juryRepository);
await deleteJury.execute(juryId);
```

## Testing Strategy

- **Domain Layer**: Unit tests for entities and business rules
- **Application Layer**: Unit tests for use cases with mocked ports
- **Infrastructure Layer**: Integration tests with real implementations
- **Adapters Layer**: Component tests with mocked use cases

## Learn More

- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Documentation](https://reactjs.org/)

## License

This project is licensed under the MIT License.
