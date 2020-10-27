import { gql } from 'apollo-server-express';

const footballClubTypeDefs = gql`
type FootballClub {
  id: ID!
  name: String!
}

input FootballClub {
  id: ID
  name: String!
}
`;

export { footballClubTypeDefs }