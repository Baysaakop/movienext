import { gql } from 'graphql-request'

const getArticle = gql`
    query Article($slug: String!) {
        article(where: {slug: $slug}) {
            id,
            title,
            date,
            excerpt,
            slug,
            tags,
            cover {
                url
            }
            content {
                html
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

export default getArticle;