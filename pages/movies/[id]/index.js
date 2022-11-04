import axios from 'axios'
import { Button, Grid, Result } from 'antd'
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router'
import Loading from '../../../components/Loading'
import api from '../../../api'
import { useSession } from 'next-auth/react'
import MovieDetailMobile from '../../../components/Movie/Detail/MovieDetailMobile'
import MovieDetailDesktop from '../../../components/Movie/Detail/MovieDetailDesktop'
import MovieDetailTablet from '../../../components/Movie/Detail/MovieDetailTablet';

const { useBreakpoint } = Grid

const fetcher = async (url) => await axios.get(url).then(res => res.data)

const MovieDetail = () => {
    const screens = useBreakpoint()
    const router = useRouter()
    const { id } = router.query        
    const [logs, setLogs] = useState()

    const { data: session, status } = useSession()
    const { data: movie, error } = useSWR(id ? `${api.moviedetail}/${id}` : null, id ? fetcher : null)    

    useEffect(() => {
        if (status === "authenticated" && logs === undefined) {
            axios({
                method: 'GET',
                url: `${api.movielogs}?user=${session.id}`
            })
            .then(res => {       
                console.log(res.data.results)                            
                setLogs(res.data.results)
            })
            .catch(err => {            
                console.log(err)
            })
        }        
    }, [status])    

    if (error) {
        return (
            <Result
                status="500"
                title="Алдаа гарлаа"
                subTitle="Хуудас дуудах үед алдаа гарсан тул та хуудсаа refresh хийнэ үү."
                extra={<Button type="primary" onClick={() => router.reload()}>Refresh</Button>}
            />
        )
    } else if (movie) {
        return (
            screens.lg  ? (
                <MovieDetailDesktop 
                    movie={movie} 
                    director={director ? director : []} 
                    user={user} 
                    logs={logs}
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
                    logs={logs} 
                    session={session}                    
                    path={router.asPath}
                    reload={() => router.reload()}
                />                
            )  
        )
    } else {
        return (
            <Loading />
        )
    }    
}

export default MovieDetail