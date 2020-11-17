import { ApolloError } from 'apollo-client/errors/ApolloError';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/seasonQueries'
import { getFootclubsOnSeason } from '../football-club/FootballClubResolver'

const seasonResolver = {
  Query: {
    season(parent, args, context) {
      return findById(args, context)
    },
    seasons(parent, args, context) {
      return findAll(args, context)
    },
    seasonOverview(parent, args, context) {
      return seasonOverview(args, context)
    }
  },
  Mutation: {
    createSeason: (parent, args, context) => {
      return createSeason(args, context)
    },
    editSeason: (parent, args, context) => {
      return editSeason(args, context);
    },
    deleteSeason: (parent, args, context) => {
      return deleteSeason(args, context)
    }
  },
};

export async function findById(args, context) {
  const result = await doQuery(search.findById, [args.id])
  return result.rows[0]
}

async function findAll(args, context) {
  const result = await doQuery(search.findAll)
  return result.rows
}

async function createSeason(args, context) {
  const result = await doQuery(mutation.createSeason, [args.season.name])
  const season = result.rows[0]

  await addFootclubsToSeason({seasonId: season.id, clubs: args.season.footballClubs}, context)

  return await findById({id: season.id}, context)
} 

async function editSeason(args, context) {
  const result = await doQuery(mutation.editSeason, [args.id, args.season.name])
  const season = result.rows[0]

  await removeAllFootballClubsFromSeason({seasonId: season.id}, context)
  await addFootclubsToSeason({seasonId: season.id, clubs: args.season.footballClubs}, context)

  return findById({id: season.id}, context)
}

async function deleteSeason(args, context) {
  const result = await doQuery(mutation.deleteSeason, [args.id])
  return true // check if it succeed instead of always return true
}

async function addFootclubsToSeason(args, context) {
  const seasonId = args.seasonId
  const clubs = args.clubs

  for (const club of clubs) {
    await doQuery(mutation.addFootballclubToSeason, [seasonId, club.id])
  }
}

async function removeAllFootballClubsFromSeason(args, context) {
  await doQuery(mutation.removeAllFootballclubsFromSeason, [args.seasonId])
}

async function seasonOverview(args, context) {
  const footballClubs = []

  const clubs = await getFootclubsOnSeason(args, context)

  for (const club of clubs) {
    const points = (await doQuery(search.getFootballClubPoints, [club.id])).rows[0].points
    const wins = (await doQuery(search.getFootballClubWins, [club.id])).rows[0].wins
    const losses = (await doQuery(search.getFootballClubLosses, [club.id])).rows[0].losses
    const draws = (await doQuery(search.getFootballClubDraws, [club.id])).rows[0].draws

    footballClubs.push({
      id: club.id,
      name: club.name,
      points: points,
      wins: wins,
      losses: losses,
      draws: draws
    })
  }

  const season = await findById({id: args.seasonId}, context)

  return {
    id: season.id,
    name: season.name,
    footballClubs: footballClubs
  }

}

export { seasonResolver };