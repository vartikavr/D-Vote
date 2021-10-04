const Home = () => {
    return ( 
        <div className="home">
            <div className="navbar">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark navbar-bg">
                <div className="container-fluid">
                    <img className="navbar-logo" src="https://img.icons8.com/external-justicon-lineal-color-justicon/50/000000/external-vote-voting-justicon-lineal-color-justicon-1.png"/>
                    <a className="navbar-brand" href="/" style={{ color: "#E8E2E2" }}>DVote</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item d-block" href="/">Home</a>
                            <a className="nav-item d-block" href="/">Working</a>
                            <a className="nav-item d-block" href="/">Vote</a>
                            <a className="nav-item d-block" href="/">My Card</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div >
            <div className="main">
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