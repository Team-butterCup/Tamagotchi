import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import AddReviewForm from './AddReviewForm'
import {TextField, Button, Toolbar, Cutout, NumberField} from 'react95'
//import {fetchReviews} from '../store/reviews'

const Reviews = props => {
  const tamagotchiId = Number(props.tamagotchiId)
  const reviews = props.reviews.filter(
    review => review.tamagotchiId === tamagotchiId
  )

  return (
    <div>
      <AddReviewForm tamagotchiId={tamagotchiId} />
      {reviews.map(review => (
        <div key={review.id} className="customer reviews">
          <Cutout>
            {review.userId ? (
              <h1>A User left a review!</h1>
            ) : (
              <h1>Anonymous Review</h1>
            )}
            <Link to={`/reviews/${review.id}`}>
              <h2>{review.rating} Stars!</h2>
              <p>{review.description}</p>
            </Link>
          </Cutout>
        </div>
      ))}
    </div>
  )
}

// I dont think we needed this but I left it in case -daniel

// const mapDispatch = dispatch => {
//   return {
//     loadReviews: () => dispatch(fetchReviews())
//   }
// }

const mapState = state => {
  return {
    reviews: state.reviews
  }
}

export default withRouter(connect(mapState)(Reviews))
