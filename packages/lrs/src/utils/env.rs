use dotenvy;
use slog::{info, Logger};
use std::net::SocketAddr;

const DEFAULT_HOST: &str = "0.0.0.0";
const DEFAULT_PORT: &str = "8080";

const DEFAULT_CLICKHOUSE_URL: &str = "http://clickhouse:8123";
const DEFAULT_CLICKHOUSE_USER: &str = "username";
const DEFAULT_CLICKHOUSE_PASSWORD: &str = "password";
const DEFAULT_CLICKHOUSE_DB: &str = "onlydevs_lrs";
// TODO: clap
pub fn get_server_addr(logger: &Logger) -> SocketAddr {
    let host_env = dotenvy::var("HOST");
    if host_env.is_err() {
        info!(logger, "HOST env not provided, fallback on default");
    }

    let port_env = dotenvy::var("PORT");
    if port_env.is_err() {
        info!(logger, "PORT env not provided, fallback on default");
    }

    let host = host_env.unwrap_or(DEFAULT_HOST.to_string());
    let port = port_env.unwrap_or(DEFAULT_PORT.to_string());

    format!("{}:{}", host, port)
        .parse()
        .expect("Invalid host or port address provided")
}

pub struct DbEnvAttrs {
    pub url: String,
    pub user: String,
    pub password: String,
    pub db: String,
}

pub fn get_db_attrs(logger: &Logger) -> DbEnvAttrs {
    let url_env = dotenvy::var("CLICKHOUSE_URL");
    if url_env.is_err() {
        info!(
            logger,
            "CLICKHOUT URL env not provided, fallback on default"
        );
    }

    let user_env = dotenvy::var("CLICKHOUSE_USER");
    if user_env.is_err() {
        info!(
            logger,
            "CLICKHOUT URL env not provided, fallback on default"
        );
    }

    let password_env = dotenvy::var("CLICKHOUSE_PASSWORD");
    if password_env.is_err() {
        info!(
            logger,
            "CLICKHOUT URL env not provided, fallback on default"
        );
    }

    let db_env = dotenvy::var("CLICKHOUSE_DB");
    if db_env.is_err() {
        info!(
            logger,
            "CLICKHOUT URL env not provided, fallback on default"
        );
    }
    info!(
        logger,
        "URL: {:?}, USER: {:?}, PASSWORD: {:?}, DB: {:?}", url_env, user_env, password_env, db_env
    );

    DbEnvAttrs {
        url: url_env.unwrap_or(DEFAULT_CLICKHOUSE_URL.to_string()),
        user: user_env.unwrap_or(DEFAULT_CLICKHOUSE_USER.to_string()),
        password: password_env.unwrap_or(DEFAULT_CLICKHOUSE_PASSWORD.to_string()),
        db: db_env.unwrap_or(DEFAULT_CLICKHOUSE_DB.to_string()),
    }
}
