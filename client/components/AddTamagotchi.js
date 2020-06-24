//MAKE THIS ADMIN TRUE

import React from 'react'
import {addTamagotchiThunk} from '../store/tamagotchis'
import {connect} from 'react-redux'
// import { Button } from 'react95'

class AddTamagotchi extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const newTamagotchi = {
      name: event.target.name.value,
      age: event.target.age.value,
      description: event.target.description.value,
      price: event.target.price.value,
      qty: event.target.qty.value,
      imageUrl: event.target.imageUrl.value
    }

    this.props.addTamagotchi({
      newTamagotchi
    })
  }

  render() {
    return (
      <form className="tamagotchi-form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text" />
        <label htmlFor="age">Age: </label>
        <select name="age">
          <option defaultValue="selectAge">Select tamagotchi's age. . .</option>
          <option value="egg">Egg</option> <option value="baby">Baby</option>
          <option value="preteen">Preteen</option>
          <option value="teen">Teen</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
          <option value="boomer">Boomer</option>
        </select>
        <label htmlFor="description">Description: </label>
        <textarea name="description" />
        <label htmlFor="price">Price: </label>
        <input name="price" type="number" />
        <label htmlFor="qty">Qty: </label>
        <input name="qty" type="number" />
        <label htmlFor="imageUrl">Image Url: </label>
        <input name="imageUrl" type="url" />
        <button type="submit" className="addButton">
          Add Tamagotchi
        </button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  addTamagotchi: newTamagotchi => dispatch(addTamagotchiThunk(newTamagotchi))
})

export default connect(null, mapDispatch)(AddTamagotchi)
