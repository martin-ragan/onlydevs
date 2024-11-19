use async_trait::async_trait;
use clickhouse::Client;
use anyhow::Result;

use crate::models::error::AppError;
use crate::models::statement::Statement;

#[async_trait]
pub trait StatementRepo {
    async fn create_statement(&self, statement: &Statement) -> Result<(), AppError>;
}

#[derive(Clone)]
pub struct ClickhouseStatementRepo {
    client: Client,
}

impl ClickhouseStatementRepo {

    pub fn new(client: Client) -> Self {
        Self { client }
    }
}


#[async_trait]
impl StatementRepo for ClickhouseStatementRepo {
    
    async fn create_statement(&self, statement: &Statement) -> Result<(), AppError> {
        let mut insert = self.client.insert("statements").map_err(AppError::from_clickhouse)?; 

        insert.write(statement).await.map_err(AppError::from_clickhouse)?;
        insert.end().await.map_err(AppError::from_clickhouse)?;
        Ok(())
    } 

}
