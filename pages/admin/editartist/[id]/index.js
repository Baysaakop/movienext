import { Button, Result, Segmented, Typography } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useSWR from 'swr'
import api from '../../../../api'
import ArtistEditCast from '../../../../components/Admin/Artist/Edit/ArtistEditCast'
import ArtistEditCrew from '../../../../components/Admin/Artist/Edit/ArtistEditCrew'
import ArtistEditInfo from '../../../../components/Admin/Artist/Edit/ArtistEditInfo'
import ArtistEditOccupations from '../../../../components/Admin/Artist/Edit/ArtistEditOccupations'
import Loading from '../../../../components/Loading'

const fetcher = url => axios.get(url).then(res => res.data)

const EditArtist = () => {    
    const [page, setPage] = useState("Info")
    const router = useRouter()
    const { id } = router.query

    const { data: artist } = useSWR(`${api.artistdetail}/${id}`, fetcher)

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
                artist ?
                    <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                        <Typography.Title level={4}>Уран бүтээлч засах - 
                            <Link href={`/artists/${artist.id}`}>
                                <a> {artist.name} ({moment(artist.releasedate).year()})</a>
                            </Link>
                        </Typography.Title>
                        <Segmented 
                            block
                            defaultValue={page}
                            options={['Info', 'Occupations', 'Crew', 'Cast']}
                            onChange={onSegmentChange}
                            style={{ marginBottom: '16px' }}
                        />
                        <div style={{ border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                            { page === 'Info' ? (
                                <ArtistEditInfo artist={artist} token={session.token} />
                            ) : page === 'Occupations' ? (
                                <ArtistEditOccupations artist={artist} token={session.token} />
                            ) : page === 'Crew' ? (
                                <ArtistEditCrew artist={artist} token={session.token} />
                            ) : page === 'Cast' ? (
                                <ArtistEditCast artist={artist} token={session.token} />
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

export default EditArtist