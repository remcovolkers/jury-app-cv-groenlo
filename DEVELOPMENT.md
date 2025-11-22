# Development Guide

## Getting Started

1. **Install Dependencies**: `npm install`
2. **Start Dev Server**: `npm start`
3. **Build for Production**: `npm run build`

## Project Structure

The project is organized by layers (Hexagonal Architecture). See `ARCHITECTURE.md` for details.

## Adding a New Feature

1. **Domain**: Define new Entities or Ports in `src/domain`.
2. **Application**: Create a Use Case in `src/application/use-cases`.
3. **Infrastructure**: Implement any new Ports in `src/infrastructure`.
4. **Adapters**: Create/Update UI components in `src/adapters/ui`.

## PWA / Offline Support

The app is designed to work offline.
- Data is stored in `localStorage`.
- Service Worker caches assets (ensure `serviceWorkerRegistration.register()` is called in `index.tsx`).

## Mock Data

- Participants are defined in `src/infrastructure/persistence/StaticParticipantRepository.ts`.
- Jury Assignments are in `src/infrastructure/auth/StaticAuthService.ts`.
