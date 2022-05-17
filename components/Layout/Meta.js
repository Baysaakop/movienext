import Head from 'next/head'

const Meta = ({ keywords, description, title }) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <link rel='stylesheet' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'MOVIE+',
    keywords: 'mongolian movies, movie app, movie db, movie review, movie rating, монгол кино, кино сан, кино шүүмж, кино сэтгэгдэл',
    description: 'Монгол киноны үнэлгээний систем'
}

export default Meta