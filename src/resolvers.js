export const resolvers = {
  Query: {
    teams: async (_, __, { prisma }) => prisma.team.findMany(),
    players: async (_, __, { prisma }) => prisma.player.findMany(),
    matches: async (_, __, { prisma }) => prisma.match.findMany(),
    match: async (_, { id }, { prisma }) => prisma.match.findUnique({ where: { id } })
  },

  Mutation: {
    createMatchComment: async (_, { matchId, content, rating }, { prisma, user }) => {
      if (!user) throw new Error("Unauthorized")
      return prisma.matchComment.create({
        data: { matchId, content, rating }
      })
    }
  },

  Team: {
    players: (parent, _, { prisma }) => prisma.player.findMany({ where: { teamId: parent.id } })
  },

  Player: {
    team: (parent, _, { prisma }) => prisma.team.findUnique({ where: { id: parent.teamId } })
  },

  Match: {
    comments: (parent, _, { prisma }) => prisma.matchComment.findMany({ where: { matchId: parent.id } })
  },

  MatchComment: {
    match: (parent, _, { prisma }) => prisma.match.findUnique({ where: { id: parent.matchId } })
  }
}
