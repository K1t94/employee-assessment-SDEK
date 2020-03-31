import React, {useEffect} from "react"
import {useRouter} from "../hooks/useRouter"
import {useInstance} from "react-ioc"
import {observer} from "mobx-react"
import {AuthService} from "../services"
import {Locations} from "../core/locations"

export const Main = observer(({ children }) => {
    const { loggedIn } = useInstance(AuthService);
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.push(Locations.PROFILE)
        } else {
            router.push(Locations.LOGIN)
        }
    }, [loggedIn]);

    return (
        <div className="container mainWrapper">
            {children}
        </div>
    )
});
