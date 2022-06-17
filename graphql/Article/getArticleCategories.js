import { gql } from 'graphql-request'

const getArticleCategories = gql`
    {
        articleCategories {
            id,
            name
        }
    }
`;

export default getArticleCategories;