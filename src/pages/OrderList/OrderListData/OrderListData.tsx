import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Button, Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import text from '../../../constants/content';
import { ShowMoreIcon, SortedArrowsDownIcon, SortedArrowsUpIcon } from 'components/icons';
import Pagination from 'components/widgets/Pagination';
import { getOrderList, getUserInfo } from 'apis/users'
import { getCollectible } from 'apis/collectibles'

import useStyles from './OrderListData.style';

enum OrderEvents { Bid, Buy, Sell }

type OrderEventType = {
  label: string;
  color: string;
  backgroundColor: string;
};

const orderEvents: { [key in OrderEvents]: OrderEventType } = {
  [OrderEvents.Bid]: { label: 'bid', backgroundColor: '#00C2FF15', color: '#00C2FF' },
  [OrderEvents.Buy]: { label: 'buy', backgroundColor: '#FFB80015', color: '#FFB800' },
  [OrderEvents.Sell]: { label: 'sell', backgroundColor: '#4D0ED215', color: '#4D0ED2' },
};

const Controls = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const anchorElRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={anchorElRef}>
      <IconButton onClick={() => setOpen(!isOpen)}>
        <ShowMoreIcon />
        <Popover
          anchorEl={anchorElRef?.current}
          classes={{ paper: classes.paper }}
          open={isOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          onClose={() => setOpen(false)}
          disableRestoreFocus
        >
          <div className={classes.controls}>
            <Button>Remove</Button>
            <Button>Print</Button>
            <Button>Edit</Button>
          </div>
        </Popover>
      </IconButton>
    </div>
  );
};

type RowType = {
  id: number;
  date: string;
  artist: string;
  artName: string;
  cost: number;
  event: OrderEvents;
};

export default function OrderListData(): JSX.Element {
  const classes = useStyles();
  const [orders, setOrders] = useState([
      { id: 555231, date: '26 March 2020, 12:42 AM', artist: 'Mikasa Ackerman', artName: 'Wrapped MoonCats', cost: 0.87, event: 1 },
      { id: 555232, date: '26 March 2020, 12:22 AM', artist: 'Grisha Yeager', artName: 'Feeling the vibe', cost: 0.214, event: 2 },
      { id: 555233, date: '26 March 2020, 11:42 AM', artist: 'Eren Yeager', artName: 'Vertigo', cost: 69.99, event: 0 },
      { id: 555234, date: '26 March 2020, 12:42 AM', artist: 'Mikasa Ackerman', artName: 'Wrapped MoonCats', cost: 0.87, event: 1 },
      { id: 555235, date: '26 March 2020, 12:22 AM', artist: 'Grisha Yeager', artName: 'Feeling the vibe', cost: 0.214, event: 2 },
      { id: 555236, date: '26 March 2020, 11:42 AM', artist: 'Eren Yeager', artName: 'Vertigo', cost: 69.99, event: 0 },
      { id: 555237, date: '26 March 2020, 12:42 AM', artist: 'Mikasa Ackerman', artName: 'Wrapped MoonCats', cost: 0.87, event: 1 },
      { id: 555238, date: '26 March 2020, 12:22 AM', artist: 'Grisha Yeager', artName: 'Feeling the vibe', cost: 0.214, event: 2 },
      { id: 555239, date: '26 March 2020, 11:42 AM', artist: 'Eren Yeager', artName: 'Vertigo', cost: 69.99, event: 0 },
  ])

  // todo: use correct type for columns
  const columns: any[] = [
      { field: 'id', headerName: text['orderId'],
        width: 140,
        renderCell({ row }: { row: RowType }) {
          return <Link to={`dashboard/order-list/${row.id}`}>#{row.id}</Link>;
        },
      },
      { field: 'date', headerName: text['date'], flex: 1 },
      { field: 'artist', headerName: text['artist'], flex: 1 },
      { field: 'artName', headerName: text['artName'],
        flex: 2,
        renderCell({ row }: { row: RowType }) {
          return <Link to={`dashboard/order-list/${row.id}`}>{row.artName}</Link>;
        },
      },
      { field: 'cost', headerName: text['cost'],
        valueGetter({ row, field }: { row: RowType; field: keyof RowType }) {
          return `$${row[field]}`;
        },
      },
      { field: 'event', headerName: text['event'],
        renderCell({ row }: { row: RowType }) {
          const targetEvent: OrderEvents = row.event;
          const event: OrderEventType = orderEvents[targetEvent];

          return (
            <div className='orderListEventIcon' style={{ color: event.color, backgroundColor: event.backgroundColor }}>
              {event.label}
            </div>
          );
        },
      },
      { field: '', headerName: '',
        renderCell() {
          return <Controls />;
        },
      }
  ]

  useEffect(() => {
      // fetch orders from db
      getOrderList()
          .then(({ data }) => {
              const orderList: any = []

              data.forEach(async function (info: any, index: number) {
                  const collectible = await getCollectible(info.collectibleId)
                  const userInfo = await getUserInfo(collectible.data.creatorUserId)

                  orderList.push({
                      id: index,
                      date: info.createDate,
                      artist: userInfo.data.name,
                      artName: collectible.data.name,
                      cost: collectible.data.price,
                      event: 1
                  })
              })

              setOrders(orderList)
          })
  })

  return (
    <>
      <DataGrid
        className={classes.dataGrid} rows={orders}
        components={{ ColumnSortedDescendingIcon: SortedArrowsUpIcon, ColumnSortedAscendingIcon: SortedArrowsDownIcon }}
        columns={columns}
        pageSize={10}
        autoHeight hideFooterRowCount hideFooterPagination hideFooterSelectedRowCount hideFooter
        disableColumnMenu
      />
      {orders.length > 0 && (
        <div className={classes.paginationRow}>
          <div className={classes.countsOfRow}>Showing 1 from {orders.length} data</div>
          <Pagination />
        </div>
      )}
    </>
  );
}
