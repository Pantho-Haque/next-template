#!/bin/sh
set -e

# docker container execution

# Install dependencies
echo "Installing dependencies..."
pnpm install

RUN_DB_OPS=${RUN_DB_OPERATIONS:-"false"}

if [ "$RUN_DB_OPS" = "true" ]; then
    echo "Running database operations..."
    pnpm run db:reset
    pnpm run db:migrate
    pnpm run db:seed
else
    echo "Skipping database operations (RUN_DB_OPERATIONS not set to 'true')"
fi

# Run the development server
echo "Starting development server..."
exec pnpm run dev