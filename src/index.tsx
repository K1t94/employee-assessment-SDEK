import * as React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import './index.scss'
import App from './App'

const container: HTMLElement = document.getElementById('root');

render(<App/>, container);

window.addEventListener('beforeunload', (): void => {
    unmountComponentAtNode(container);
});
