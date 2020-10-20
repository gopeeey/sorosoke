import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'light',

        primary: {
            main: '#BD000F'
        },

        secondary: {
            main: '#ffffff'
        },

        transWhite: {
            main: 'rgba(250, 250, 250, 0.8)',
            light: 'rgba(250, 250, 250, 0.4)',
            nslight: 'rgba(250, 250, 250, 0.6)',
            dark: 'rgba(250, 250, 250, 0.849567)'
        },

        transBlack: {
            main: 'rgba(0, 0, 0, 0.7)',
            light: 'rgba(0, 0, 0, 0.4)',
            dark: 'rgba(0, 0, 0, 0.849567)'
        },

        white: {
            main: 'rgb(250, 250, 250)'
        },

        mygrey: {
            main: '#6C809A'
        }
    },
})

export default theme;