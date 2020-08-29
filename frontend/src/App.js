import React, { Component } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from './routes'
import AuthService from "./services/auth"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
  const routes = useRoutes(false)
  return (
    <Router>
      <div className="App">
        {routes}
        {/* <Auth /> */}
      </div>
    </Router>
    )
  } 
}

export default App