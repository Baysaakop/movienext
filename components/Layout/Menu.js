import MenuItem from './MenuItem'
import Link from "next/link"
import styles from '../../styles/Menu.module.css'

const Menu = () => {
    return (
        <div className={styles.menu}>
            <Link href="/">            
                <a>
                    <MenuItem icon="🏠" text="Нүүр хуудас" />          
                </a>
            </Link>
            <Link href="/movies">            
                <a>
                    <MenuItem icon="🎥" text="Кино" />          
                </a>
            </Link>
            <Link href="/series">            
                <a>
                    <MenuItem icon="📺" text="ТВ Цуврал" />          
                </a>
            </Link>
            <Link href="/artists">            
                <a>
                    <MenuItem icon="🎭" text="Уран бүтээлч" />          
                </a>
            </Link>
            <Link href="/articles">            
                <a>
                    <MenuItem icon="📜" text="Нийтлэл" />          
                </a>
            </Link>
            <Link href="/stats">            
                <a>
                    <MenuItem icon="📊" text="Статистик" />          
                </a>
            </Link>
            <Link href="/users">            
                <a>
                    <MenuItem icon="🙋‍♂️" text="Гишүүд" />          
                </a>
            </Link>
        </div>
    )
}

export default Menu