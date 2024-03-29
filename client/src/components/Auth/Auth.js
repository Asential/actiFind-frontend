import React, { useState} from 'react'
import { Avatar, Paper, Grid, Button, Typography, Container, TextField, Grow} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'

import { GoogleLogin, GoogleOAuthProvider  } from '@react-oauth/google';
import { useDispatch } from 'react-redux'

import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom'

import { register, login} from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [registerMode, setRegisterMode] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(registerMode){
            dispatch(register(formData, history));
        } else {
            dispatch(login(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setFormData(initialState);
        setRegisterMode((prevRegisterMode) => !prevRegisterMode)
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword ((prevShowPassword) => !prevShowPassword)


    // Google Auth
    const googleFailure = (error) => {
        console.log(error);
        alert("Error! Couldn't login with Google.")
    };
    const googleSuccess = async (res) => {
        // "?." is used when we may or may not have the object k/as Optional Chaining.
        const token = res?.credential;
        const result = jwtDecode(token);
        try {
            dispatch({type: 'AUTH', data: {result, token}});
            history.push('/');
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <GoogleOAuthProvider clientId="130777497916-i7ur9u7p5e9cn8qcanch4uives3b1s61.apps.googleusercontent.com" >
        <Grow in>
        <Container component="main" maxWidth="xs">
            
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{registerMode ? 'Register' : 'Login'}</Typography>

                {/* Input is a InputAdorment type component which helps in avoding repetative code such as fixed properties. Refer to Input.js*/}
                <form className={classes.form} onSubmit={handleSubmit}>
                    
                    <Grid container spacing={2}>
                        {   registerMode && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} autoFocus half />
                            </>
                        )}
                        <Input name='email' label="Email" handleChange={handleChange} type="email" />
                        <Input name='password' label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {
                            registerMode &&
                            <Input name='confPassword' label="Confirm Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} />
                        }
                    </Grid>
                    
                    <Button className={classes.submit} type='submit' variant='contained' fullWidth color="primary" >
                        {registerMode ? 'Register' : 'Login'} 
                    </Button>

                    <div style={{display:'flex', justifyContent:'center'}}  color="primary" >
                    <GoogleLogin  
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                        /> 
                    </div>
                    
                    <Grid container justifyContent='center' style={{marginTop: '0.5rem'}}>
                        <Grid item>
                            <Button onClick={switchMode} >
                                {registerMode ? 'Existing User? ' : 'New User? Register!'} 
                            </Button>
                        </Grid>
                    </Grid>
                    
                    
                </form>
            </Paper>
                                
        </Container>
        </Grow>
        </GoogleOAuthProvider>
    )
}

export default Auth