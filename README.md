# express-lb-demo

A simple demo showing how to load balance multiple Express.js backend
instances using NGINX and Docker Compose. Built for testing in the
Killercoda Docker Playground.

## What it does

- Runs 3 identical Express.js backend containers
- NGINX sits in front and round-robins requests across them
- Each response includes the container hostname, so you can see
  which backend instance handled the request

## Stack

- Node.js / Express
- NGINX (load balancer / reverse proxy)
- Docker & Docker Compose

## Project files

- `server.js` — Express app
- `Dockerfile` — builds the backend image
- `nginx.conf` — NGINX load balancer config
- `docker-compose.yml` — spins up 3 backends + 1 load balancer
- `.env` — environment variables
- `package.json` — dependencies

## Run locally / on Killercoda

1. Install dependencies:

```bash
   npm install
```

2. Build and run with Docker Compose:

```bash
   docker compose up --build
```

3. Test the load balancer (in a second terminal):

```bash
   curl http://localhost:8080
   curl http://localhost:8080/health
```

Run the first `curl` a few times — the `hostname` in the response
will rotate between `backend1`, `backend2`, and `backend3`, showing
NGINX load balancing across them.

4. Stop everything:

```bash
   docker compose down
```
