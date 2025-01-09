# Scoreboard

## Project Overview

This project implements a `Scoreboard` system designed to manage and track matches between various teams. The `Scoreboard` handles features like starting a match, updating scores, finishing matches, and retrieving a summary of matches sorted by score and start time.

## Key Features

- Start a new match with default scores (0-0).
- Update the scores of an ongoing match.
- Finish an existing match, ensuring it is removed from the scoreboard.
- Retrieve a summary of matches sorted by:
  1. Total score (descending order).
  2. Match sequence/start time (descending order).
- Handle edge cases, including starting duplicate matches, finishing a non-existent match, or updating a non-started match.

## Technology Stack

- **TypeScript**: Used for static type checking and enhanced code quality.
- **Jest**: Testing framework for unit tests.
- **Prettier**: Code formatter to enforce consistent style.
- **ESLint**: Ensures adherence to coding standards and best practices.

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests to verify functionality:
   ```bash
   npm test
   ```
4. Format code using Prettier:
   ```bash
   npm run format
   ```
5. Lint the codebase:
   ```bash
   npm run lint
   ```
   To apply fixes automatically, use:
   ```bash
   npm run lint:fix
   ```
