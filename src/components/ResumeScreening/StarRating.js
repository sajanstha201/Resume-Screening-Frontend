import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';

export const StarRating = ({ value }) => {
  const fullStars = Math.floor(value);
  const partialStarPercentage = (value % 1) * 100;
  const totalStars = 10;
  const emptyStars = totalStars - Math.ceil(value);

  const renderStars = (numStars, isFilled = true) => {
    return Array.from({ length: numStars }).map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={fullStar}
        style={{ color: isFilled ? 'orange' : 'lightgray' }}
      />
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        {renderStars(Math.min(fullStars, 5))}
        {fullStars < 5 && partialStarPercentage > 0 && (
          <div
            className='flex justify-center'
            key="partial-star"
            style={{
              position: 'relative',
              width: '24px',
              height: '24px',
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
        {fullStars < 5 && renderStars(5 - fullStars - (partialStarPercentage > 0 ? 1 : 0), false)}
      </div>
      <div style={{ display: 'flex' }}>
        {fullStars > 5 && renderStars(fullStars - 5)}
        {fullStars > 5 && partialStarPercentage > 0 && (
          <div
            className='flex justify-center'
            key="partial-star-bottom"
            style={{
              position: 'relative',
              width: '24px',
              height: '24px',
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
        {fullStars <= 5 && renderStars(Math.max(0, emptyStars - 5), false)}
        {fullStars > 5 && renderStars(emptyStars, false)}
      </div>
    </div>
  );
};
