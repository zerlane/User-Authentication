import express from 'express'
import bcrypt from 'bcrypt'
import { addNewUser, checkEmailExists, checkUsernameExists, findUser } from '../db/queries/users.js'

export const userRouter = express.Router()

userRouter.get('/signup', async (req, res) => {
    res.send('signup')
})

userRouter.get('/login', async (req, res) => {
    res.send('login')
})

userRouter.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, username, password} = req.body 
        
        const userExists = await checkEmailExists(email) || await checkUsernameExists(username)
        if(userExists) {
            res.send("User exists.")
            return
        }
        const hashed = await bcrypt.hash(password, 10)
        
        await addNewUser(first_name, last_name, email, username, hashed)
        
        res.send("okay")
    } catch (error) {
        console.error(`Error signing user up: ${error}.`)
        throw error
    }   
})

userRouter.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await findUser(username)

        if (user.length === 0) {
            res.send('User doesn\'t exist')
            return
        }
       
        if (user) {
            const isValid = await bcrypt.compare(password, user[0].password)
            if (!isValid) {
                res.send('Wrong password')
                return
            }
            res.send('Successfully logged in')
        }
    } catch (error) {
        console.error(`Error logging in: ${error}.`)
        throw error
    }
})

/*
    Sources:
    https://www.youtube.com/watch?v=AzA_LTDoFqY
*/