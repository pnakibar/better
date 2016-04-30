import React from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './src/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './main.css'
import 'muicss/react'

injectTapEventPlugin()

const AuxApp = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <App />
  </MuiThemeProvider>

)

ReactDOM.render(
  <AuxApp />,
  document.getElementById('app')
)
