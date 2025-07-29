#!/bin/sh
set -e

# docker container execution

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Reset database (drop, migrate, seed) - all in one script
echo "Resetting database..."
pnpm run db:reset

# Migrate to latest
echo "Migrating to latest..."
pnpm run db:migrate

# Seed
echo "Seeding..."
pnpm run db:seed

# Run the development server
echo "Starting development server..."
exec pnpm run dev