import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import RemoveUser from './RemoveUser'
// import { Hourglass, Button } from 'react95';

//MAKE THIS ADMIN TRUE

const AllUsers = props => {
  const users = props.users
  console.log(users)
  return (
    <div>
      <div>
        <h1>Browse All Users</h1>
      </div>
      {users.map(user => (
        <div key={user.id} className="user row">
          <NavLink to={`/users/${user.id}`}>
            <p>{user.email}</p>
          </NavLink>
          <RemoveUser user={user} />
        </div>
      ))}
    </div>
  )
}

const mapState = reduxState => {
  return {
    users: reduxState.users
  }
}

export default withRouter(connect(mapState)(AllUsers))
