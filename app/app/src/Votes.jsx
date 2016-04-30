import React from 'react'
import { List, ListItem } from 'material-ui/List'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import Badge from 'material-ui/Badge'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
var request = require('superagent')
import VoteDialog from './VoteDialog'
import NewVoteDialog from './NewVoteDialog'

const requestUrl = ''

export default class Votes extends React.Component {
  componentWillMount () {
    this._getVotes()
  }

  constructor (props) {
    super(props)
    this._getVotes = this._getVotes.bind(this)
    this.state = {
      votes: [],
      newVoteOpen: false
    }
    this.openNewVote = this.openNewVote.bind(this)
    this.closeNewVote = this.closeNewVote.bind(this)
    }

  componentDidMount () {
    window.setInterval(this._getVotes, 2000)
  }

  openNewVote () {
    this.setState({newVoteOpen: true})
  }
  closeNewVote () {
    this.setState({newVoteOpen: false})
  }

  _getVotes () {
    request
      .get(requestUrl + '/bets')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }
        this.setState({
          votes: eval(res.text)
        })
      })
  }

  render () {
    const style = {
      position: 'fixed',
      bottom: '45px',
      right: '24px'
    }
    const votes = this.state.votes.map((entry, i) => {
      return (
        <Entry key={i} entry={entry} rerender={this._getVotes}/>
      )
    })
    const newVoteDialogOpen = () => {
      if (this.state.newVoteOpen) {
        console.log('yeahhh')
        return <NewVoteDialog open={this.state.newVoteOpen}/>
      } else {
        return ''
      }
    }
    return (
      <div className='votes'>
        <List>
          {votes}
          <FloatingActionButton style={style} onTouchTap={this.openNewVote}>
              <ContentAdd />
          </FloatingActionButton>
        </List>
        <NewVoteDialog open={this.state.newVoteOpen} handleClose={this.closeNewVote} handleUpdate={this._getVotes}/>
      </div>
    )
  }
}

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

class Entry extends React.Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this._voteDo = this._voteDo.bind(this)
    this._voteDont = this._voteDont.bind(this)
    this.snackbarClose = this.snackbarClose.bind(this)
    this.state = {
      open: false,
      snackbar: {
        open: false,
        text: 'nothing'
      }
    }
  }
  _countVotes (votes) {
    return Object.keys(votes).reduce((acc, k) => (acc + votes[k]), 0)
  }
  snackbarClose () {
    this.setState({
      snackbar: {
        open: false
      }
    })
  }
  handleOpen () {
    this.setState({open: true})
  }
  handleClose () {
    this.setState({open: false})
  }
  _voteDo () {
    request
      .post(requestUrl + '/bets/' + this.props.entry.id + '/do')
      .end((err, res) => {
        this.setState({
          snackbar: {
            open: true,
            text: err? 'Aconteceu algum erro!' : 'Voto registrado, vai rolar!'
          }
      })
    })
    this.handleClose()
    this.props.rerender()
  }
  _voteDont () {
    request
      .post(requestUrl + '/bets/' + this.props.entry.id + '/dont')
      .end((err, res) => {
        this.setState({
          snackbar: {
            open: true,
            text: err? 'Aconteceu algum erro!' : 'Voto registrado, não vai rolar!'
          }
        })
      })
    this.handleClose()
    this.props.rerender()
  }
  render () {
    const entry = this.props.entry
    const name = entry.name
    const totalVotes = this._countVotes(entry.votes)
    const description = entry.description
    const actions = [
      <FlatButton
        label='Cancelar'
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Vai Rolar'
        primary={true}
        onTouchTap={this._voteDo}
      />,
      <FlatButton
        label='Não vai Rolar'
        secondary={true}
        onTouchTap={this._voteDont}
      />
    ]

    return (
      <div className='entry'>
        <ListItem onTouchTap={this.handleOpen}>
          {name}
          <Badge
            badgeContent={this.props.entry.votes.dont}
            primary={true}
          />
          <Badge
            badgeContent={this.props.entry.votes.do}
            secondary={true}
          />
        </ListItem>
        <div>
          <Dialog
            title={name}
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {description}<br/><br/>
            <b>{this.props.entry.votes.do}</b> votaram que <b>vai rolar</b>, enquanto <b>{this.props.entry.votes.dont}</b> votaram que <b>não vai rolar</b>
          </Dialog>
        </div>
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.text}
          autoHideDuration={2000}
          onRequestClose={this.snackbarClose}
        />
      <Divider />
      </div>
    )
  }

}
