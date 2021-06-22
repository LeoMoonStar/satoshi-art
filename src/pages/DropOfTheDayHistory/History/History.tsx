import React from 'react';
import Pagination from 'components/widgets/Pagination';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import useStyles from './History.style';
import DropOfTheDayArtist from 'components/widgets/DropOfTheDayArtist';

type Item = {
  id: string;
  color: string;
  name: string;
  itemPreview: string;
  artistImage: string;
};

export default function History({ items }: any): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(4);

  console.log('history', items);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <section className={classes.container}>
      {items.map((item: any) => (
        <DropOfTheDayArtist
          key={item.celebrityUserId}
          id={item.celebrityUserId}
          color={`#${item.colorCode}`}
          name={item.name}
          artistImage={item.homePageBarUrl}
          imagePreview={item.homePageBarUrl}
        />
      ))}

      <div className={classes.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemsCount={items.length}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
