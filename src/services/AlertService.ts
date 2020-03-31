import {action, observable} from "mobx"

interface IAlert {
    type?: string,
    text?: string,
    visible: boolean,
}

class AlertService {
    @observable
    alert: IAlert = {
        visible: false,
    };

    @action
    showAlert(text: string, type = 'warning') {
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
