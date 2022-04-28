import React from 'react'

const Likes = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-thumbs-up'
              : value >= 0.5
              ? 'fas fa-thumbs-up-half-alt'
              : 'fas fa-thumbs-up'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-thumbs-up'
              : value >= 1.5
              ? 'fas fa-thumbs-up-half-alt'
              : 'fas fa-thumbs-up'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-thumbs-up'
              : value >= 2.5
              ? 'fas fa-thumbs-up-half-alt'
              : 'fas fa-thumbs-up'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-thumbs-up'
              : value >= 3.5
              ? 'fas fa-thumbs-up-half-alt'
              : 'fas fa-thumbs-up'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-thumbs-up'
              : value >= 4.5
              ? 'fas fa-thumbs-up-half-alt'
              : 'fas fa-thumbs-up'
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Likes.defaultProps = {
  color: '#f8e825',
}

export default Likes
