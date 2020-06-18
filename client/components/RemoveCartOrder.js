import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeOrder} from '../store/orders'

import Hourglass from 'react95'

export const removeCartOrder = props => {
  const order = props.order
  return <div />
}

const mapStateToProps = reduxState => {
  return {
    order: reduxState.order
  }
}

export default connect(mapStateToProps)(removeCartOrder)
