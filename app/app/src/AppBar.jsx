import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import Menu from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'

class MyAppBar extends React.Component {
  render () {
    const openDrawer = this.props.toggleDrawer
    const appName = this.props.appName
    return (
    <AppBar
      title={appName}
      style={{position: 'fixed', top: 0}}
      iconElementLeft={<IconButton onClick={this.props.toggleDrawer}><Menu /></IconButton>}
    />
    )
  }
}

export default MyAppBar
