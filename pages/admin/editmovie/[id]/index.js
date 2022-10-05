import { Button, Result, Segmented, Typography } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useSWR from 'swr'
import api from '../../../../api'
import MovieEditGenres from '../../../../components/Admin/Movie/Edit/MovieEditGenres'
import MovieEditInfo from '../../../../components/Admin/Movie/Edit/MovieEditInfo'
import Loading from '../../../../components/Loading'

const fetcher = url => axios.get(url).then(res => res.data)

const EditMovie = () => {    
    const [page, setPage] = useState("Info")
    const router = useRouter()
    const { id } = router.query

    const { data: movie } = useSWR(`${api.moviedetail}/${id}`, fetcher)

    const { data: session, status } = useSession()

    function onSegmentChange(val) {
        setPage(val)
    }

    if (status === "loading") {
        return (
            <Loading />
        )
    } else if (status === "authenticated") {
        if (session.role === 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                    <Result
                        status="403"
                        title="Хуудас үзэх боломжгүй."
                        subTitle="Зөвхөн админ эрхтэй хэрэглэгч үзэх боломжтой."                        
                    />
                </div>
            )
        } else {
            return (
                movie ?
                    <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                        <Typography.Title level={4}>Кино засах - {movie.title} ({dayjs(movie.releasedate).year()})</Typography.Title>
                        <Segmented 
                            block
                            defaultValue={page}
                            options={['Info', 'Genres', 'Production', 'Where to', 'Crew', 'Cast']}
                            onChange={onSegmentChange}
                            style={{ marginBottom: '16px' }}
                        />
                        <div style={{ border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                            { page === 'Info' ? (
                                <MovieEditInfo movie={movie} token={session.token} />
                            ) : page === 'Genres' ? (
                                <MovieEditGenres movie={movie} token={session.token} />
                            ) : page === 'Production' ? (
                                <>Production</>
                            ) : page === 'Where to' ? (
                                <>Where to</>
                            ) : page === 'Crew' ? (
                                <>Crew</>
                            ) : page === 'Cast' ? (
                                <>Cast</>
                            ) : (
                                <>Test</>
                            )}                            
                        </div>                        
                    </div>
                :
                    <></>
            )
        }
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                <Result
                    status="403"
                    title="Хуудас үзэх боломжгүй."
                    subTitle="Энэ хуудсыг үзэхийн тулд эхлээд нэвтрэх шаардлагатай."
                    extra={<Button type="primary" onClick={() => signIn()}>Нэвтрэх</Button>}
                />
            </div>
        )
    }
}

export default EditMovie