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
  // eslint-disable-next-line new-cap
  const starttime = Date.now();
  connection.query(
    'insert into timer (time, flag) values (?, ?)',
    [Math.floor(starttime / 1000), 1],
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
}

export default function stop(){
  let finishtime = new Date.now();
    let elapsedtime,alltime;
    connection.query(
        `select * from timer order by time desc;`,
        (error,results)=>{
          if(error){
            throw error;
          }
            elapsedtime = Math.floor(finishtime / 1000) - results[0].time;
        }
    );
    connection.query(
      `update timer set flag 1 where flag = 0`,
      (error,results)=>{
        if(error){
          throw error;
        }
      }
    );
    connection.query(
      `select * from result where kyougi = ? order by time desc;`,
      [kyougi],
      (error,results)=>{
        if(error){
          throw error;
        }
        alltime = results[0].time + elapsedtime;
      }
    );
    connection.query(
      `insert into result (kyougi,time) values (?,?);`,
      [kyougi,alltime],
      (error,results)=>{
        if(error){
          throw error;
        }
      }
    );
    let second = elapsedtime % 60;
    let minute = Math.floor(elapsedtime /60) % 60;
    let hour = Math.floor(elapsedtime / 3600);
    let allsecond = alltime % 60;
    let allminute = Math.floor(alltime / 60) % 60;
    let allhour = Math.floor(alltime / 3600);
    let resulttime = {
        second: second,
        minute: minute,
        hour: hour,
        allsecond:allsecond,
        allminute:allminute,
        allhour:allhour,
    }
    return resulttime;
}