import React, {useState, useEffect} from 'react';
import { Link, useHistory, useLocation} from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

export const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    
    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    };
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);

            // Get time elapsed in miliseconds since token generation.
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer} component={Link}  to="/">
                <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center"> actiFind </Typography>
                <NaturePeopleIcon  className={classes.icon} height="60"></NaturePeopleIcon>
            </div>

            <Toolbar className={classes.toolbar}>
                { user ? (
                    // Logged in
                    <div className={classes.profile}>
                        {/* <Avatar className={classes.mainGreen} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar> */}
                        <Typography className={classes.userName} variant="h6"> <strong>{user.result.name}</strong></Typography>
                        <Button className={ `${classes.logout}, ${classes.purple}`} color='secondary' variant="contained" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    // Guest
                    <div className={classes.logoutContainer}>
                        <Button className={ ` ${classes.mainGreen}`} component={Link} to="/auth"  variant="contained">Sign In</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;