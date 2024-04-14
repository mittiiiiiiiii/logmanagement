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

export async function stop() {
  const finishtime = Date.now();
  let elapsedtime;
  const kyougi = 'ラン';
  let alltime;

  // eslint-disable-next-line prefer-const
  elapsedtime = await new Promise((resolve, reject) => {
    connection.query('SELECT time FROM timer ORDER BY time DESC LIMIT 1', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(Math.floor(finishtime / 1000) - results[0].time);
    });
  });

  await new Promise((resolve, reject) => {
    connection.query(
      'update timer set flag = 0 where flag = 1',
      (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      },
    );
  });

  await new Promise((resolve, reject) => {
    connection.query(
      'insert into result (name, time) values (?, ?)',
      [kyougi, elapsedtime],
      (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      },
    );
  });

  const second = elapsedtime % 60;
  const minute = Math.floor(elapsedtime / 60) % 60;
  const hour = Math.floor(elapsedtime / 3600);
  const allsecond = alltime % 60;
  const allminute = Math.floor(alltime / 60) % 60;
  const allhour = Math.floor(alltime / 3600);
  const resulttime = {
    second,
    minute,
    hour,
    allsecond,
    allminute,
    allhour,
  };
  const formattedTime = `${resulttime.hour.toString().padStart(2, '0')}:${resulttime.minute.toString().padStart(2, '0')}:${resulttime.second.toString().padStart(2, '0')}`;
  return formattedTime;
}
