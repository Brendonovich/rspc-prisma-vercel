use std::sync::Arc;

use rspc_vercel_example::*;

#[tokio::main]
async fn main() -> Result<(), ()> {
    println!("PRINT");

    let db = Arc::new(
        prisma::PrismaClient::_builder()
            .build()
            .await
            .map_err(|_| ())?,
    );

    router()
        .arced()
        .endpoint(move |_| Ctx { db: db.clone() })
        .vercel()
        .await
        .unwrap();

    Ok(())
}
