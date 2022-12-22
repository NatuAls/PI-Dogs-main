import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <nav>
            <ul>
                <Link to='/home'>Home</Link>
                <Link to='/breed'>Breed</Link>
            </ul>
        </nav>
    )
}

export default NavBar;