import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
var request = require('superagent')
const requestUrl = 'http://localhost:3000'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {
  constructor (props) {
    super(props)
    this.handleName = this.handleName.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.sendToServer = this.sendToServer.bind(this)
    this.state = ({
      name: '',
      description: '',
      snackbarOpen: false,
      snackbarMessage: ''
    })
  }

  snackbarHandleClose () {
    this.setState({
      snackbarOpen: false
    })
  }

  handleName (event) {
    this.setState({
      name: event.target.value
    })
  }
  handleDescription (event) {
    this.setState({
      description: event.target.value
    })
  }
  sendToServer () {
    const j = {
      name: this.state.name,
      description: this.state.description
    }
    request
      .post(requestUrl + '/bets')
      .send(j)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err)
        console.log(res)
        this.setState({
          snackbarOpen: true,
          snackbarMessage: err ? 'Problema no envio de dados' : 'Dados enviados com sucesso!'
        })
      })

    this.props.handleClose()
    this.props.handleUpdate()
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Enviar"
        primary={true}
        onTouchTap={this.sendToServer}
      />
    ]

    return (
      <div>
        <Dialog
          title="Nova Aposta!"
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          <TextField
            floatingLabelText='Nome'
            hintText='Ex.: João dar PT'
            floatingLabelFixed={true}
            onChange={this.handleName}
          /><br/>
          <TextField
            hintText="Descreva a sua aposta"
            floatingLabelText="Descrição"
            floatingLabelFixed={true}
            onChange={this.handleDescription}
          /><br/>
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={2000}
          onRequestClose={this.snackbarHandleClose}
        />
      </div>
    );
  }
}
