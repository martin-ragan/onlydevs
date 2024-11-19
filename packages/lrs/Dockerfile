FROM rust:1.77.1-slim-bookworm AS builder
ARG APP_PATH=packages/lrs

WORKDIR /app
RUN apt update && apt install g++ pkg-config libssl-dev -y && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*
COPY Cargo.toml Cargo.lock ./
COPY ${APP_PATH}/Cargo.toml ${APP_PATH}/Cargo.toml
RUN echo ${APP_PATH}
RUN ls -la
RUN mkdir ${APP_PATH}/src && touch ${APP_PATH}/src/lib.rs
RUN cargo build --release

RUN rm -rf "$APP_PATH/src"
COPY $APP_PATH/src $APP_PATH/src
RUN cargo build --release


FROM debian:bookworm-slim

RUN apt update && apt install libssl3 curl -y && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*
COPY --from=builder /app/target/release/onlydevs-lrs /usr/local/bin/onlydevs-lrs

EXPOSE 8080
CMD ["/usr/local/bin/onlydevs-lrs"]