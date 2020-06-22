import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//MAKE THIS ADMIN TRUE

/**
 * COMPONENT
 */
export const AdminHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, Admin {email}</h3>
      <h4>
        <Link to="/user">View and Remove Users</Link>
      </h4>
      <h4>
        {' '}
        <Link to="/tamagotchis">Edit Tamagotchis</Link>
      </h4>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
