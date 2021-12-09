import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/home/home";
import Navbar from "./views/navbar/navbar";
import Working from "./views/working/working";
import Card from "./views/card/card";
import Vote from "./views/vote/vote/vote";

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
          <Vote />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
