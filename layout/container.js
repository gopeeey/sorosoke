import React from 'react';
import SimpleAppBar from './appbar';
import { makeStyles } from '@material-ui/core';
import Footer from './footer'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minHeight: '93vh'
    }
}))

export default function Container(props) {
    const { children } = props;
    const classes = useStyles();
    return (
        <>
            <SimpleAppBar />
            <div className={classes.root}>
                {children}
            </div>
            <Footer />
        </>
    )
}