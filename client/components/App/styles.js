import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: "absolute",
    backgroundColor: "rgba(32,32,32,0.9)",
    width: "98%",
    height: "5%",
  },
  loginLogoutButton: {
    position: "absolute",
    right: 0,
    fontSize: 20,
  },
  LogoutButton: {
    position: "absolute",
    top: 2,
    right: 20,
    color: "rgba(220, 220, 220)",
    fontSize: "1vw",
  },
  tabs: {
    height: "100%",
    fontSize: "1vw",
  },
  tabBar: {
    height: "100%",
  },
  registerButton: {
    position: "absolute",
    right: 160,
    fontSize: 20,
  },
}));
