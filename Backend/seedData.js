const db = require("./db");

const seed = async () => {
  try {
    // insert user
    await db.promise().query(`
      INSERT INTO users (name, email, password)
      VALUES ('Test User', 'test@example.com', '123456')
    `);

    // insert topic
    await db.promise().query(`
      INSERT INTO topics (topic_name, difficulty)
      VALUES ('Arrays Basics', 'Easy')
    `);

    console.log("✅ Seed data inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();