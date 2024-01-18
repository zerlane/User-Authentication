import express from 'express'
import bcrypt from 'bcrypt'
import { addNewUser, checkEmailExists, checkUsernameExists } from '../db/queries/users.js'

export const userRouter = express.Router()

userRouter.get('/signup', async (req, res) => {
    res.send('signup')
})

userRouter.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, username, password} = req.body 
        
        const userExists = await checkEmailExists(email) || await checkUsernameExists(username)
        if(userExists) {
            res.send("User exists.")
        }
        const hashed = await bcrypt.hash(password, 10)
        
        await addNewUser(first_name, last_name, email, username, hashed)
        
        res.send("okay")
    } catch (error) {
        console.error(`Error signing user up: ${error}.`)
        throw error
    }   
})