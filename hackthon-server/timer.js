import sql from 'mysql2';

let connection;
export const connectsql = () => {
  connection = sql.createConnection({
    host: 'localhost',
    user: 'nararaki',
    password: '',
    database: '',
  });
};

export const pause = () => {

};

export const start = () => {
  // eslint-disable-next-line new-cap
  const starttime = new Date.now();
  connection.query(
    'insert into measure (start) values ?',
    [starttime / 1000],
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
};

export const finish = () => {
  // eslint-disable-next-line new-cap
  const finishtime = new Date.now();
  let elapsedtime;
  connection.query(
    'select * from measure',
    (_error, results) => {
      elapsedtime = finishtime / 1000 - results.start;
    },
  );
  const second = elapsedtime % 60;
  const minute = elapsedtime % 3600;
  const hour = elapsedtime / 3600;
  const resulttime = {
    second,
    minute,
    hour,
  };
  return resulttime;
};
