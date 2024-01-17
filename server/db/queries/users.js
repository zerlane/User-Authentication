import { pool } from '../mysql.js'
import bcrypt from 'bcrypt'
/* 
    This is where all the queries for creating, deleting, 
    password hashing will be stored to dynamically fetch
    MySQL data.
*/

export const checkEmailExists = async (email) => {
   try {
        const [result] = await pool.query(
            `SELECT * FROM user_info WHERE email = ?;`,
            [email]
        )
        
        if (result.length === 1) {
            return true
        }

        return false
        
   } catch (error) {
        console.error(`Error checking if user exists: ${error}`)
        throw error
   }
}

export const checkUsernameExists = async (email, username) => {
    try {
         const [result] = await pool.query(
             `SELECT * FROM user_info WHERE username = ?;`,
             [username]
         )
         
         if (result.length === 1) {
            return true
        }

        return false

    } catch (error) {
         console.error(`Error checking if user exists: ${error}`)
         throw error
    }
 }

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

console.log(await checkEmailExists('tst@email.com'))
