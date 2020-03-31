import React, {Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {useInstance} from "react-ioc"
import {AuthService} from "../services"
import {observer} from "mobx-react"

export const Navbar = observer(({ children }): JSX.Element => {
    const authService = useInstance(AuthService);

    const NavigationNonAuth = (): JSX.Element => (
        <Fragment>
            <div className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/registration">
                    Registration
                </NavLink>
            </div>
            <div className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/login">
                    Sign In
                </NavLink>
            </div>
        </Fragment>
    );

    const NavigationAuth = (): JSX.Element => (
        <Fragment>
            <div className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/about">
                    Information
                </NavLink>
            </div>
            <div className="nav-item">
                <NavLink className="nav-link" to="/list">List</NavLink>
            </div>
            <div className="nav-item">
                <button
                    onClick={() => authService.logout()}
                    type="button"
                    className="btn btn-outline-warning">
                    Logout
                </button>
            </div>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary flex">
                <div className="navbar-brand">
                    Employee Assessment
                </div>
                <div className="navbar-nav w-100 justify-content-end">
                    <div className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/history">
                            History
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/rating">
                            Rating
                        </NavLink>
                    </div>
                    {
                        authService.loggedIn ? NavigationAuth() : NavigationNonAuth()
                    }
                </div>
            </nav>
            {children}
        </Fragment>
    )
});

