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
     
      <span>{text && text}</span>
    </div>
  )
}

Likes.defaultProps = {
  color: '#002949',
}

export default Likes
