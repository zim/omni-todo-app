import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function TodoList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    const [todos, setTodos] = useState([]);

    const [todosSelected, setTodosSelected] = useState([]);
    //Track is edit clicked or not
    const [editId, setEdit] = useState(null);
    //Save input value in input box
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        console.log("use effect one");

        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            setTodos(todos);
        }
    }, []);

    useEffect(() => {
        console.log("use effect two");

        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    console.log(todos);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
<React.Fragment>
            <button type="button" onClick={handleOpen}>
                react-transition-group
      </button>
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
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                        <TodoForm />
                    </div>
                </Fade>
            </Modal>

            <List dense className={classes.root}>
                {todos.map((todo, index) => {
                    const labelId = `checkbox-list-secondary-label-${todo.text}`;
                    return (
                        <ListItem key={todo.id} button>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${todo.id + 1}`}
                                    src={`/static/images/avatar/${todo.id + 1}.jpg`}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`Line item ${todo.id + 1}`} />
                            <ListItemText id={labelId} primary={todo.text} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(todo.id)}
                                    checked={checked.indexOf(todo.id) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>

</React.Fragment>
        

    );
}

export default TodoList;