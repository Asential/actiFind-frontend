import React from "react";
import { Container, AppBar, Typography, Grow, Grid, Icon } from '@material-ui/core'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles"

const App = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center"> ActiFind </Typography>
                <AcUnitIcon className="image" height="60"></AcUnitIcon>
            </AppBar>
            <Grow in>
                <Container >
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Form />                            
                        </Grid>  
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                                            
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;