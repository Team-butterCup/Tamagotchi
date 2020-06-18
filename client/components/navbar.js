import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Cutout, Tabs, TabBody, Bar, AppBar, Toolbar} from 'react95'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Cutout>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            <div>
              <Link to="/home">Home</Link>

              <Link to="/tamagotchis">Adopt A Tamagotchi!</Link>
            </div>
            <div>
              <Bar />
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Bar />
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}

            <div>
              <Link to="/tamagotchis">Adopt A Tamagotchi!</Link>
            </div>
            <div>
              <Link to="/orders">Cart</Link>
            </div>
            <div>
              <Bar />
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Bar />
            </div>
          </div>
        )}
      </nav>
    </Cutout>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
