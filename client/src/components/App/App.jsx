import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios'
import "./App.css"
import useStyles from './styles';
import Login from '../Login/Login'
import TabPanel from './TabPanel';
import Button from '@material-ui/core/Button';

const App = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState({})
    const handleChange = (event, newValue) => setValue(newValue);

    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3000/user"
        }).then((res) => setUser(res))

    }
    console.log(user)
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabBar} TabIndicatorProps={{ style: { backgroundColor: "white" } }}>
                    <Tab label="Home" id="simple-tab-0" className={classes.tabs} />
                    <Tab label="Decks" id="simple-tab-1" className={classes.tabs} />
                    <Tab label="Play" id="simple-tab-2" className={classes.tabs} />
                    <Tab label="Login2" color="inherit" />
                    <Tab label="Login" color="inherit" className={classes.loginLogoutButton} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={3}>
                <Login setTab={tabNumber => setValue(tabNumber)} />
            </TabPanel>
        </div>
    );
}
export default App;