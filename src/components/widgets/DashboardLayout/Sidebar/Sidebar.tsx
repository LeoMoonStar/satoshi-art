import React from 'react';
import { NavLink } from 'react-router-dom';
import text from '../../../../constants/content';

import { HouseIcon, OrderDetailsIcon, LogOutIcon } from 'components/icons';
import useStyles from './Sidebar.style';
import useDisconnect from 'hooks/useDisconnect';

const navItems = [
  {
    id: 1,
    label: 'dashboard',
    href: '/dashboard/user',
    Icon: HouseIcon,
  },
  {
    id: 2,
    label: 'orderList',
    href: '/dashboard/order-list',
    Icon: OrderDetailsIcon,
  },
];

function Header(): JSX.Element {
  const classes = useStyles();
  const handleDisconnect = useDisconnect();

  return (
    <div className={classes.container}>
      <nav>
        {navItems.map(({ id, label, href, Icon }) => (
          <NavLink to={href} activeClassName={classes.navItemActive} key={id} className={classes.navItem}>
            <Icon />
            {}
          </NavLink>
        ))}
        <button type='button' onClick={handleDisconnect} className={classes.navItem}>
          {/* todo: change icon logOut to disconnect */}
          <LogOutIcon />
          {text['disconnect']}
        </button>
      </nav>
    </div>
  );
}

export default Header;
