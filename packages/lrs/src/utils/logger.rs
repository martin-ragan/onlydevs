use slog::{error, o, Drain, Logger};
use slog_async;
use slog_term;

use crate::models::error::AppError;

pub fn configure_logger() -> Logger {
    let decorator = slog_term::TermDecorator::new().build();
    let drain = slog_term::FullFormat::new(decorator).build().fuse();
    let async_drain = slog_async::Async::new(drain).build().fuse();
    slog::Logger::root(async_drain, o!("v" => env!("CARGO_PKG_VERSION")))
}

pub fn log_error(logger: Logger) -> Box<dyn Fn(AppError) -> AppError> {
    Box::new(move |err: AppError| {
        let sub_logger = logger.new(o!("cause" => err.cause.clone()));
        error!(sub_logger, "{}", err);
        err
    })
}
