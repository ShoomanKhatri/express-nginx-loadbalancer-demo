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

---

## Steps to run on Killercoda

1. **Start the environment**
   Go to [killercoda.com](https://killercoda.com), search for **"Docker Playground"**, and click **Start Scenario**. This gives you a free Linux VM with Docker pre-installed, right in the browser.

2. **Create the project folder**

```bash
   mkdir express-lb-demo && cd express-lb-demo
```

3. **Create `server.js`**

```bash
   nano server.js
```

Paste the Express app code, then save (`Ctrl+O`, `Enter`, `Ctrl+X`).

4. **Create `package.json`**

```bash
   nano package.json
```

```json
{
  "name": "express-lb-demo",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "dotenv": "^16.4.5"
  }
}
```

5. **Create `.env`**

```bash
   nano .env
```

```env
   PORT=5000
   NODE_ENV=development
```

6. **Create `Dockerfile`**

```bash
   nano Dockerfile
```

```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["node", "server.js"]
```

7. **Create `nginx.conf`**

```bash
   nano nginx.conf
```

```nginx
   events {}

   http {
     upstream backend_servers {
       server backend1:5000;
       server backend2:5000;
       server backend3:5000;
     }

     server {
       listen 80;

       location / {
         proxy_pass http://backend_servers;
         proxy_set_header Host $host;
       }
     }
   }
```

8. **Create `docker-compose.yml`**

```bash
   nano docker-compose.yml
```

```yaml
version: "3.8"
services:
  backend1:
    build: .
    container_name: backend1
    hostname: backend1

  backend2:
    build: .
    container_name: backend2
    hostname: backend2

  backend3:
    build: .
    container_name: backend3
    hostname: backend3

  loadbalancer:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "8080:80"
    depends_on:
      - backend1
      - backend2
      - backend3
```

9. **Build and run everything**

```bash
   docker compose up --build
```

10. **Test the load balancer**
    Open a **second terminal tab** in Killercoda (there's usually a "+" tab option), then run:

```bash
    curl http://localhost:8080
    curl http://localhost:8080/health
```

    Run the first `curl` a few times — you'll see the `hostname` in the response rotate between `backend1`, `backend2`, and `backend3`, proving NGINX is load balancing across them.

11. **Stop everything**

```bash
    docker compose down
```

---

## Notes

- Killercoda sessions are temporary — save your files locally or push to GitHub if you want to reuse this later.
- `PORT` comes from `.env`; `HOSTNAME` is auto-set by Docker per container (no `.env` needed for it).
