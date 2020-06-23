import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminHome from './admin-home'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props
  if (user.isAdmin) {
    return (
      <div>
        <AdminHome />
      </div>
    )
  } else {
    return (
      <div>
        <h3>Welcome, {user.email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
