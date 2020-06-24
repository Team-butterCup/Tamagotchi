import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import RemoveUser from './RemoveUser'

//MAKE THIS ADMIN TRUE

const AllUsers = props => {
  const users = props.users
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
          <RemoveUser userId={user.id} />
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
