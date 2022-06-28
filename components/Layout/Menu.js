import MenuItem from './MenuItem'
import Link from "next/link"
import styles from '../../styles/Menu.module.css'

const Menu = (props) => {

    function onClick () {
        props.onHide()
    }

    return (
        <div className={styles.menu}>
            <Link href="/">            
                <a onClick={onClick}>
                    <MenuItem icon="🏠" text="Нүүр хуудас" />          
                </a>
            </Link>
            <Link href="/movies">            
                <a onClick={onClick}>
                    <MenuItem icon="🎥" text="Кино" />          
                </a>
            </Link>
            <Link href="/series">            
                <a onClick={onClick}>
                    <MenuItem icon="📺" text="ТВ Цуврал" />          
                </a>
            </Link>
            <Link href="/artists">            
                <a onClick={onClick}>
                    <MenuItem icon="🎭" text="Уран бүтээлч" />          
                </a>
            </Link>
            <Link href="/articles">            
                <a onClick={onClick}>
                    <MenuItem icon="📜" text="Нийтлэл" />          
                </a>
            </Link>
            <Link href="/stats">            
                <a onClick={onClick}>
                    <MenuItem icon="📊" text="Статистик" />          
                </a>
            </Link>
            <Link href="/users">            
                <a onClick={onClick}>
                    <MenuItem icon="🙋‍♂️" text="Гишүүд" />          
                </a>
            </Link>
        </div>
    )
}

export default Menu