import { gql } from 'apollo-server-express';

const queryDefs = gql`
  type Query {
    stadium(id: ID!): Stadium
    stadiums: [Stadium]

    footballClub(id: ID!): FootballClub
    footballClubs: [FootballClub]

    season(id: ID!): Season
    seasons: [Season]
    
    footballClubsOnSeason(seasonId: ID!): [FootballClub]

    match(id: ID!): Match
    matches(seasonId: ID!): [Match]

    seasonOverview(seasonId: ID!): SeasonOverview
  }

  type Mutation {
    addStadium(stadium: StadiumInput!): Stadium
    editStadium(id: ID!, stadium: StadiumInput!): Stadium
    deleteStadium(id: ID!): Boolean

    createFootballClub(footballClub: FootballClubInput!): FootballClub
    editFootballClub(id: ID!, footballClub: FootballClubInput!): FootballClub

    createSeason(season: SeasonInput!): Season
    editSeason(id: ID!, season: SeasonInput!): Season
    deleteSeason(id: ID!): Boolean

    addMatch(match: MatchInput!): Match
  }
`;

export { queryDefs }