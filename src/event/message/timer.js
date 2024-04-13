// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import mysql from 'mysql2';

// Create a connection to the database
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    // eslint-disable-next-line no-console, template-curly-spacing
    console.error(`An error occurred while connecting to the DB: ${ error.stack}`);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`Connected to the DB with ID ${connection.threadId}`);
});

export default function start() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT flag FROM timer ORDER BY time DESC LIMIT 1', (error, results) => {
      if (error) {
        reject(error);
      }
      if (results[0].flag === 1) {
        resolve('計測中です！');
      }
      const starttime = Date.now();
      connection.query(
        'insert into timer (time, flag) values (?, ?)',
        [starttime / 1000, 1],
        // eslint-disable-next-line no-shadow
        (error) => {
          if (error) {
            reject(error);
          }
        },
      );
      resolve('計測をスタートしました！');
    });
  });
}
