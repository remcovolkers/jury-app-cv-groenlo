# Hexagonal Architecture - Jury App

This project follows the Hexagonal Architecture (Ports and Adapters) pattern to separate the core business logic from external concerns like the UI and data persistence.

## Structure

```
src/
├── domain/                 # Core Business Logic (Inner Layer)
│   ├── entities/           # Domain Objects (Participant, Vote, Category)
│   └── ports/              # Interfaces (IParticipantRepository, IVoteRepository)
│
├── application/            # Application Logic (Middle Layer)
│   └── use-cases/          # Orchestrates domain objects (SubmitVote, GetDashboard)
│
├── adapters/               # Interface Adapters (Outer Layer)
│   └── ui/                 # React Components and Pages
│
└── infrastructure/         # External Implementations (Outer Layer)
    ├── persistence/        # LocalStorage and Static Data implementations
    └── auth/               # Static Authentication service
```

## Dependency Rule

Dependencies always point **inward**.
- **Adapters** depend on **Application** and **Domain**.
- **Application** depends on **Domain**.
- **Infrastructure** depends on **Domain** (implements ports).
- **Domain** depends on **Nothing**.

## Data Flow Example: Submitting a Vote

1. **User** interacts with `VotePage.tsx` (Adapter).
2. `VotePage` calls `SubmitVote.execute()` (Application Use Case).
3. `SubmitVote` creates a `Vote` entity (Domain).
4. `SubmitVote` calls `IVoteRepository.save()` (Domain Port).
5. `LocalStorageVoteRepository` (Infrastructure) implements `save()` and writes to browser storage.

## Key Concepts

- **Entities**: Pure data structures with business rules (e.g., `Vote`).
- **Ports**: Interfaces that define how the application interacts with the outside world.
- **Use Cases**: Specific actions a user can perform (e.g., `LoginJury`).
- **Adapters**: Convert data between the UI and the Application layer.
