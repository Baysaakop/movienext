import { Menu, Button, Popconfirm, } from 'antd'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const AvatarDropDown = (props) => {
    return (
        <Menu
            items={[
                {
                    label: 
                        <Link href={`/members/${props.id}`}>
                            <a>
                                <Button type="text">Профайл</Button>
                            </a>
                        </Link>,
                    key: '0',
                },
                {
                    label: 
                        <Link href="/settings">
                            <a>
                                <Button type="text">Миний бүртгэл</Button>
                            </a>
                        </Link>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: 
                        <Popconfirm title="Гарахдаа итгэлтэй байна уу?" okText="Тийм" cancelText="Үгүй" onConfirm={() => signOut()}>
                            <Button danger type='link'>Гарах</Button>
                        </Popconfirm>,
                    key: '3',
                },
            ]}
        />
    )
}

export default AvatarDropDown