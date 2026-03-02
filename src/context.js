import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()


export const context = async ({ req }) => {
  const token = req.headers.authorization || ''
  let user = null 

  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET)
    
    } catch (err) {
      console.log('Invalid token')
    }
  }
  return { prisma, user}
}

