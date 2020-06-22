import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import RemoveUser from './RemoveUser'
import {Hourglass, Button} from 'react95'

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

const mapState = reduxState => {
  return {
    users: reduxState.users
  }
}

export default withRouter(connect(mapState)(AllUsers))
