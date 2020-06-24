import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllTamagotchis,
  SingleTamagotchi,
  CartOrder,
  CheckoutDraft,
  CheckoutComplete,
  AllUsers,
  SingleUser,
  AddTamagotchi
} from './components'
import {
  me,
  fetchTamagotchis,
  fetchReviews,
  createOrderThunk,
  fetchOrders,
  fetchUsers
} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.setTamagotchis()
    await this.props.loadReviews()
    await this.props.setUsers()

    if (this.props.isLoggedIn) {
      await this.props.createOrder({userId: this.props.user.id})
    } else {
      await this.props.createOrder({userId: null})
    }
    await this.props.setOrders()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/tamagotchis/:tamagotchiId" component={SingleTamagotchi} />
        <Route path="/tamagotchis" component={AllTamagotchis} />
        <Route path="/orders" component={CartOrder} />
        <Route path="/checkout" component={CheckoutDraft} />
        <Route path="/checkout_complete" component={CheckoutComplete} />
        <Route path="/add_tamagotchi" component={AddTamagotchi} />

        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in as an Admin */}
            <Route path="/home" component={UserHome} />
            <Route path="/users/:userId" component={SingleUser} />
            <Route path="/users" component={AllUsers} />
          </Switch>
        )}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,

    user: state.user,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    setTamagotchis: () => dispatch(fetchTamagotchis()),
    setUsers: () => dispatch(fetchUsers()),
    loadReviews: () => dispatch(fetchReviews()),
    createOrder: order => dispatch(createOrderThunk(order)),
    setOrders: () => dispatch(fetchOrders())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
