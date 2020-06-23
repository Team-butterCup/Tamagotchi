import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createOrderThunk, fetchOrders} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  useEffect(() => {
    async function idk() {
      await props.createOrder({userId: props.id})
      await props.setOrders()
    }
    idk()
  }, [])

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id,
    ordersAndCart: state.ordersAndCart,
    cart: state.ordersAndCart.cart
  }
}
const mapDispatch = dispatch => {
  return {
    createOrder: order => dispatch(createOrderThunk(order)),
    setOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
