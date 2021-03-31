import React from "react";
import "./style.css";
import logo from "../assets/juniority.svg";
import { Link } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/ChatBubbleOutline";
import NotificationsIcon from "@material-ui/icons/NotificationsNone";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./navBarStyle";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { Avatar } from "@material-ui/core";
import imagen from "../assets/ag.jpg";
const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile">
        {" "}
        <MenuItem onClick={handleMenuClose} className="backgroundAcc">
          Profile
        </MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="primary">
            <MailIcon className="iconColor" />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon className="iconColor" />
          </Badge>
        </IconButton>
        <p>Notificationss</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle className="iconColor" />
        </IconButton>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className="navbar">
        <Link className="containerLogo" to="/">
          <img src={logo} className="logo" alt="Logo Juniority" />
        </Link>

        <div className="containerinputNav">
          {/* <input className="inputCuadro" type="text" />
          <button className="button"></button> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <IconButton>
                <SearchIcon className="searchIcon" />
              </IconButton>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </div>

        <div className="containerbuttonsNavbar ">
          <div className={classes.sectionDesktop}>
            <IconButton>
              <WorkOutlineIcon className="ibutton" />
              <div className="letrabutton">Jobs</div>
            </IconButton>
            <IconButton>
              <PeopleOutlineIcon className="ibutton" />{" "}
              <div className="letrabutton">Connection</div>
            </IconButton>

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="primary">
                <MailIcon className="iconColor" />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon className="iconColor" />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={imagen} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
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
