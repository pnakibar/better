import React, { PropTypes } from 'react'
import MyAppBar from './AppBar'
import MyDrawer from './MyDrawer'
import Votes from './Votes'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.appName = 'Better'
    this._changeDisplay = this._changeDisplay.bind(this)
    this.menuOptions = [
      {
        id: 0,
        displayName: 'Option 1',
        displayComponent: <Votes />
    }/*,
      {
        id: 1,
        displayName: 'Option 2',
        displayComponent: 'Option 2'
      }*/
    ]
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.state = {
      drawerOpen: false,
      display: 0
    }
  }
  render () {
    const testStyle = {
      marginTop: '20px'
    }

    return (
      <div style={{backgroundColor: '#303030'}}>
        <MyAppBar
          appName={this.appName}
          toggleDrawer={this.toggleDrawer}/>
        <MyDrawer
          toggleDrawer={this.toggleDrawer}
          drawerOpen={this.state.drawerOpen}
          menuOptions={this.menuOptions}
          changeDisplay={this._changeDisplay}
          />
        <div style={testStyle}>
          {this.menuOptions[this.state.display].displayComponent}
        </div>
      </div>
    )
  }

  _getBets () {
    // current is mock
    return
  }

  toggleDrawer () {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }
  _changeDisplay (id) {
    console.log(id)
    if (id !== this.state.display) {
      this.setState({
        display: id
      })
    }
  }
}

export default App
