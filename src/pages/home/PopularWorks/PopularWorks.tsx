import React, { useEffect, useState } from 'react';
import { getCollectibles, Collectible } from 'apis/collectibles';
import { IconButton } from '@material-ui/core';
import text from '../../../constants/content';
import Modal from 'components/widgets/Modal';
import Works from 'components/widgets/Works';
import Button from 'components/button';
import { FilterIcon } from 'components/icons';


import useStyles from './PopularWorks.style';
import { current } from '@reduxjs/toolkit';


const categories = ['creator', 'collectible', 'collection'];

export default function PopularWorks(): JSX.Element {
  const classes = useStyles();

  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isExistNewTokens, setExistNewTokens] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const [totalItems, setTotalItems] = React.useState(0);

  const name = undefined;

  useEffect(() => {
    getCollectibles(name, currentPage).then((result:any) => {
      setCollectibles(result.data);
      setTotalItems(result.metadata.total)
      setLoading(false);
    });
  }, [currentPage]);
const handlePageChange = (page:any)=>{
  setCurrentPage(page)
}
  return (
    <section className={classes.container}>
      <h3 className={classes.title}>{text['takeTimeToAppreciateTheArtWork']}</h3>
      <h2 className={classes.subTitle}>{text['youWillBeAbleToBuyItSoon']}</h2>
      <div className={classes.filters}>
        <nav className={classes.navigation}>
          {/* {categories.map(category => (
            // <Button key={category}>{text['category']}</Button>
          ))} */}
        </nav>
      </div>
      <Modal open={isExistNewTokens} onClose={() => setExistNewTokens(false)}>
        <div className={classes.newTokensContainer}>
          <h2 className={classes.newTokensTitle}>Hello</h2>
          <div className={classes.newTokensContent}>List of collections was updated</div>
          <Button variantCustom='action'>Refresh</Button>
          <Button variantCustom='outlined' onClick={() => setExistNewTokens(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Works currentPage={currentPage}
          pageSize={pageSize} // number of collectibles in one page
          itemsCount={totalItems} // should be total collectibles across all pages
          onPageChange={handlePageChange}
      collectibles={collectibles} borderWidth={0} isLoading={isLoading} variant='rounded' />
      
    </section>
  );
}
