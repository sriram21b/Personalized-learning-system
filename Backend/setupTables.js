const db = require("./db");

const createTables = async () => {
  const queries = [

    `DROP TABLE IF EXISTS recommendations`,
    `DROP TABLE IF EXISTS quiz_attempts`,
    `DROP TABLE IF EXISTS topics`,
    `DROP TABLE IF EXISTS users`,

    `CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,

    `CREATE TABLE topics (
      id INT NOT NULL AUTO_INCREMENT,
      topic_name VARCHAR(100),
      difficulty VARCHAR(50),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB`,

    `CREATE TABLE quiz_attempts (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      topic_id INT NOT NULL,
      score INT,
      total_questions INT,
      accuracy FLOAT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (topic_id) REFERENCES topics(id)
    ) ENGINE=InnoDB`,

    `CREATE TABLE recommendations (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      recommended_topic VARCHAR(100),
      difficulty_adjustment VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB`
  ];

  for (let query of queries) {
    await db.promise().query(query);
  }

  console.log("✅ All tables created successfully");
  process.exit();
};

createTables();