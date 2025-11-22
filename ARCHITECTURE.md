# Hexagonal Architecture - Dependency Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADAPTERS LAYER (UI)                          │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  src/adapters/ui/                                      │     │
│  │  - components/JuryList.tsx                             │     │
│  │  - pages/App.tsx                                       │     │
│  └────────────────────────────────────────────────────────┘     │
└────────────────────────┬────────────────────────────────────────┘
                         │ depends on
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  src/application/use-cases/                            │     │
│  │  - GetAllJuries.ts                                     │     │
│  │  - CreateJury.ts                                       │     │
│  └────────────────────────────────────────────────────────┘     │
└────────────────────────┬────────────────────────────────────────┘
                         │ depends on
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER (CORE)                         │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  src/domain/                                           │     │
│  │  - entities/Jury.ts                                    │     │
│  │  - ports/IJuryRepository.ts (interface)                │     │
│  └────────────────────────────────────────────────────────┘     │
└────────────────────────▲────────────────────────────────────────┘
                         │ implements
                         │
┌─────────────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                           │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  src/infrastructure/                                   │     │
│  │  - persistence/InMemoryJuryRepository.ts               │     │
│  │  - api/ApiClient.ts                                    │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

## Key Principles

1. **Dependency Rule**: Dependencies point inward
   - UI/Adapters → Application → Domain
   - Infrastructure → Domain (implements ports)

2. **Domain Independence**: The domain layer has NO dependencies on external layers

3. **Ports**: Interfaces defined in domain, implemented in infrastructure

4. **Adapters**: Convert external data to/from domain models

## Data Flow Example: Creating a Jury

```
User Input (UI)
    │
    ├─> JuryList.tsx (Adapter)
    │       │
    │       ├─> CreateJury.execute() (Use Case)
    │       │       │
    │       │       ├─> JuryEntity.create() (Domain)
    │       │       │
    │       │       └─> IJuryRepository.save() (Port)
    │       │                   │
    │       │                   └─> InMemoryJuryRepository.save() (Infrastructure)
    │       │
    │       └─> GetAllJuries.execute() (Use Case)
    │               │
    │               └─> IJuryRepository.getAll() (Port)
    │                           │
    │                           └─> InMemoryJuryRepository.getAll() (Infrastructure)
    │
    └─> Display Updated List
```

## Benefits of This Architecture

- **Testability**: Each layer can be tested independently
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Easy to swap implementations (e.g., replace InMemory with HTTP API)
- **Scalability**: New features follow the same pattern
- **Independence**: Business logic is framework-agnostic
