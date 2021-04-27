import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "../assets/juniority.svg";
import { Link } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DvrOutlinedIcon from '@material-ui/icons/DvrOutlined';
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/ChatBubbleOutline";
import NotificationsIcon from "@material-ui/icons/NotificationsNone";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./navBarStyle";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { Avatar, Button } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/currentUser";
import { setLocationUrl } from "../../store/locationUrl";
import { setKeynavbar } from "../../store/keywordNavbar";
import { db } from "../../firebase/firebase";
import juniority from "../assets/juniorityText.png"

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.currentUser);
  const locationUrl = useSelector((state) => state.locationUrl);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [queryNavbar, setQueryNavbar] = useState("");
  const [notificationMessages, setNotificationMessages] = useState([]);

  useEffect(() => {
    dispatch(setKeynavbar(queryNavbar));
  },[queryNavbar]);

  useEffect(() => {
    db.collection('user').doc(currentUser.id).collection('notificationMessages')
    .onSnapshot(snapshot =>{
      const docs = [];
      snapshot.docs.map(doc => docs.push({ ...doc.data() }));
     
      const unique = (arr , key ) =>{
        return [...new Map(arr.map(item => [item[key], item])).values()]
      }
      const uniqueMessages = unique(docs, 'fromUserEmail') 
      setNotificationMessages(uniqueMessages)
    })
  },[]);


  const handleClickNavbar = (e) => {
    e.preventDefault();
    setQueryNavbar("");
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    dispatch(setLocationUrl(!locationUrl));
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser(false));
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: "top", horizontal: "right" }} id={menuId} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={isMenuOpen} onClose={handleMenuClose}>
      <Link to={`/profile/${currentUser.id}`}>
        {" "}
        <MenuItem onClick={handleMenuClose} className='backgroundAcc'>
          Profile
        </MenuItem>
      </Link>
      <MenuItem onClick={(e) => logOut(e)}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: "top", horizontal: "right" }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='primary'>
            <MailIcon className='iconColor' />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      
      <MenuItem>
        <IconButton aria-label='show 11 new notifications'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon className='iconColor' />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='inherit'>
          <AccountCircle className='iconColor' />
        </IconButton>
        <Link to={`/profile/${currentUser.id}`}>
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );
  

  return (
    <div>
      <div className='navbar'>
        <div className="div__logo">
        <Link className='containerLogo' to='/'>
          <img src={logo} className='logo' alt='Logo Juniority' />
        </Link>
        {/* <div className='logo__juniorty'> */}
        <img src={juniority}  alt='Logo Juniority' className='logo__juniorty'/>
        {/* </div> */}
        </div>
        <div className='containerinputNav'>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Button onClick={handleClickNavbar}>
                <HighlightOffIcon className='searchIcon' onClick={handleClickNavbar} />
              </Button>
            </div>
            <InputBase placeholder='Search…' value={queryNavbar} onChange={(e) => setQueryNavbar(e.target.value)}
              classes={{root: classes.inputRoot,input: classes.inputInput}} inputProps={{ "aria-label": "search" }}/>
          </div>
        </div>

        <div className='containerbuttonsNavbar '>
          <div className={classes.sectionDesktop}>
            <Link to="/courses">
              <IconButton>
                <DvrOutlinedIcon className="ibutton" />
                <div className="letrabutton">Courses</div>
              </IconButton>
            </Link>
            <Link to="/jobs">
              <IconButton>
                <WorkOutlineIcon className="ibutton" />
                <div className="letrabutton">Jobs</div>
              </IconButton>
            </Link>
            <Link to="/connections">
              <IconButton>
                <PeopleOutlineIcon className="ibutton" />{" "}
                <div className="letrabutton">Connection</div>
              </IconButton>
            </Link>
            {notificationMessages !=='' ? (
              <IconButton aria-label='messages notifications' color='inherit'>
                <Badge badgeContent={notificationMessages.length ? notificationMessages.length :0} color='secondary'>
                  <MailIcon className='iconColor' />
                </Badge>
              </IconButton>
            ) : null}
            {currentUser.followers ? (
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={currentUser.followers.length ? currentUser.followers.length :0} color="primary">
                  <NotificationsIcon className="iconColor" />
                </Badge>
              </IconButton>
            ) : null}
            
            <IconButton edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
              <Avatar src={currentUser.avatar} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label='show more' aria-controls={mobileMenuId} aria-haspopup='true' onClick={handleMobileMenuOpen} color='inherit'>
              <MoreIcon />
            </IconButton>
          </div>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
