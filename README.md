# express-nginx-loadbalancer-demo

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
- `.env` — environment variables (not committed to Git)
- `package.json` — dependencies

## Run on Killercoda

1. Clone the repo:

```bash
git clone https://github.com/ShoomanKhatri/express-nginx-loadbalancer-demo.git
cd express-nginx-loadbalancer-demo
```

2. Create a `.env` file (not included in the repo):

```bash
nano .env
```

Paste:

```env
PORT=5000
NODE_ENV=development
```

3. Build and run with Docker Compose:

```bash
docker-compose up --build
```

> Note: Killercoda's Docker Playground ships the legacy `docker-compose`
> (v1) binary, not the newer `docker compose` (v2) plugin. If your
> environment has v2 instead, use `docker compose up --build` (with a
> space) rather than a hyphen.

4. Test the load balancer (in a second terminal):

```bash
curl http://localhost:8080
curl http://localhost:8080/health
```

Run the first `curl` a few times — the `hostname` in the response
will rotate between `backend1`, `backend2`, and `backend3`, showing
NGINX load balancing across them.

5. Stop everything:

```bash
docker-compose down
```
