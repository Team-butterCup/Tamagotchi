//MAKE THIS ADMIN TRUE

import React from 'react'
import {fetchSingleUser} from '../store/singleUser'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleUser extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.userId)
    this.props.getSingleUser(id)
  }
  render() {
    let {email, salt, googleId, isAdmin, id} = this.props.user
    return (
      <div>
        <h2>Email: {email}</h2>
        <h3>salt: {salt}</h3>
        <h3>Google Id: {googleId}</h3>
        <h3>Admin Status: {isAdmin}</h3>
        <h3>User ID: {id}</h3>
      </div>
    )
  }
}

const mapState = reduxState => ({
  user: reduxState.singleUser
})

const mapDispatch = dispatch => ({
  getSingleUser: userId => dispatch(fetchSingleUser(userId))
})

export default withRouter(connect(mapState, mapDispatch)(SingleUser))
