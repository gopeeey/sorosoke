import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.mygrey.main,
        padding: theme.spacing(5),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
    },
    spaceTop: {
        marginTop: theme.spacing(2)
    }
}))

export default function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="body1">Brought to you by</Typography>
            <Typography variant="body1" className={classes.spaceTop}>A Very Lazy Nigerian Youth</Typography>
        </div>
    )
}