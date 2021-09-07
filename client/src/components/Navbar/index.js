// Navbar components
import Logo from './Logo'
import Menu from './Menu'
import Search from './Search'

const Navbar = () => {
    return (
        <nav className="row">
            <Logo />
            <Menu />
            <Search />
        </nav>
    )
}

export default Navbar