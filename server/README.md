# Wedding Site

## Running the app

Start Deno and Postgres:

`$ docker compose up --watch`

This should hot reload any changes you make to the Deno app.

### Database commands

Make sure the app has started before running these commands.

Apply migrations to Postgres:

`$ deno task db:push`

Seed the database for local testing:

`$ deno task db:seed`

### Inspect the db with pgAdmin

After starting the app, go to http://localhost:5050

- Log in:
  - email: `admin@admin.com`
  - password: `root`
  - See the `docker-compose.yaml` for these values
- Add the DB:
  - Server name: `postgres`
  - Host name: `host.docker.internal`
  - Port: `5432`
  - User: `admin`
  - Password: `root`
