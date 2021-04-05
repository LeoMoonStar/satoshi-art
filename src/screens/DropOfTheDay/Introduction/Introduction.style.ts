import { makeStyles } from '@material-ui/core/styles'
import backgroundImage from 'shared/images/dropOfTheDay/introBackground.jpg'

const useStyles = makeStyles(() => {
    return {
        container: {
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            height: 780,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            padding: '344px 136px 158px',
        },
        article: {
            position: 'relative',
            width: '55%',
            boxSizing: 'border-box',
            paddingLeft: 60,
            color: '#fff',
        },
        title: {
            margin: '0 0 9px',
            lineHeight: '100px',
            fontSize: 80,
            fontWeight: 800,
        },
        content: {
            width: 533,
            fontWeight: 600,
            lineHeight: '25px',
            letterSpacing: '-0.04em',
            fontSize: 20,
        },
        pageTitle: {
            bottom: 0,
            left: 30,
            fontWeight: 800,
            fontSize: 30,
            position: 'absolute',
            transform: 'rotateZ(-90deg)',
            transformOrigin: 'left bottom',
        },
        artistImage: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 770,
        },
    }
})
export default useStyles
