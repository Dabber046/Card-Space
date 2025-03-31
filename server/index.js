// server/index.js or routes/someRoute.js
const client = require('./db/connect');

async function doSomethingWithDB() {
  await client.connect();
  const db = client.db("your-db-name");
  const cards = await db.collection("cards").find().toArray();
  console.log(cards);
}
