import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchSingleOrder} from '../store'

import {Button} from 'react95'

export const RemoveCartOrder = props => {
  const orderId = props.orderId
  const tamagotchiId = props.tamagotchiId
  return (
    <div>
      <Button
        style={{backgroundColor: 'red'}}
        onClick={async () => {
          await axios.delete('/api/orders', {
            headers: {},
            data: {orderId, tamagotchiId}
          })
          props.updateCart(orderId)
        }}
      >
        X
      </Button>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    //cart: reduxState.ordersAndCart.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: orderId => dispatch(fetchSingleOrder(orderId))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RemoveCartOrder)
)
