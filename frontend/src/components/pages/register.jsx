import React, { Component } from "react";

export default class Register extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}