import React, {useEffect} from "react"
import {useRouter} from "../hooks/useRouter"
import {useInstance} from "react-ioc"
import {observer} from "mobx-react"
import {AuthService} from "../services"

export const Main = observer(({ children }) => {
    const { loggedIn } = useInstance(AuthService);
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.push('/list')
        } else {
            router.push('/login')
        }
    }, [loggedIn]);

    return (
        <div className="container mainWrapper">
            {children}
        </div>
    )
});
