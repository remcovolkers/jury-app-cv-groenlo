# Development Guide

This guide will help you understand how to work with this hexagonal architecture React application.

## Understanding the Architecture Layers

### 1. Domain Layer (`src/domain/`)
**Purpose**: Contains the core business logic, independent of any external frameworks.

**Key Principles**:
- No dependencies on React, databases, or external libraries
- Defines business entities and their behavior
- Defines ports (interfaces) that outer layers implement

**Example**:
```typescript
// src/domain/entities/Jury.ts
export class JuryEntity implements Jury {
  static create(name: string, category: string): JuryEntity {
    return new JuryEntity(
      crypto.randomUUID(),
      name,
      category,
      new Date()
    );
  }
}
```

### 2. Application Layer (`src/application/`)
**Purpose**: Orchestrates business logic through use cases.

**Key Principles**:
- Depends only on the domain layer
- Implements business workflows
- Uses dependency injection for ports

**Example**:
```typescript
// src/application/use-cases/CreateJury.ts
export class CreateJury {
  constructor(private readonly juryRepository: IJuryRepository) {}
  
  async execute(name: string, category: string): Promise<Jury> {
    const jury = JuryEntity.create(name, category);
    return await this.juryRepository.save(jury);
  }
}
```

### 3. Infrastructure Layer (`src/infrastructure/`)
**Purpose**: Implements domain ports with concrete technologies.

**Key Principles**:
- Implements interfaces defined in domain layer
- Handles external concerns (APIs, databases, file systems)
- Can be swapped without affecting business logic

**Example**:
```typescript
// src/infrastructure/persistence/InMemoryJuryRepository.ts
export class InMemoryJuryRepository implements IJuryRepository {
  private juries: Map<string, Jury> = new Map();
  
  async save(jury: Jury): Promise<Jury> {
    this.juries.set(jury.id, jury);
    return jury;
  }
}
```

### 4. Adapters Layer (`src/adapters/`)
**Purpose**: Adapts external interfaces (UI) to use application use cases.

**Key Principles**:
- Converts UI events to use case calls
- Displays data from use cases to users
- No business logic - only presentation logic

**Example**:
```typescript
// src/adapters/ui/components/JuryList.tsx
export const JuryList: React.FC = () => {
  const handleCreateJury = async (e: React.FormEvent) => {
    await createJury.execute(name, category);
    await loadJuries();
  };
  // ...
}
```

## Adding New Features

### Step-by-Step Guide

#### 1. Define Your Domain
Start by thinking about your business entities and rules.

```typescript
// src/domain/entities/Score.ts
export interface Score {
  id: string;
  juryId: string;
  value: number;
  comment: string;
}
```

#### 2. Create Ports (Interfaces)
Define contracts that infrastructure must implement.

```typescript
// src/domain/ports/IScoreRepository.ts
export interface IScoreRepository {
  getScoresByJuryId(juryId: string): Promise<Score[]>;
  save(score: Score): Promise<Score>;
}
```

#### 3. Implement Use Cases
Create application services that orchestrate business logic.

```typescript
// src/application/use-cases/AddScore.ts
export class AddScore {
  constructor(private readonly scoreRepository: IScoreRepository) {}
  
  async execute(juryId: string, value: number, comment: string): Promise<Score> {
    const score = ScoreEntity.create(juryId, value, comment);
    return await this.scoreRepository.save(score);
  }
}
```

#### 4. Implement Infrastructure
Provide concrete implementations of your ports.

```typescript
// src/infrastructure/persistence/InMemoryScoreRepository.ts
export class InMemoryScoreRepository implements IScoreRepository {
  // Implementation...
}
```

#### 5. Build UI Components
Create React components that use your use cases.

```typescript
// src/adapters/ui/components/ScoreForm.tsx
const handleSubmit = async (e: React.FormEvent) => {
  await addScore.execute(juryId, value, comment);
};
```

## Testing Strategy

### Domain Layer Tests
Test business logic in isolation.

```typescript
describe('JuryEntity', () => {
  it('should create a jury with valid data', () => {
    const jury = JuryEntity.create('Test Jury', 'Technology');
    expect(jury.name).toBe('Test Jury');
    expect(jury.category).toBe('Technology');
  });
});
```

### Application Layer Tests
Test use cases with mocked repositories.

```typescript
describe('CreateJury', () => {
  it('should create and save a jury', async () => {
    const mockRepo = { save: jest.fn() };
    const useCase = new CreateJury(mockRepo);
    await useCase.execute('Test', 'Category');
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
```

### Infrastructure Layer Tests
Test implementations with real or test doubles.

```typescript
describe('InMemoryJuryRepository', () => {
  it('should save and retrieve a jury', async () => {
    const repo = new InMemoryJuryRepository();
    const jury = JuryEntity.create('Test', 'Category');
    await repo.save(jury);
    const retrieved = await repo.getById(jury.id);
    expect(retrieved).toEqual(jury);
  });
});
```

### Adapter Layer Tests
Test UI components with mocked use cases.

```typescript
describe('JuryList', () => {
  it('should display juries', () => {
    render(<JuryList />);
    expect(screen.getByText('Jury Management')).toBeInTheDocument();
  });
});
```

## Dependency Injection

Currently, dependencies are created at the module level in components:

```typescript
const juryRepository = new InMemoryJuryRepository();
const createJury = new CreateJury(juryRepository);
```

### Future Improvements

For larger applications, consider using:

1. **React Context** for dependency injection
2. **InversifyJS** for IoC container
3. **Custom DI container** pattern

Example with React Context:

```typescript
// src/adapters/ui/context/DIContext.tsx
const DIContext = createContext({
  juryRepository: new InMemoryJuryRepository(),
  // other dependencies...
});

export const useDI = () => useContext(DIContext);
```

## Environment Configuration

Use environment variables for configuration:

```typescript
// .env
REACT_APP_API_URL=http://localhost:3001
```

```typescript
// src/infrastructure/api/ApiClient.ts
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

## Common Patterns

### Repository Pattern
All data access goes through repositories that implement domain ports.

### Use Case Pattern
Each user action or business workflow is a separate use case class.

### Dependency Inversion
High-level modules (domain) define interfaces; low-level modules (infrastructure) implement them.

## Best Practices

1. ✅ **Keep domain pure**: No external dependencies in domain layer
2. ✅ **Single Responsibility**: Each use case does one thing
3. ✅ **Interface Segregation**: Small, focused port interfaces
4. ✅ **Dependency Injection**: Pass dependencies through constructors
5. ✅ **Immutability**: Prefer readonly properties and pure functions

## Troubleshooting

### Issue: Cannot find module
- Check import paths are correct relative to file location
- Verify TypeScript configuration in `tsconfig.json`

### Issue: Tests failing with async code
- Wrap async operations in `act()` for React components
- Use `await` for all async operations in tests

### Issue: Type errors in ports/adapters
- Ensure implementations match interface signatures exactly
- Check that all required methods are implemented

## Resources

- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
