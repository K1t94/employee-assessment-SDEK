import {action, observable} from "mobx"

interface IAlert {
    type?: AlertType,
    text?: string,
    visible: boolean,
}

type AlertType = 'warning' | 'success' | 'danger';

class AlertService {
    @observable
    alert: IAlert = {
        visible: false,
    };

    @action
    showAlert(text: string, type: AlertType = 'warning') {
       this.alert = {
           text,
           type,
           visible: true,
       }
    };

    @action
    hideAlert() {
        this.alert = {
            visible: false
        }
    }
}

export default AlertService
