import { Link } from "react-router-dom";

export default function NavBar() {
    let style = {
        padding: 0,
        width: '100%',
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none'
    }

    return (
        <nav width={'100%'}>
            <ul style={style}>
                <Link to={"/"}>
                    <li>Home</li>
                </Link>
                <Link to={"game"}>
                    <li>Game</li>
                </Link>
                <Link to={"About"}>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    )
}