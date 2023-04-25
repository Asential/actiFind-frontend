import React, { useState} from 'react'
import { Avatar, Paper, Grid, Button, Typography, Container, TextField} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { GoogleLogin } from 'react-google-login';
import Icon from './icon.js'

const Auth = () => {
    const classes = useStyles();
 
    const [showPassword, setShowPassword] = useState(false);
    const [registerMode, setRegisterMode] = useState(false);


    const handleSubmit = () => {

    }
    const handleChange = () => {

    }

    const switchMode = () => {
        setRegisterMode((prevRegisterMode) => !prevRegisterMode)
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword ((prevShowPassword) => !prevShowPassword)

    const googleFailure = () => {
        console.log("Error! Couldn't login with Google.")
    };
    const googleSuccess = (res) => {
        console.log(res);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{registerMode ? 'Register' : 'Login'}</Typography>

                {/* Input is a InputAdorment type component which helps in avoding repetative code such as fixed properties. Refer to Input.js*/}
                <form className={classes.form} onSubmit={() => handleSubmit()}>
                    <Grid container spacing={2}>
                        {   registerMode && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                            </>
                        )}
                        <Input name='email' label="Email" handleChange={handleChange} type="email" />
                        <Input name='password' label="Paswword" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {
                            registerMode &&
                            <Input name='confPassword' label="Confirm Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} />
                        }
                    </Grid>
                    
                    
                    <Button className={classes.submit} type='submit' variant='contained' fullWidth color="primary" >
                        {registerMode ? 'Register' : 'Login'} 
                    </Button>
                    
                    <GoogleLogin
                        clientId="130777497916-i7ur9u7p5e9cn8qcanch4uives3b1s61.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained">
                                Sign In With Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode} >
                                {registerMode ? 'Existing User? ' : 'New User? Register!'} 
                            </Button>
                        </Grid>
                    </Grid>

                    
                </form>
            </Paper>

        </Container>
    )
}

export default Auth