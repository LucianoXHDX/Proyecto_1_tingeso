function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand" href="#">
                    Mi App
                </a>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Inicio
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header