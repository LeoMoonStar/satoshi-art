import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 57,
        },
        imageWrapper: {
            position: 'relative',
        },
        tokenImage: {
            width: 885,
            height: 710,
        },
        iconsContainer: {
            display: 'flex',
            float: 'right',
            position: 'absolute',
            top: 28,
            right: 17,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        socialActivityContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 30,
        },
        socialActivityAmount: {
            paddingLeft: 8,
            color: theme.custom.common.darkerGrayColor,
        },
        artLabel: {
            color: theme.custom.common.pinkColor,
        },
        tokenDetailsContainer: {
            marginTop: 28,
            marginLeft: 65,
        },
        tokenPriceContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: 5,
        },
        tokenDollarPrice: {
            color: theme.custom.common.darkerGrayColor,
            fontWeight: 400,
            marginLeft: 5,
        },
        descriptionContainer: {
            color: theme.custom.common.darkerGrayColor,
            marginTop: 25,
            marginBottom: 40,
        },
        styledTab: {
            textTransform: 'none',
            minWidth: 'max-content',
            padding: '0px 15px 0px 5px',
        },
        selectedTab: {
            color: theme.custom.common.blackColor,
        },
        notActiveTab: {
            color: theme.custom.common.grayColor,
        },
        highestBidInfoContainer: {
            marginTop: 50,

            '& h6': {
                color: theme.custom.common.grayColor,
            },
        },
        highestBidContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
        },
        walletAddress: {
            color: theme.custom.common.pinkColor,
            marginLeft: 5,
        },
        bidDollarAmount: {
            color: theme.custom.common.darkerGrayColor,
            marginLeft: 5,
        },
        buttonsContainer: {
            marginTop: 10,
        },
        buyButton: {
            width: 157,
            height: 40,
            backgroundColor: theme.custom.common.pinkColor,
            color: theme.palette.primary.main,
            borderRadius: 40,
        },
        placeBidButton: {
            position: 'relative',
            width: 204,
            height: 40,
            marginLeft: 20,
            boxSizing: 'border-box',
            textTransform: 'initial',
            borderRadius: 40,
            border: `1px solid ${theme.custom.common.purpleColor}`,
            '& span': {
                color: '#FF0099',
                background: '-webkit-linear-gradient(left, #6A2FE7, #FF0099)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            },
        },
        serviceFeeInfoContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
        },
        serviceCryptoFee: {
            color: theme.custom.common.darkerGrayColor,
            marginLeft: 5,
        },
        serviceDollarFee: {
            color: theme.custom.common.grayColor,
            marginLeft: 5,
        },
    }
})

export default useStyles
