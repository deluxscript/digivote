import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';
import Header from "./components/header/header.component";
import Layout from './hoc/Layout/Layout.component';
import Home from './pages/home/home.component';
import Register from "./pages/Register/Register.component";

function App() {
  return (
   <Router>
      <div className="App container mx-auto">
         <Layout>
            <Header />
            <Switch>
               <Route path="/register">
                  <Register />
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
