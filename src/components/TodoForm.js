import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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


function TodoForm(props) {

    console.log(props);
    const classes = useStyles();

    // const [Id, setId] = useState(null);
    const [Id, setId] = useState(Math.floor(Math.random() * 10000));

    const [sections, setSections] = useState(props.sections);

    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    


    const [inputDescription, setInputDescription] = useState("");

    const handleChangeDescription = (e) => {
        setInputDescription(e.target.value);
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
    
            console.log(result[0].text);
            console.log(result[0].complete);
            console.log(result[0].description);

            setId(result[0].id);
            setInput(result[0].text);
            
            setInputDescription(result[0].description);
            
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

        // console.dir(e.target.parentNode[0][0].text);
        console.log(props.editId);
        console.log(props.todos);

        if (props.editId == null) {
            console.log('id = nullll');

            props.onSubmit({
                id: Id,
                text: input,
                complete: false,
                description: inputDescription
            });
            setInput("");
            setInputDescription("");

            e.target.parentNode[0][0].selected = true;

            props.onClickHide();

        } else {
            props.editTodo(Id, input, inputDescription);
            props.setEdit();
            props.onClickHide();
        }


    };

    return (
        <React.Fragment >
            <p>{Id}</p>
            

            <form onSubmit={handleSubmit} noValidate autoComplete="off" className={classes.paper}>
                
                    <label>Section</label>

                <TextField id="standard-basic" label="Standard" />

                

                   
               



                <button onClick={handleSubmit}>add todo</button>
            </form>



        </React.Fragment>

    );
}

export default TodoForm;
