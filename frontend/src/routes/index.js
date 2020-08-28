import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { Login, Register, Recovery } from "../pages/auth/components"

export const useRoutes = isAuth => {
    // if (isAuth) {
    //     return (
    //         // <Switch>
    //         //     <Route path="/" exact>
    //         //         <Main />
    //         //     </Route>
    //         //     <Route path="/profile" exact>
    //         //         <Profile />
    //         //     </Route>
    //         //     <Route path="/cart" exact>
    //         //         <Profile />
    //         //     </Route>
    //         //     <Route path="/favorites" exact>
    //         //         <Profile />
    //         //     </Route>
    //         //     <Redirect to="/" />
    //         // </Switch>
            
    //     ) 
    // }

    return (
        <Switch>
            <Route path="/login" >
                <Login />
            </Route>
            <Route path="/register" >
                <Register />
            </Route>
            <Route path="/recovery" exact>
                <Recovery />
            </Route>
            <Redirect to="/" />
        </Switch> 
    )
}