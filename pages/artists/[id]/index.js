import { Grid } from "antd"
import useSWR from 'swr';
import axios from "axios"
import api from "../../../api";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ArtistDetailMobile from "../../../components/Artist/Detail/ArtistDetailMobile";
import ArtistDetailTablet from "../../../components/Artist/Detail/ArtistDetailTablet";

const { useBreakpoint } = Grid
const fetcher = url => axios.get(url).then(res => res.data)

const ArtistDetail = () => {    
    const screens = useBreakpoint()
    const [user, setUser] = useState()    
    const router = useRouter()
    const { id } = router.query 

    const { data: artist } = useSWR(`${api.artistdetail}/${id}`, fetcher) 

    const { data: session, status } = useSession()

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
            { artist ? (
                screens.sm ? (
                    <ArtistDetailTablet
                        artist={artist}
                        path={router.asPath}
                        session={session}      
                    />
                ) : (
                    <ArtistDetailMobile 
                        artist={artist}
                        path={router.asPath}
                        session={session}      
                    />
                )                
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default ArtistDetail