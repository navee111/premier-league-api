import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Team {
    id: Int!
    name: String!
    players: [Player!]!
  }

  type Player {
    id: Int!
    name: String!
    goals: Int!
    assists: Int!
    team: Team!
  }

  type Match {
    id: Int!
    homeTeam: String!
    awayTeam: String!
    homeScore: Int!
    awayScore: Int!
    matchDate: String!
    comments: [MatchComment!]!
  }

  type MatchComment {
    id: Int!
    content: String!
    rating: Int!
    createdAt: String!
    match: Match!
  }

  type User {
    id: Int!
    email: String!
  }

  type Query {
    teams: [Team!]!
    players: [Player!]!
    matches: [Match!]!
    match(id: Int!): Match
  }

  type Mutation {
    createMatchComment(matchId: Int!, content: String!, rating: Int!): MatchComment!
}
`
