import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './SkeletonComponentStyles.scss';

const SkeletonComponent = () => {
  return (
    <div>
      <div className='skeleton-container'>
        <div className='skeleton-header'>
          <Skeleton height={20} width={80} borderRadius={6} />
          <Skeleton height={20} width={70} borderRadius={6} />
        </div>

        <div className='skeleton-platform'>
          <Skeleton height={10} width={60} borderRadius={6} />
          <div className='skeleton-platform-input'>
            <div className='skeleton-platform-input_icon_platform'>
              <Skeleton circle={true} height={20} width={20} />
              <Skeleton height={20} width={100} borderRadius={6} />
            </div>
            <Skeleton circle={true} height={20} width={20} />
          </div>
        </div>

        <div className='skeleton-link'>
          <Skeleton height={10} width={40} borderRadius={6} />
          <div className='skeleton-link-input'>
            <div className='skeleton-link-input_icon_link'>
              <Skeleton circle={true} height={20} width={20} />
              <Skeleton className='link' height={20} width={100} borderRadius={6} />
            </div>
          </div>
        </div>
      </div>
      <div className='skeleton-container'>
        <div className='skeleton-header'>
          <Skeleton height={20} width={80} borderRadius={6} />
          <Skeleton height={20} width={70} borderRadius={6} />
        </div>

        <div className='skeleton-platform'>
          <Skeleton height={10} width={60} borderRadius={6} />
          <div className='skeleton-platform-input'>
            <div className='skeleton-platform-input_icon_platform'>
              <Skeleton circle={true} height={20} width={20} />
              <Skeleton height={20} width={100} borderRadius={6} />
            </div>
            <Skeleton circle={true} height={20} width={20} />
          </div>
        </div>

        <div className='skeleton-link'>
          <Skeleton height={10} width={40} borderRadius={6} />
          <div className='skeleton-link-input'>
            <div className='skeleton-link-input_icon_link'>
              <Skeleton circle={true} height={20} width={20} />
              <Skeleton className='link' height={20} width={100} borderRadius={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonComponent;
