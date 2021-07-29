import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    loginButton: {
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'rgba(21,11,0)',
        "&:hover": {
            backgroundColor: 'rgba(41, 11, 1)'
        }
    },
    registerButton: {
        marginRight: 10,
        marginTop: 10,
        color: 'rgba(21,11,0)',
        borderColor: 'rgba(21,11,0)',
        "&:hover": {
            backgroundColor: 'rgba(21, 11, 1)',
            borderColor: 'rgba(253, 241, 228)',
            color: 'rgba(255, 255, 255)'
        }
    },
    loginTextFields: {
        marginBottom: 10,
    },
    loginContainer: {
        display: "flex",
        justifyContent: 'center',
        width: '100%',
        paddingTop: 250,
        opacity: .90,
    },
    loginCard: {
        padding: 40,
    },
    icon: {
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    }
}));

const Login = ({ setUser, setValue, getUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();
    const inputRef = useRef('form');
    const history = useHistory();

    function handleValueChange(e, type) {
        const {
            target: { value }
        } = e;
        if (type === 'email') setEmail(value);
        else if (type === "password") setPassword(value);
    }
    const onSubmit = e => {
        e.preventDefault();

        const userData = {
            email,
            password
        };
        axios
            .post("/api/auth/register_login", userData)
            .then(res => {
                console.log(res);
                getUser();
                setValue(1);
                history.push("/deckbuilder")
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });

    };
    return (
        <div className={classes.loginContainer}>
            <Card className={classes.loginCard}>
                <div >
                    <img src='/mtgicon.jpg' className={classes.icon} alt="mtgicon" />
                </div>
                <ValidatorForm
                    ref={inputRef}
                    onSubmit={onSubmit}
                    onError={errors => console.log(errors)}
                >
                    <div className="form-group">
                        <TextValidator
                            type="email"
                            value={email}
                            onChange={(e) => handleValueChange(e, 'email')}
                            id="standard-basic"
                            label='Email'
                            aria-describedby="emailHelp"
                            className={classes.loginTextFields}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'Email is not valid']}
                        />
                    </div>
                    <div className="form-group">
                        <TextValidator
                            type="password"
                            label='Password'
                            value={password}
                            onChange={(e) => handleValueChange(e, 'password')}
                            id="standard-basic"
                            className={classes.loginTextFields}
                            onSubmit={onSubmit}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" className={classes.loginButton}>
                        Login
                    </Button>
                </ValidatorForm>
            </Card>
        </div>
    );
};
export default Login;