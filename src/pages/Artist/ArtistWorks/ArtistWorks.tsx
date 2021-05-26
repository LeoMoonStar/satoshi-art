import React, { useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import Modal from 'components/widgets/Modal';
import Works from 'components/widgets/Works';
import Followers, { TabVariants } from 'components/widgets/Followers';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { FilterIcon } from 'components/icons';

import useStyles from './ArtistWorks.style';
import { Collectible, getOnSaleCollectibles, getOnHoldCollectibles, getCreatorsCollectibles } from 'apis/collectibles';

type CategoryType = {
  id: number;
  title: string;
  isEmpty?: boolean;
};

const categories: CategoryType[] = [
  { id: 1, title: 'On sale' },
  { id: 2, title: 'Collectibles' },
  { id: 3, title: 'Created' },
  { id: 4, title: 'Liked' },
  { id: 5, title: 'Activity' },
];

type ArtistWorksProps = {
  collectibles?: Collectible[];
};

export default function ArtistWorks({ collectibles }: ArtistWorksProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(TabVariants.Following);
  const [collections, setCollections] = useState<Collectible[]>([]);
  const [numCollections, setNumCollections] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(categories[0]);
  const { account } = useWeb3React();
  const { id } = useParams<{ id: string }>();

  const openModal = (activeType: number) => {
    setActive(activeType);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(0);
  };

  const getCategoryList = (category: CategoryType) => {
    setSelectedCategory(category);

    switch (category.title) {
      case 'On sale':
        getOnSaleCollectibles(id).then(res => {
          const data = res.data;

          setCollections(res.data);
          setNumCollections(res.data.length);
        });

        break;
      case 'Collectibles':
        getOnHoldCollectibles(id).then(res => {
          const data = res.data;

          setCollections(res.data);
          setNumCollections(res.data.length);
        });

        break;
      case 'Created':
        getCreatorsCollectibles(id).then(res => {
          const data = res.data;

          setCollections(res.data);
          setNumCollections(res.data.length);
        });

        break;
      case 'Liked':
        // unknown for now

        break;
      case 'Activity':
        // unknown for now

        break;
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.navigationRow}>
        <div className={classes.selectedCategory}>
          {selectedCategory.title} <span>{numCollections} Views</span>
        </div>
        <nav className={classes.navigation}>
          {categories.map(category => (
            <Button key={category.id} disabled={category.isEmpty} onClick={() => getCategoryList(category)}>
              {category.title}
            </Button>
          ))}
          <Button onClick={() => openModal(TabVariants.Following)}>Following</Button>
          <Button onClick={() => openModal(TabVariants.Followers)}>Followers</Button>
        </nav>
        <IconButton className={classes.filterButton}>
          <FilterIcon />
        </IconButton>
      </div>
      <Works collectibles={collections} isLoading={false} isArtistPage={account == id} />
      <Modal open={open} onClose={closeModal}>
        <Followers active={active} />
      </Modal>
    </div>
  );
}
