import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as  Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import {useStateValue} from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();



  return (
      <div className="app">
        {!user ? (
            <Login />
        ): (
            <div className="app_body">
              <Router>
                <Sidebar/>
                <Switch>
                  <Route path="/users/:userId">
                    <Chat/>
                  </Route>
                  <Route path="/"/>
                </Switch>
              </Router>
            </div>
        )}

      </div>
  );
}

export default App;
