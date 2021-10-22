const Navbar = () => {
    return (
        <div className="header-navbar">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark navbar-bg-header">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">DVote</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item active" aria-current="page" href='/'>Home</a>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <a className="nav-item d-block" href="/working">Working</a>
                            <a className="nav-item" href="/vote">Vote</a>
                            <a className="nav-item" href="/my-card">My Card</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    );
}

export default Navbar;