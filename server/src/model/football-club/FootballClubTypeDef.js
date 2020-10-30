import { gql } from 'apollo-server-express';

const footballClubTypeDefs = gql`
type FootballClub {
  id: ID!
  name: String!
}

input FootballClubInput {
  id: ID
  name: String
}
`;

// make name parameter on input type required, for tests purpose ill keep it nullable...

export { footballClubTypeDefs }