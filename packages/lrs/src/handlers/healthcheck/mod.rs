use actix_web::web::ServiceConfig;

mod health;

pub fn health_config(cfg: &mut ServiceConfig) {
    cfg.service(health::check);
}
