import React from 'react'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './src/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import './main.css'
import 'muicss/react'
var fade = require('material-ui/utils/colorManipulator').fade
import { cyan700, grey600, pinkA100, pinkA200, pinkA400, fullWhite} from 'material-ui/styles/colors'
import { blue500, blue700, redA700, redA400, redA200} from 'material-ui/styles/colors'
import spacing from 'material-ui/styles/spacing'

injectTapEventPlugin()

const fuck = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey600,
    accent1Color: redA700,
    accent2Color: redA400,
    accent3Color: redA200,
    textColor: fullWhite,
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    backgroundColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
}
const AuxApp = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(fuck)}>
    <App/>
  </MuiThemeProvider>

)

ReactDOM.render(
  <AuxApp/>, document.getElementById('app'))
