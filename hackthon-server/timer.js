import sql from "mysql2";
let connection;
export const connectsql = ()=>{
    connection = sql.createConnection({
        host: "localhost",
        user: "nararaki",
        password: "",
        database: "",
    });
}

export const pause = ()=>{

}

export const start = ()=>{
    let starttime = new Date.now();
    connection.query(
        `insert into measure (start) values ?`,
        [starttime / 1000],
        (error,results)=>{
            if(error){
                throw error;
            }
        });
}

export const finish = ()=>{
    let finishtime = new Date.now();
    let elapsedtime;
    connection.query(
        `select * from measure`,
        (error,results)=>{
            elapsedtime = finishtime / 1000 - results.start;
        }
    );
    let second = elapsedtime % 60;
    let minute = elapsedtime % 3600;
    let hour = elapsedtime / 3600;
    let resulttime = {
        second: second,
        minute: minute,
        hour: hour,
    }
    return resulttime;

}