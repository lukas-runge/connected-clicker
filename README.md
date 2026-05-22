# Connected Clicker

Connected Clicker: a connected visitor tracker for entrace and exit monitoring.

## Stack

- Node.js 24+
- pnpm
- SvelteKit
- Prisma Next Early Access
- Postgres
- Docker Compose for a local development database

## Getting started

Install dependencies:

```sh
pnpm install
```

Start the local Postgres development database:

```sh
docker compose up -d postgres
```

Copy the example environment if needed:

```sh
cp .env.example .env
```

Emit Prisma Next contract artifacts:

```sh
pnpm contract:emit
```

Initialize the database from the current contract:

```sh
pnpm db:init
```

Run the SvelteKit development server:

```sh
pnpm dev
```

## Useful commands

```sh
pnpm check              # Type-check SvelteKit
pnpm build              # Build the app
pnpm contract:emit      # Regenerate Prisma Next contract artifacts
pnpm db:init            # Bootstrap DB to match current contract
pnpm db:update          # Update DB to match current contract
pnpm db:verify          # Verify DB marker/live schema against contract
pnpm migration:status   # Show Prisma Next migration status
```

## Development database

The default local database URL is:

```env
DATABASE_URL="postgresql://connected_clicker:connected_clicker@localhost:5432/connected_clicker"
```

This value is committed only in `.env.example`; local `.env` files are ignored by git.

## Data contract

The Prisma Next contract lives in [`prisma/contract.prisma`](./prisma/contract.prisma). Generated artifacts live next to it and should be committed:

- `prisma/contract.json`
- `prisma/contract.d.ts`
