import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddReviewForm from './AddReviewForm'
//import {fetchReviews} from '../store/reviews'

const Reviews = props => {
  const tamagotchiId = Number(props.tamagotchiId)
  const reviews = props.reviews.filter(
    review => review.tamagotchiId === tamagotchiId
  )

  return (
    <div>
      <AddReviewForm />
      {reviews.map(review => (
        <div key={review.id} className="customer reviews">
          <Link to={`/reviews/${review.id}`}>
            <h2>{review.rating}</h2>
            <p>{review.description}</p>
          </Link>
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

export default connect(mapState)(Reviews)
