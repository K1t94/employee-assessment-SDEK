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

const defaultModule = module => ({ default: module });

const List = lazy(async () => {
    const module = await import('./pages/List');
    return defaultModule(module.List);
});

const About = lazy(async () => {
    const module = await import('./pages/About');
    return defaultModule(module.About);
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
                                    <Route path={'/list'} exact component={List} />
                                    <Route path={'/about'} component={About} />
                                    <Route path={'/login'} component={Login} />
                                    <Route path={'/registration'} component={Registration} />
                                    <Route path={'/history'} component={Histories} />
                                    <Route path={'/rating'} component={Rating} />
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
