import React, {lazy, Suspense, Component, Fragment, Context} from 'react'
import {inject, InjectorContext, provider, toFactory} from "react-ioc"
import {DataContext} from "./context/dataContext"
import {
    StorageService,
    UsersService,
    AlertService,
    AuthService,
} from "./services"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {Navbar} from "./components/Navbar"
import {Main} from "./components/Main"
import {Loader} from "./components/Loader"
import {Alert} from "./components/Alert"
import {Locations} from "./core/locations"

const defaultModule = module => ({ default: module });

const List = lazy(async () => {
    const module = await import('./pages/List');
    return defaultModule(module.List);
});

const Profile = lazy(async () => {
    const module = await import('./pages/Profile');
    return defaultModule(module.Profile);
});

const Login = lazy(async () => {
    const module = await import('./pages/Login');
    return defaultModule(module.Login);
});

const Registration = lazy(async () => {
    const module = await import('./pages/Registration');
    return defaultModule(module.Registration);
});

const Histories = lazy(async () => {
    const module = await import('./pages/Histories');
    return defaultModule(module.Histories);
});

const Rating = lazy(async () => {
    const module = await import('./pages/Rating');
    return defaultModule(module.Rating);
});

@provider(
    AuthService,
    StorageService,
    UsersService,
    AlertService,
    [DataContext, toFactory(DataContext.create)]
)
class App extends Component {
    @inject storageService: StorageService;
    @inject authService: AuthService;

    componentDidMount(): void {
        this.authService.subscribeToAuthenticationState();
        this.storageService.subscribeToUpdate();
    }

    componentWillUnmount(): void {
        this.authService.unsubscribeToAuthentication();
        this.storageService.unsubscribeFromUpdates();
    }

    static contextType: Context<Function> = InjectorContext;

    render(): JSX.Element {
        return (
            <Fragment>
                <BrowserRouter>
                    <Navbar>
                        <Main>
                            <Alert />
                            <Switch>
                                <Suspense fallback={<Loader />}>
                                    <Route path={Locations.LIST} component={List} />
                                    <Route path={Locations.PROFILE} exact component={Profile} />
                                    <Route path={Locations.LOGIN} component={Login} />
                                    <Route path={Locations.REGISTRATION} component={Registration} />
                                    <Route path={Locations.HISTORY} component={Histories} />
                                    <Route path={Locations.RATING} component={Rating} />
                                </Suspense>
                            </Switch>
                        </Main>
                    </Navbar>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default App
