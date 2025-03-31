# Bakken Family website

## Running the Wedding Site app locally

### Client

- Make sure Node 22.14.0 is running (use `nvm` to install)
- `$ cd client`
- `$ npm i`
- `$ npm run dev`
- Open http://localhost:5173
- Has HMR enabled so you can make changes while it's running.

### Server

- Make sure `deno` is installed and you can run it from your shell.
- `$ cd serve`
- `$ deno task start`
- Open http://localhost:8000/api/v1/wedding
- Has HMR enabled so you can make changes while it's running.

### Database

- TODO

## Deploying the Wedding Site app

- Push changes to `main` branch (via PR or directly)
- SSH into DigitalOcean server
- `$ cd bakken-family`
- `$ git pull`
- Deploy the client
  - `$ cd bakken-family/client`
  - `$ nvm use 22.14.0`
  - `$ npm i`
  - `$ npm run build`
  - This builds the app as static assets. Nginx will serve `index.html` as the app's entry point.
- Deploy the server
  - `$ cd bakken-family/client`
  - Make sure Deno is installed and available from the shell.
  - `$ deno task start`
  - The server should be running now.
  - TODO: Need to run this in a detached mode - figure this out.
