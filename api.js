const baseUrl = "http://localhost:8000/"
// const baseUrl = "https://movieplus-mn.herokuapp.com/"

const api = {
    // movies
    movielist: baseUrl + 'api/movies/movielist',
    moviedetail: baseUrl + 'api/movies/moviedetail',
    genres: baseUrl + 'api/movies/genres',
    ratings: baseUrl + 'api/movies/ratings',
    productions: baseUrl + 'api/movies/productions',
    platforms: baseUrl + 'api/movies/platforms',
    moviecomments: baseUrl + 'api/users/moviecomments',
    movielogs: baseUrl + 'api/users/movielogs',
    // artists
    artistlist: baseUrl + 'api/artists/artistlist',
    artistdetail: baseUrl + 'api/artists/artistdetail',
    occupations: baseUrl + 'api/artists/occupations',    
    moviecast: baseUrl + 'api/artists/moviecast',
    moviecrew: baseUrl + 'api/artists/moviecrew',
    // articles
    articles: baseUrl + 'api/articles/articles',
    categories: baseUrl + 'api/articles/categories',
    // users
    userlist: baseUrl + 'api/users/userlist',
    userdetail: baseUrl + 'api/users/userdetail', 
    profile: baseUrl + 'rest-auth/user/',
    restAuth: baseUrl + 'rest-auth',    
}

export default api