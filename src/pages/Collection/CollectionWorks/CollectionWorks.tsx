import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Works from 'components/widgets/Works';

import useStyles from './CollectionWorks.style';

type CategoryType = {
  id: number;
  title: string;
  isEmpty?: boolean;
};

const categories: CategoryType[] = [
  { id: 1, title: 'On sale' },
  { id: 2, title: 'Collectibles' },
];

export default function CollectionWorks(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(categories[1]);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.navigationRow}>
        <div className={classes.selectedCategory}>
          {selectedCategory.title} <span>55 Views</span>
        </div>
        <nav className={classes.navigation}>
          {categories.map(category => (
            <Button 
              key={category.id} 
              disabled={category.isEmpty} 
              onClick={() => setSelectedCategory(category)}
            >
              {category.title}
            </Button>
          ))}
        </nav>
      </div>
      <Works />
    </div>
  );
}
