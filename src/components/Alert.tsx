import * as React from 'react'
import {useInstance} from "react-ioc"
import {AlertService} from "../services"
import {observer} from "mobx-react"

export const Alert = observer(() => {
    const alertService = useInstance(AlertService);

    const { alert } = alertService;

    return (
        <div className={`alert alert-${alert.type || 'warning'} ${alert.visible && 'alert-visible'}`}>
            <strong>Внимание!</strong>
            &nbsp;{alert.text}
            <button onClick={() => alertService.hideAlert()} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
});
