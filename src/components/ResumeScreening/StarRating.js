import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';

export const StarRating = ({ value }) => {
  const fullStars = Math.floor(value);
  const partialStarPercentage = (value % 1) * 100;
  const emptyStars = 10 - Math.ceil(value);

  return (
    <div style={{ display: 'flex' }} className='flex items-start justify-center'>
      {Array.from({ length: fullStars }).map((_, i) => (
        <FontAwesomeIcon key={`filled-${i}`} icon={fullStar} style={{ color: 'orange' }} />
      ))}
      {partialStarPercentage > 0 && (
        <div
        className='flex  justify-center '
          key="partial-star"
          style={{
            position: 'relative',
            width: '24px', // Adjust this to match the width of your star icon
            height: '24px', // Adjust this to match the height of your star icon
          }}
        >
          <FontAwesomeIcon icon={fullStar} style={{ position: 'absolute', color: 'lightgray' }} />
          <FontAwesomeIcon
            icon={fullStar}
            style={{
              position: 'absolute',
              clipPath: `inset(0 ${100 - partialStarPercentage}% 0 0)`,
              color: 'orange',
            }}
          />
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={fullStar} style={{ color: 'lightgray' }} />
      ))}
    </div>
  );
};