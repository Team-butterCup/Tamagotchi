//MAKE THIS ADMIN TRUE

import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {deleteUser} from '../store/users'

import {Button} from 'react95'

export const RemoveUser = props => {
  const userId = props.userId
  return (
    <div>
      <Button
        style={{backgroundColor: 'red'}}
        onClick={() => {
          props.deleteUser(userId)
        }}
      >
        X
      </Button>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: userId => dispatch(deleteUser(userId))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RemoveUser)
)
