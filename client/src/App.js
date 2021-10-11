import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import Working from './working';
import Card from './card';
import Vote from './vote';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/working'>
          <Navbar />
          <Working />
        </Route>
        <Route exact path='/my-card'>
          <Navbar />
          <Card />
        </Route>
        <Route exact path='/vote'>
          <Navbar />
          <Vote />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
