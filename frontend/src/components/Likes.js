import React from 'react'

const Likes = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-thumbs-up'
              : value <= 2
              ? 'fas fa-thumbs-down'
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
