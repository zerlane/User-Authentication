import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
}).promise()

await pool.getConnection((err, connection) => {
    if (err) {
        console.error(`Error connectioning to the db schema: ${err}`)
        return
    }

    console.log('Successfully connected to MySQL pool connection.')
    //connection made available again in pool
    connection.release()
})