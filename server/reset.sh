#!/bin/zsh
set -eo pipefail

# Delete all app data, then restart back end services and re-seed db.
docker compose down -v
docker compose up -d
docker compose exec server deno task db:push
docker compose exec server deno task db:seed
