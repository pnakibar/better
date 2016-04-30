import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

export default class DrawerUndockedExample extends React.Component {

  render() {
          //open={this.props.drawerOpen}
    return (
      <div className='my-drawer'>
        <Drawer
          docked={false}
          width={200}
          onRequestChange={this.props.toggleDrawer}
          open={this.props.drawerOpen}
        >
          {this._menuOptions()}
        </Drawer>
      </div>
    )
  }
  _menuOptions () {
    return this.props.menuOptions.map((option) =>
      <MenuItem
        key={option.id}
        onTouchTap={() => {this.props.changeDisplay(option.id); this.props.toggleDrawer()}}
        >{option.displayName}
      </MenuItem>
    )

  }
}
