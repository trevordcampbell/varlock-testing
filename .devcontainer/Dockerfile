FROM debian:bookworm

RUN apt-get update && apt-get install -y \
    # curl \
    # git \
    # libsecret-1-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/varlock-testing

# RUN npm install -g npm@10.9.0

# CMD ["bun", "start"]