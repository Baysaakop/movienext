import { gql } from 'graphql-request'

const getArticles = gql`
    {
        articles(orderBy: createdAt_DESC) {
            id,
            title,
            date,
            excerpt,
            slug,
            tags,
            cover {
                url
            }
            author {
                id,
                name,
                account {
                    id,
                    username,
                    title,
                    slug,
                    avatar {
                        url
                    }
                }
            }
        }
    }
`;

export default getArticles;