const Home = () => {

    return (
        <div className="home d-flex p-3 mx-auto flex-column">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark navbar-bg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{ color: "#E8E2E2" }}>
                        <img className="navbar-logo" src="https://img.icons8.com/windows/45/000000/vote-yea.png" alt="DVote logo" />
                        &nbsp; DVote
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/working">Working</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/vote">Vote</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/my-card">My Card</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="main mt-auto">
                <h2 className="heading">DVote</h2>
                <p className="desc">
                    Decentralized voting.<br />
                    Welcome to the new age of voting! </p>
            </div>
            <div className="footer text-center mt-auto text-white" style={{ fontWeight: 450 }}>
                <p style={{ color: "black" }}>&copy; Made by the Election Commission of India</p>
            </div>
        </div>
    );
}

export default Home;