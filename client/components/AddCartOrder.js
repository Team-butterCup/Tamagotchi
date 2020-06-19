import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {Button} from 'react95'

export const addCartOrder = props => {
  const order = props.order
  return (
    <div>
      <Button>Add to Cart</Button>
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    order: reduxState.order
  }
}

export default connect(mapStateToProps)(addCartOrder)
