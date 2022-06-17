import { gql } from 'graphql-request'

const getArticleSlugs = gql`
    {
        articles {
            slug         
        }
    }
`;

export default getArticleSlugs;