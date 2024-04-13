// eslint-disable-next-line import/no-extraneous-dependencies
import mysql from 'mysql2';

// Create a connection to the database
export const connection = mysql.createConnection({
  host: '127.0.0.1', // localhostを127.0.0.1に変更します
  user: 'root',
  password: 'your_password',
  database: 'your_database',
  port: 3306,
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
  // eslint-disable-next-line new-cap
  const starttime = Date.now();
  connection.query(
    'insert into timer (time, flag) values (?, ?)',
    [starttime / 1000, 1],
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
}
