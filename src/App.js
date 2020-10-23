import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes'; // where we are going to specify our routes

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import TodoList from './components/TodoList';


import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {

  const classes = useStyles();
  return (
    <div className="App">

      <Container maxWidth={false} >

      </Container>

      <Router>
        <Container maxWidth="lg">

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}><NavBar /></Paper>
            </Grid>
            

          </Grid>


          <Button variant="contained" color="primary">
            Hello World
    </Button>



        </Container>

        <Container maxWidth="lg">
          <Routes />
        </Container>


      </Router>

    </div>
  );
}

export default App;
