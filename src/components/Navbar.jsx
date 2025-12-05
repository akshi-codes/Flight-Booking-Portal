import './Navbar.css'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="flex-1">
                <a href= "/home" className="btn btn-ghost text-4xl">Take <span className='text-orange-300'>अ</span> Flight</a>
            </div>
            <div className="flex-none">
            <span className="text-xl font-semibold mr-4
            bg-gradient-to-r from-purple-400 to-orange-300 text-transparent bg-clip-text"
            >
                Hello!! {localStorage.getItem("username")}
            </span>
                <ul className="menu menu-horizontal text-lg px-1">
                <li>
                    <details>
                    <summary>
                        Menu
                    </summary>
                    <ul className="bg-transparent rounded-t-none p-2">
                        <li><a href="/booking">Book</a></li>
                        <li><a href="/airports">Airports</a></li>
                        <li><a href="/flights">Flights</a></li>
                    </ul>
                    </details>
                </li>
                <li>
                    <a
                        href="/login"
                        onClick={() => {
                        localStorage.removeItem("userID");
                        localStorage.removeItem("username");
                        }}
                    >
                        Logout
                    </a></li>
                </ul>
            </div>
        </div>
    )
}
