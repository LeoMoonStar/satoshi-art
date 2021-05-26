import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
    return {
        paginationRow: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        countsOfRow: {},
        dataGrid: {
            width: '100%',
            flex: 'initial',
            border: 0,
            marginTop: 30,
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
            },
            '& .MuiDataGrid-columnsContainer': {
                marginTop: -30,
                width: '100%',
                height: 53,
                borderRadius: 9,
                backgroundColor: '#4D0ED2',
                color: '#fff',
            },
            '& .MuiDataGrid-viewport': {
                border: '1px solid #E5E5E5',
                boxSizing: 'border-box',
                borderRadius: 12,
                color: '#3E4954',
            },
            '& .MuiDataGrid-row': {
                '&:hover': {
                    backgroundColor: '#4D0ED210',
                },
            },
            '& .MuiDataGrid-cell': {
                border: 0,
            },
            '& .orderListEventIcon': {
                width: 44,
                height: 33,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
                fontSize: 11,
            },
        },
        controls: {
            display: 'flex',
            flexDirection: 'column',
        },
        paper: {
            borderRadius: 12,
            marginTop: 8,
        },
    }
})

export default useStyles
