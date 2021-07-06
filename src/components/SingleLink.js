import React from 'react';
import { useLocation } from 'react-router-dom';

const SingleLink = () => {
  const location = useLocation();

  const path = location.pathname;

  const linkId = path.slice(9);

  return (
    <span>{`Link Id: ${linkId}`}</span>
  );
};

export default SingleLink;