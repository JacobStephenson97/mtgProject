import React, { useEffect } from 'react';
import './App.css'
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import axios from 'axios'
import useStyles from './styles.js'
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import Login from '../Login/Login'

const App = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0)
    const [user, setUser] = React.useState({})


    useEffect(() => {
        getUser()
    }, []);
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3000/user"
        }).then((res) => setUser(res.data))
    }
    const handleLogout = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3000/logout"
        }).then((res) => {
            if (res.status == 200)
                setUser({})
        })
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        let path = window.location.pathname
        if (path === "/one" && value !== 0) setValue(0);
        else if (path === "/deckbuilder" && value !== 1) setValue(1);
        else if (path === "/login" && value !== 2) setValue(2);
    }, [value,]);
    console.log(user)
    return (
        <BrowserRouter>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs onChange={handleChange} value={value}>
                        <Tab value={0} label="Home" to="/home" component={Link} />
                        <Tab value={1} label="Deck Builder" to="/deckbuilder" component={Link} />
                        {user._id ? <Tab label="Logout" className={classes.loginLogoutButton} onClick={handleLogout} /> : <Tab value={2} label="Login" to="/login" component={Link} className={classes.loginLogoutButton} />}
                    </Tabs>
                </AppBar>
                <Switch>
                    <Route path="/home" component={Login} />
                    <Route path="/deckbuilder" component={DeckBuilder} />
                    <Route path='/login' render={(props) => <Login setUser={setUser} setValue={setValue} getUser={getUser} />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
export default App;