import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from './Todo';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grid, Container, Box, Button, Modal, Backdrop, Fade, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        minWidth: 600,
        margin: '0px!important',
    },
    listItemText: {
        border: '2px solid red',
        alignItems: 'left',
        justifyContent: 'left',
    },
    todolist: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        minWidth: 600,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '60%',
        outline: 'none',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    boxContainer: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: '0px!important',
    },
    box: {
        border: '2px solid red',
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    grid: {

    },
}));

function TodoList() {
    const classes = useStyles();

    // useState hooks
    const [checked, setChecked] = React.useState([1]);
    const [todos, setTodos] = useState([]);
    const [todosEmptyBool, setTodosEmptyBool] = useState(true);

    const [todosSelected, setTodosSelected] = useState([]);
    //Track is edit clicked or not
    const [editId, setEdit] = useState(null);

    const [inputValue, setInputValue] = useState("");

    // Set localStorage on initial mount
    useEffect(() => {
        console.log("use effect one");

        const todos = JSON.parse(localStorage.getItem('todos-omni-dev1'));
        if (todos) {
            setTodos(todos);
            // setTodosEmptyBool(false);
        }
    }, []);

    // update localStorage on data change
    useEffect(() => {
        console.log("use effect two");
        console.log(todos.length);

        if(todos.length==0){
            setTodosEmptyBool(!todosEmptyBool);
        }

        localStorage.setItem('todos-omni-dev1', JSON.stringify(todos));
        
    }, [todos]);

    // console.log(todos);

    const [dev, setDev] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        console.log("const handleOpen = () => {");

        console.log(editId);
        setOpen(true);
    };

    const handleClose = () => {
        console.log("const handleClose = () => {");
        setOpen(false);
        setEdit(null);
    };

    // clsx experiment button
    const [openClsx, setOpenClsx] = React.useState(false);

    const handleOpenClsx = () => {
        console.log("const handleOpenClsx = () => {");
        setOpenClsx(!openClsx);
    };

    const handleToggle = (value) => () => {

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        // console.log(value);
        // console.log(currentIndex);
        // console.log(newChecked);


        if (currentIndex === -1) {
            console.log("currentIndex === -1");
            newChecked.push(value);
            // completeTodo(value);
        } else {
            console.log("Else currentIndex === -1");
            // completeTodo(value);
            newChecked.splice(currentIndex, 1);
        }

        completeTodo(value);
        setChecked(newChecked);
    };

    const handleEditChange = (id, text) => {
        console.log("handle edit channngge");
        // console.log(id);
        // console.log(text);

        setEdit(id);
        setInputValue(text);
        handleOpen();

        console.log(editId);
        // setModalShow(true);
    };

    const addTodo = (todo) => {
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return;
        }

        console.log(todos.length);
        if (todos.length == 0) {
            setTodosEmptyBool(!todosEmptyBool);
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        
    };

    const removeTodo = (id) => {
        const removedArr = [...todos].filter((todoId) => todoId.id !== id);

        setTodos(removedArr);
    };

    const completeTodo = (id) => {
        console.log("completeTodo");
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.complete = !todo.complete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const editTodo = (id, title, description, dueDate, complete) => {
        console.log("const editTodo = (id, title, description, dueDate, complete) => {");

        let editTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.complete = complete;
            }
            return todo;
        });
        setTodos(editTodos);
        setEdit(false);
    };


    const { foo, bar, baz } = classes;
    const style = clsx(foo, bar, baz);

    return (
        <React.Fragment>



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.modal}>
                        <TodoForm onClose={handleClose} onSubmit={addTodo} todos={todos} editId={editId} editTodo={editTodo} setEdit={setEdit} />
                    </div>
                </Fade>
            </Modal>

            <Grid container spacing={3} className={classes.boxContainer}>

                <Grid item xs={12} className={clsx(classes.grid, dev && classes.hide)}>
                    <Box className={classes.box}>xs=12</Box>
                </Grid>
                <Grid item xs={6} className={clsx(dev && classes.hide)}>
                    <Box className={classes.box}>xs=6</Box>
                </Grid>
                <Grid item xs={6} className={clsx(dev && classes.hide)}>
                    <Box className={classes.box}>xs=6</Box>
                </Grid>

                <Grid item xs={3}>
                    <Box className={classes.box}>xs=3</Box>
                </Grid>

                <Grid item xs={3}>
                    <Box className={classes.box}>xs=3</Box>
                </Grid>

                <Grid item xs={3}>
                    <Box className={classes.box}>xs=3</Box>
                </Grid>

                <Grid item xs={3}>
                    <Box className={classes.box}>xs=3</Box>
                </Grid>

                <Grid item xs={12}>
                    <Box className={classes.box}>
                        <img src="http://localhost:3000/1.jpg" alt="logo" />
                    </Box>
                </Grid>

                <Grid item xs={12} className={classes.grid}>
                    <Box className={classes.box}>
                        <Typography variant="h1">Todo App</Typography>
                        <Typography variant="body1"><span className={clsx(!todosEmptyBool && classes.hide)}>You do not have any Todo items at the moment.
                            <br /></span>
                            Click the 'CREATE TODO' button below to add todo item.</Typography>
                    </Box>
                </Grid>
                

                <Grid item xs={12}>
                    <Box className={classes.box}>

                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            Create Todo
                        </Button>

                        <Button variant="contained" color="primary" onClick={handleOpenClsx}>
                            CLSX experiment
                        </Button>

                        <Box variant="contained" color="primary" className={clsx(classes.clsxBox1, openClsx && classes.hide)}>
                            CLSX BOX experiment
                        </Box>

                    </Box>
                </Grid>

                <Grid item xs={12}>




                    {todos.map((todo, index) => {

                        return (

                            <Todo
                                key={index}
                                id={todo.id}
                                title={todo.title}
                                description={todo.description}
                                dueDate={todo.dueDate}
                                complete={todo.complete}
                                handleToggle={(e) => handleToggle(e)}
                                checked={checked}
                                todos={todosSelected}
                                setTodos={setTodos}
                                completeTodo={completeTodo}
                                removeTodo={removeTodo}
                                editTodo={editTodo}
                                handleEditChange={handleEditChange}
                                editId={editId}
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                            />

                        );
                    })}
                </Grid>

            </Grid>



        </React.Fragment>

    );
}

export default TodoList;