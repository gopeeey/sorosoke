import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1)
    },
    logoholder: {
        display: 'block',
        width: '68%',
        [theme.breakpoints.up('sm')]: {
            width: '42%'
        },
        [theme.breakpoints.up('md')]: {
            width: '29%'
        },
        [theme.breakpoints.up('lg')]: {
            width: '22%'
        },
        color: 'black',
        display: 'flex',
        justifyContent: 'center'
    },
    logo: {
        maxWidth: '100%'
    }
}))

export default function SimpleAppBar(props) {
    const classes = useStyles();
    return (
        <>
            <AppBar elevation={0} position="static" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <Link href="/" as="" passHref>
                        <a className={classes.logoholder}>
                            <img src='/logo.png' alt='the site logo' className={classes.logo} />
                        </a>
                    </Link>

                </Toolbar>
            </AppBar>
        </>
    )
}