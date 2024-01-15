import { pool } from '../mysql.js'
import bcrypt from 'bcrypt'
/* 
    This is where all the queries for creating, deleting, 
    password hashing will be stored to dynamically fetch
    MySQL data.
*/

export const addNewUser = async (first_name, last_name, email, username, password) => {
    try {
        //check if email and/or username exists
        
        const hash = await bcrypt.hash(password, 10)

        const [user] = await pool.query(`
            INSERT INTO user_info (first_name, last_name, email, username, password)
                VALUES (?, ?, ?, ?, ?);`,
                [first_name, last_name, email, username, hash]
              )
        return user
    } catch (error) {
        console.error(`Error inserting user: ${error}`)
        throw error
    }
}
