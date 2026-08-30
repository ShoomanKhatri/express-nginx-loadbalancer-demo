# Architecture

This project runs a simple load-balanced setup: one NGINX load balancer
in front of three identical Express.js backend containers, all connected
over a shared Docker network.

## Diagram

Run the included script to print it:

    ./show-arch.sh

Output:

                 +------------------+
                 |      Client      |
                 +------------------+
                          |
                          v
                 +------------------+
                 |  NGINX (:8080)   |
                 |  Load Balancer   |
                 +------------------+
                    |     |     |
          +---------+     |     +---------+
          v               v               v

+-------------+ +-------------+ +-------------+
| backend1 | | backend2 | | backend3 |
| (port 5000) | | (port 5000) | | (port 5000) |
+-------------+ +-------------+ +-------------+

## How it works

- The **client** sends all requests to a single address: `localhost:8080`.
- **NGINX** receives every request and forwards it to one of the three
  backend containers using round-robin — each new request goes to the
  next backend in sequence (`backend1` -> `backend2` -> `backend3` -> repeat).
- Only NGINX exposes a port to the host machine (`8080`). The three
  backend containers are only reachable inside the internal Docker
  network -- the client never talks to them directly.
- Each backend runs the same Express app on port `5000` and returns its
  own hostname in the response, so you can see which container handled
  a given request.

## Failover behavior

If a backend goes down (e.g. `docker-compose stop backend1`), NGINX
automatically stops routing new requests to it after a few failed
attempts, and retries the request on the next healthy backend instead.
Once the backend comes back up, it automatically rejoins the rotation.

See the main README.md for setup and run instructions.
