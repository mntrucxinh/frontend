# Next.js Project

This is a Next.js project with TypeScript, Tailwind CSS, and modern development tools.

## Getting Started

### Development

To run the development server:

```bash
pnpm dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Build and Production

To build the application for production:

```bash
pnpm build
```

To start the production server after building:

```bash
pnpm start
```

Or run both commands together:

```bash
pnpm build && pnpm start
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm lint:fix` - Run ESLint and automatically fix issues
- `pnpm preview` - Build and start production server in one command
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:write` - Format code with Prettier
- `pnpm format:check` - Check code formatting with Prettier

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
