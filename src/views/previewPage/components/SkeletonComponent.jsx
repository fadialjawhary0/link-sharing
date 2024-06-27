import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonComponentStyles.scss';

const SkeletonComponent = () => {
  return (
    <>
      <Skeleton height={100} width={100} circle={true} className='skeleton-profile-picture' />
      <Skeleton height={30} width={240} className='skeleton-full-name' />
      <Skeleton height={20} width={200} className='skeleton-email' />
      <Skeleton height={40} width={230} className='skeleton-link' />
      <Skeleton height={40} width={230} className='skeleton-link' />
      <Skeleton height={40} width={230} className='skeleton-link' />
    </>
  );
};

export default SkeletonComponent;
