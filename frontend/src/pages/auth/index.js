import React, { Component } from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Login, Register, Recovery } from './components'
import { Header } from '../../components'

class Auth extends Component {
    constructor(props) {
        super(props)
    
        this.handleSuccessful = this.handleSuccessful.bind(this);
    }

    handleSuccessful(data) {
        this.props.handleLogin(data)
    }

    render() {
        return (
            <Router>
                <Header />
                <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route exact path='/register' component={Register} />
                                <Route path="/login" component={Login} />
                                <Route path="/recovery" component={Recovery} />
                            </Switch>
                        </div>
                </div>
                {/* <div className="App">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={"/"}>Books</Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/login"}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/"}>Sign up</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route exact path='/' component={Register} />
                                <Route path="/login" component={Login} />
                                <Route path="/recovery" component={Recovery} />
                            </Switch>
                        </div>
                    </div>
                </div> */}
            </Router>
        )
    }
}

export default Auth