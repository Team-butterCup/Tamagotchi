import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchReviews} from '../store/reviews'

const Reviews = props => {
  const reviewId = Number(props.match.params.tamagotchiId)
  const reviews = props.reviews.filter(
    review => reviews.tamagotchiId === tamagotchiId
  )

  return (
    <div>
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

const mapDispatch = dispatch => {
  return {
    loadReviews: () => dispatch(fetchReviews())
  }
}

const mapState = state => {
  return {
    reviews: state.reviews
  }
}

export default connect(mapState, mapDispatch)(Reviews)
