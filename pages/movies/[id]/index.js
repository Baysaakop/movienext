import axios from 'axios'
import { Grid } from 'antd'
import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import Loading from '../../../components/Loading'
import api from '../../../api'
import { useSession } from 'next-auth/react'
import MovieDetailMobile from '../../../components/Movie/Detail/MovieDetailMobile'
import MovieDetailDesktop from '../../../components/Movie/Detail/MovieDetailDesktop'
import MovieDetailTablet from '../../../components/Movie/Detail/MovieDetailTablet';

const { useBreakpoint } = Grid

const fetcher = url => axios.get(url).then(res => res.data)

const MovieDetail = () => {
    const screens = useBreakpoint()
    const router = useRouter()
    const { id } = router.query
    const [user, setUser] = useState()    
    const [director, setDirector] = useState()

    const { data: movie } = useSWR(`${api.moviedetail}/${id}`, fetcher);

    const { data: session, status } = useSession()

    if (movie && director == undefined) {
        axios({
            method: 'GET',
            url: `${api.moviecrew}?movie=${movie.id}&role=2`
        })
        .then(res => {                                        
            setDirector(res.data.results)              
        })
        .catch(err => {
            console.log(err)            
        })
    }

    if (status === "authenticated" && user === undefined) {        
        axios({
            method: 'GET',
            url: `${api.userdetail}/${session.id}/`
        })
        .then(res => {                       
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }   

    return (
        <div>
            {movie ? (                
                screens.lg  ? (
                    <MovieDetailDesktop 
                        movie={movie} 
                        director={director ? director : []} 
                        user={user} 
                        token={session ? session.token : undefined} 
                        path={router.asPath}
                        reload={() => router.reload()}
                    />         
                ) : screens.sm ? (
                    <MovieDetailTablet
                        movie={movie} 
                        director={director ? director : []} 
                        user={user} 
                        token={session ? session.token : undefined} 
                        path={router.asPath}
                        reload={() => router.reload()}
                    />          
                ) : (
                    <MovieDetailMobile 
                        movie={movie} 
                        director={director ? director : []} 
                        user={user} 
                        token={session ? session.token : undefined} 
                        path={router.asPath}
                        reload={() => router.reload()}
                    />
                )               
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default MovieDetail