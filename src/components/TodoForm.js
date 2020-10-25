import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
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
    form: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        outline: 'none',
        padding: theme.spacing(2, 4, 3),
        width: '100%',
    },
}));


function TodoForm(props) {

    console.log(props);
    const classes = useStyles();

    // const [Id, setId] = useState(null);
    const [Id, setId] = useState(Math.floor(Math.random() * 10000));

    // Create input state
    const [inputTitle, setInputTitle] = useState("");
    const handleChangeTitle = (e) => {
        console.log(e.target.value);
        setInputTitle(e.target.value);
    };

    const [inputDescription, setInputDescription] = useState("");
    const handleChangeDescription = (e) => {
        console.log(e.target.value);
        setInputDescription(e.target.value);
    };

    const [inputComplete, setInputComplete] = useState(false);
    const handleChangeComplete = (e) => {
        console.log(e.target.checked);
        setInputComplete(e.target.checked);
    };

    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    const dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // const dateToday = today;
    const dateTodayVersion1 = today.toLocaleDateString("en-UK");

    console.log(dateToday);
    console.log(dateTodayVersion1);


    const [inputDueDate, setInputDueDate] = useState(dateToday);
    
    const handleChangeDueDate = (e) => {
        console.log(e.target.value);
        
        setInputDueDate(e.target.value);
    };




    useEffect(() => {
        console.log("useEffect Todo form");
        console.log(props);

        console.log(props.editId);
        console.log(props.todos);




        if (props.editId == null) {
            console.log('id = nullll');
        } else {
            console.log('id NOT nullll');
            console.log(props.editId);

            const result = props.todos.filter(todo => todo.id === props.editId);
            console.dir(result);
            console.log(result[0].id);

            console.log(result[0].title);
            console.log(result[0].description);
            console.log(result[0].dueDate);
            console.log(result[0].complete);

            setId(result[0].id);
            setInputTitle(result[0].title);
            setInputDueDate(result[0].dueDate);
            setInputDescription(result[0].description);
            setInputComplete(result[0].complete);

        }

        // setInput(e.target.value);
        // setInputSection(e.target.value);

        // const todos = JSON.parse(localStorage.getItem('todos'));
        // if (todos) {
        //     setTodos(todos);
        // }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("on submitttttt");
        // console.dir(e.target.parentNode[0][0].text);
        console.log(props.editId);
        console.log(props.todos);
        console.log(Id);
        console.log(inputTitle);
        console.log(inputDescription);
        console.log(inputDueDate);
        console.log(inputComplete);


        if (props.editId == null) {
            console.log('id = nullll');

            props.onSubmit({
                id: Id,
                title: inputTitle,
                description: inputDescription,
                dueDate: inputDueDate,
                complete: inputComplete
            });
            setInputTitle("");
            setInputDescription("");
            setInputDueDate(null);
            setInputComplete([0]);

            // e.target.parentNode[0][0].selected = true;

            props.onClose();

        } else {
            props.editTodo(Id, inputTitle, inputDescription, inputDueDate, inputComplete);
            props.setEdit();
            props.onClose();
            // props.onClickHide();
        }


    };

    return (
        <React.Fragment >



            <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.form}>

                <FormLabel component="legend">Add Todo Form</FormLabel>
                <p>{Id}</p>

                <FormGroup>


                    <InputLabel htmlFor="input-title">Title</InputLabel>
                    <TextField
                        id="input-title"


                        placeholder="Title"
                        fullWidth
                        margin="normal"

                        variant="outlined"

                        value={inputTitle}
                        onChange={handleChangeTitle}
                    />

                    <InputLabel htmlFor="input-description">Description</InputLabel>
                    <TextField
                        id="input-description"
                        fullWidth
                        margin="normal"
                        multiline={true}
                        onChange={handleChangeDescription}
                        placeholder="Description"
                        rows={3}
                        value={inputDescription}
                        variant="outlined"
                    />

                    <InputLabel htmlFor="input-due-date">Due Date</InputLabel>
                    <TextField
                        id="input-due-date"

                        type="date"
                        margin="normal"
                        onChange={handleChangeDueDate}
                        value={inputDueDate}
                    />

                    

                    <FormControlLabel
                        value="complete"
                        control={<Checkbox onChange={handleChangeComplete} color="primary" checked={inputComplete} />}
                        label="Complete"
                        labelPlacement="start"

                    />

                    <Button variant="contained" color="primary" onClick={handleSubmit}>add todo</Button>

                </FormGroup>

            </form>



        </React.Fragment>

    );
}

export default TodoForm;
