import { Grid } from "antd"
import axios from "axios"
import { useRouter } from "next/router"
import useSWR from "swr"
import api from "../../../api"
import Loading from "../../../components/Loading"
import MemberDetailMobile from "../../../components/Member/Detail/MemberDetailMobile"
import MemberDetailDesktop from "../../../components/Member/Detail/MemberDetailDesktop"

const fetcher = url => axios.get(url).then(res => res.data)

const { useBreakpoint } = Grid

const MemberDetail = () => {
    const screens = useBreakpoint()
    const router = useRouter()
    const { id } = router.query 

    const { data: member } = useSWR(`${api.userdetail}/${id}`, fetcher);         

    return (
        <div>
            { member ? (
                screens.md ? (
                    <MemberDetailDesktop member={member} />
                ) : (
                    <MemberDetailMobile member={member} />
                )               
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default MemberDetail