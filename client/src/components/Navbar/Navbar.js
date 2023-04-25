import React, {useState, useEffect} from 'react';
import { Link, useHistory, useLocation} from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import AcUnitIcon from '@material-ui/icons/AcUnit';
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
            <div className={classes.brandContainer} Link to="/">
                <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center"> ActiFind </Typography>
                <AcUnitIcon className={classes.icon} height="60"></AcUnitIcon>
            </div>

            <Toolbar className={classes.toolbar}>
                { user ? (
                    // Logged in
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6"> {user.result.name}</Typography>
                        <Button className={ classes.logout} color='secondary' variant="contained" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    // Guest
                    <div>
                        <Button className={ classes.logout} component={Link} to="/auth" color='primary' variant="contained">Sign In</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;