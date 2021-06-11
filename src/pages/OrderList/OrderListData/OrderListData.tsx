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

const month: any = {
  "01": "January", "02": "February", "03": "March", "04": "April", "05": "May", "06": 
  "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December"
}

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

export default function OrderListData(): JSX.Element {
  const classes = useStyles();
  const [orders, setOrders] = useState<any[]>([
      /*{ id: 555231, date: '26 March 2020, 12:42 AM', artist: 'Mikasa Ackerman', artName: 'Wrapped MoonCats', cost: 0.87, event: 0 },
      { id: 555232, date: '26 March 2020, 12:22 AM', artist: 'Grisha Yeager', artName: 'Feeling the vibe', cost: 0.214, event: 0 },
      { id: 555233, date: '26 March 2020, 11:42 AM', artist: 'Eren Yeager', artName: 'Vertigo', cost: 69.99, event: 0 },
      { id: 555234, date: '26 March 2020, 12:42 AM', artist: 'Mikasa Ackerman', artName: 'Wrapped MoonCats', cost: 0.87, event: 0 },
      { id: 555235, date: '26 March 2020, 12:22 AM', artist: 'Grisha Yeager', artName: 'Feeling the vibe', cost: 0.214, event: 0 },
      { id: 555236, date: '26 March 2020, 11:42 AM', artist: 'Eren Yeager', artName: 'Vertigo', cost: 69.99, event: 0 },
      { id: 555237, date: '26 March 2020, 12:42 AM', artist: 'Mikasa Ackerman', artName: 'Wrapped MoonCats', cost: 0.87, event: 0 },
      { id: 555238, date: '26 March 2020, 12:22 AM', artist: 'Grisha Yeager', artName: 'Feeling the vibe', cost: 0.214, event: 0 },
      { id: 555239, date: '26 March 2020, 11:42 AM', artist: 'Eren Yeager', artName: 'Vertigo', cost: 69.99, event: 0 }*/
  ])

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(4);

  

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  // todo: use correct type for columns
  const columns: any[] = [
      { field: 'id', headerName: text['orderId'],
        width: 140,
        renderCell({ row }: { row: any }) {
          return <Link to={`/dashboard/order-list/${row.id}`}>#{row.id}</Link>;
        },
      },
      { field: 'date', headerName: text['date'], flex: 1 },
      { field: 'artist', headerName: text['artist'], 
        flex: 1,
        renderCell({ row }: { row: any }) {
          return <Link to={`/artists/${row.artistId}`}>{row.artist}</Link>;
        },
      },
      { field: 'artName', headerName: text['artName'],
        flex: 2,
        renderCell({ row }: { row: any }) {
          return <Link to={`/product/${row.artId}`}>{row.artName}</Link>;
        },
      },
      { field: 'cost', headerName: text['cost'],
        valueGetter({ row, field }: { row: any; field: keyof any }) {
          return `$${row[field]}`;
        },
      },
      { field: 'event', headerName: text['event'],
        renderCell({ row }: { row: any }) {
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

  const displayDate = (createdate: number) => {
    const timestr = JSON.stringify(new Date(createdate))
    const time = timestr.substr(1, timestr.length - 2)
    const thedate = time.split("T")
    const adate = thedate[0]
    const atime = thedate[1]
    const dateobj = adate.split("-")
    const timeobj = atime.split(":")

    const date = dateobj[2]
    const themonth = month[dateobj[1]]
    const theyear = dateobj[0]
    const hour = parseInt(timeobj[0]) > 12 ? parseInt(timeobj[0]) - 12 : timeobj[0]
    const minute = timeobj[1]
    const period = parseInt(timeobj[0]) > 12 ? 'PM' : 'AM'

    const datestring = date + " " + themonth + " " + theyear + ", " + hour + ":" + minute + " " + period

    return datestring
  }

  useEffect(() => {
      // fetch orders from db
      let event = 1

      getOrderList()
          .then(async({ data }) => {
              const list: any = []

              for (let k = 0; k < data.length; k++) {
                const info: any = data[k]

                const collectible: any = await getCollectible(info.collectibleId)
                const userInfo: any = await getUserInfo(collectible.data.creatorUserId)

                const newInfo = {
                  id: k + 1,
                  date: displayDate(parseInt(info.createDate)),
                  artistId: collectible.data.creatorUserId,
                  artist: userInfo.data.name,
                  artId: info.collectibleId,
                  artName: collectible.data.name,
                  cost: collectible.data.price,
                  event: event
                }

                if (event == 1) {
                  event = 2
                } else if (event == 2) {
                  event = 0
                } else {
                  event = 1
                }

                list.push(newInfo)
              }

              setOrders(list)
          })
  }, [])

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
      {orders.length > 0 ?
        <div className={classes.paginationRow}>
          <div className={classes.countsOfRow}>Showing 1 from {orders.length} data</div>
          {/* <Pagination currentPage={currentPage}
          pageSize={pageSize}
          itemsCount={orders.length}
          onPageChange={handlePageChange}/> */}
        </div>
        :
        <div>No order(s)</div>
      }
    </>
  );
}
