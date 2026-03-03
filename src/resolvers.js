import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const resolvers = {
  Query: {},

  Mutation: {

    async register(_, { email, password }, { prisma }) {
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      })

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )

      return { token, user }
    },

    async login(_, { email, password }, { prisma }) {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) throw new Error("User not found")

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new Error("Invalid password")

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )

      return { token, user }
    },

    async createMatchComment(_, { matchId, content, rating }, { prisma, user }) {
      if (!user) throw new Error("Unauthorized")

      return prisma.matchComment.create({
        data: { matchId, content, rating }
      })
    }
    
  }
}
