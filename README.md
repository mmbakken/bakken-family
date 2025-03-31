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

- `$ docker compose up --watch`
- Open http://localhost:8000/api/v1/wedding
- Has HMR enabled so you can make changes while it's running.

### Database

- Starts up with the server
- Access pgadmin via http://localhost:5050

## Deploying the Wedding Site app

- Push changes to `main` branch (via PR or directly)
- SSH into DigitalOcean server
- `$ cd bakken-family`
- `$ git pull`
- Deploy the client
  - `$ cd /home/matt/bakken-family/client`
  - `$ nvm use 22.14.0`
  - `$ npm i`
  - `$ npm run build`
  - This builds the app as static assets. Nginx will serve `index.html` as the app's entry point.
- Deploy the server
  - `$ cd /home/matt/bakken-family`
  - `$ docker compose build`
  - `$ docker compose up -d`
  - The server and database should be running now.
