import React from 'react'
import {Button, Hourglass} from 'react95'
import {connect} from 'react-redux'
import {updateOrderThunk} from '../store/orders'
import {NavLink} from 'react-router-dom'

class CheckoutDraft extends React.Component {
  render() {
    const cart = this.props.cart

    return (
      <div className="checkout">
        Items:
        <div>
          {cart !== undefined && cart.tamagotchis ? (
            <div>
              {cart.tamagotchis.map(tamagotchi => (
                <div
                  key={`${cart.id},${tamagotchi.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                  }}
                >
                  <div>
                    {tamagotchi.name} qty: {tamagotchi.TamagotchiOrder.qty}{' '}
                    Adoption Fee: $
                    {tamagotchi.price * tamagotchi.TamagotchiOrder.qty}
                  </div>
                </div>
              ))}
              <div>
                {' '}
                Total Adoption Fees: $
                {cart.tamagotchis.reduce((acc, item) => {
                  return (
                    acc +
                    item.TamagotchiOrder.qty *
                      item.TamagotchiOrder.purchasePrice
                  )
                }, 0)}
              </div>
            </div>
          ) : (
            <div>
              <Hourglass size={32} />
            </div>
          )}
        </div>
        <div>
          <h1>Shipping Info</h1>
          <form className="checkoutForm">
            <input
              name="firstName"
              placeholder="First Name*"
              type="text"
            ></input>
            <input name="lastName" placeholder="Last Name*" type="text"></input>
            <input
              name="address1"
              placeholder="Address Line 1*"
              type="text"
            ></input>
            <input
              name="address2"
              placeholder="Address Line 2"
              type="text"
            ></input>
            <input name="city" placeholder="City*" type="text"></input>
            <input
              name="state"
              placeholder="State/Province/Region*"
              type="text"
            ></input>
            <input
              name="zip"
              placeholder="Zip/Postal code*"
              type="text"
            ></input>
          </form>

          <div>
            <h1>Card Details</h1>
            <form className="checkoutForm">
              <input
                name="cardHolder"
                placeholder="Card Holder*"
                type="text"
              ></input>
              <input
                name="cardNumber"
                placeholder="Card Number*"
                type="number"
              ></input>
              <input
                name="expiration"
                placeholder="Expiration Date*"
                type="month"
              ></input>
              <input
                name="CVC"
                placeholder="CVC*"
                type="number"
                min="100"
                max="999"
              ></input>
            </form>
          </div>
          <NavLink to="/checkout_complete">
            <Button onClick={() => this.props.updatedOrder()}>
              Place Order
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}
const mapStateToProps = reduxState => {
  return {
    cart: reduxState.ordersAndCart.cart
  }
}

const mapDispatchToProps = dispatch => ({
  updatedOrder: () => dispatch(updateOrderThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDraft)
