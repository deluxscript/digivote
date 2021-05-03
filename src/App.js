import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component";
import Layout from './hoc/Layout/Layout.component';
import CreateBallot from "./pages/CreateBallot/createBallot.component";
import Election from "./pages/Election/election.component";
import Home from './pages/home/home.component';
import Vote from "./pages/Vote/vote.component";

function App() {
  return (
   <Router>
      <div className="App container mx-auto px-4">
         <Layout>
            <Header />
            <Switch>
               <Route path="/create-ballot">
                  <CreateBallot />
               </Route>
               <Route path="/vote">
                  <Vote />
               </Route>
               <Route path="/election/:ballotId">
                  <Election />
               </Route>
               <Route path="/">
                  <Home />
               </Route>
            </Switch>
         </Layout>
      </div>
   </Router>
  );
}

export default App;
