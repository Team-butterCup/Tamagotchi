import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../store/user'
import RemoveUser from './RemoveUser'

//MAKE THIS ADMIN TRUE

const AllUsers = props => {
  const robots = props.users

  return (
    <div>
      {users.map(user => (
        <div key={user.id} className="user row">
          <Link to={`/users/${user.id}`}>
            <p>{user.email}</p>
          </Link>
          <RemoveUser user={user} />
        </div>
      ))}
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(getUser())
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
