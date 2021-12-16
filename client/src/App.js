import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/home/home";
import Navbar from "./views/navbar/navbar";
import Working from "./views/working/working";
import Card from "./views/card/card";
import Vote from "./views/vote/vote/vote";
import Constituency from "./views/constituency/constituency/constituency";
import Voters from "./views/voters/voters";
import Parties from "./views/parties/parties";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/working">
          <Navbar />
          <Working />
        </Route>
        <Route exact path="/my-card">
          <Navbar />
          <Card />
        </Route>
        <Route exact path="/vote">
          <Navbar />
          <Constituency />
        </Route>
        <Route exact path="/:id/vote">
          <Navbar />
          <Vote />
        </Route>
        <Route exact path="/voters">
          <Navbar />
          <Voters />
        </Route>
        <Route exact path="/parties">
          <Navbar />
          <Parties />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
