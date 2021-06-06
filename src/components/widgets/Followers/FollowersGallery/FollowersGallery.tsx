import React from 'react';
import useStyles from './FollowersGallery.style';

const FollowersGallery = ({ images }: { images: { id: number; src: string }[] }): JSX.Element => {
  const classes = useStyles();

  if (!images.length) return <div className={classes.noData}>This user has not uploaded any items yet</div>;
  
  return (
    <div className={classes.imgRow}>
      {images.map(img => (
        <img key={img.id} alt='' className={classes.img} src={img.src} />
      ))}
    </div>
  );
};

export default FollowersGallery;
