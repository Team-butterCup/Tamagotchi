import React from 'react'
import {fetchSingleTamagotchi} from '../store/singleTamagotchi'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Reviews from './review'

class SingleTamagotchi extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.tamagotchiId
    this.props.getSingleTamagotchi(id)
  }
  render() {
    let {
      name,
      description,
      price,
      age,
      quantity,
      imageUrl,
      id
    } = this.props.tamagotchi

    return (
      <div>
        <h2>Name: {name}</h2>
        <img src={imageUrl} />
        <h3>age: {age}</h3>
        <h3>description: {description}</h3>
        <h3>price: {price}</h3>
        <h3>quantity: {quantity}</h3>
        <div>
          <Reviews tamagotchiId={id} />
        </div>
      </div>
    )
  }
}

const mapState = reduxState => ({
  tamagotchi: reduxState.tamagotchi
})

const mapDispatch = dispatch => ({
  getSingleTamagotchi: tamagotchiId =>
    dispatch(fetchSingleTamagotchi(tamagotchiId))
})

export default withRouter(connect(mapState, mapDispatch)(SingleTamagotchi))
