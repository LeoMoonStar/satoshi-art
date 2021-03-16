import { createMuiTheme } from '@material-ui/core/styles'

interface CustomTheme {
    common: {
        pinkColor: string
        blackColor: string
        grayColor: string
        darkerGrayColor: string
        yellowColor: string
        purpleColor: string
    }
}

const typography = {
    fontFamily: 'Sora',
    h1: {
        fontSize: 60,
        fontWeight: 800,
    },
    h2: {
        fontSize: 24,
        fontWeight: 600,
    },
    h3: {
        fontSize: 18,
        fontWeight: 600,
    },
    h4: {
        fontSize: 16,
        fontWeight: 400,
    },
    h5: {
        fontSize: 14,
        fontWeight: 500,
    },
    h6: {
        fontSize: 13,
        fontWeight: 600,
    },
    subtitle1: {
        fontSize: 11,
        fontWeight: 400,
    },
}

// https://material-ui.com/customization/theming/#custom-variables
declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        custom: CustomTheme
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        custom: CustomTheme
    }
}

const theme = createMuiTheme({
    typography,
    palette: {
        primary: {
            main: '#FFFFFF',
        },
    },
    custom: {
        common: {
            pinkColor: '#FF0099',
            blackColor: '#000000',
            grayColor: '#C4C4C4',
            darkerGrayColor: '#7E7E7E',
            yellowColor: '#E3E800',
            purpleColor: '#5113D5',
        },
    },
})

export default theme
