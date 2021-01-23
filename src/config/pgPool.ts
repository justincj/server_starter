import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/reddit",
});

pool.on("error", (e) => {
  console.log(e);
});

export default pool;
