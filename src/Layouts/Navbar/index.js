import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/images/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import { Colors } from "../../constants/Colors";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebase";

import { useAuth } from "../../firebase/AuthContext";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [settings, setSettings] = React.useState([]);

  const [anchorElLearn, setanchorElLearn] = React.useState(null);
  const openLearn = Boolean(anchorElLearn);

  const { currentUser } = useAuth();

  const pages = ["Home", "Learn", "Help"];

  const learnMenu = [
    "Tech Use in Daily Life",
    "Technology Use for Class and Word",
    "Technology Safety and Privacy",
    "Finance and Management",
    "Job Application Support",
    "Accessing Public Services and Resources"
  ];

  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      console.log("current user is ", currentUser);
      if (currentUser.uid === "h9IvP69YaPfmcNFiqx78VUnwJ0v2") {
        setSettings(["Logout", "Add Videos", "Help Manager"]);
      } else {
        setSettings(["Logout"]);
      }
    } else {
      setSettings(["Login"]);
    }
  }, [currentUser, navigate]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLearnOpen = (event) => {
    setanchorElLearn(event.currentTarget);
  };

  //TODO: Add similar things for mobile phone
  const handleCloseLearn = (index) => {
    switch (index) {
      case 0:
        navigate("/techInDailyLife");
        break;

      case 1:
        navigate("/techInClassAndWord");
        break;

      case 2:
        navigate("/techSafetyAndPrivacy");
        break;

      case 3:
        navigate("/financeAndManagement");
        break;

      case 4:
        navigate("/jobSupport");
        break;

      case 5:
        window.open("https://www.findhelp.org");
        break;

      default:
        break;
    }

    setanchorElLearn(null);
  };

  const handleCloseNavMenu = (event, index) => {
    setAnchorElNav(null);
    if (index === 0) {
      navigate("/");
    } else if (index === 1) {
      //learn tab
      setanchorElLearn(event.currentTarget);
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === settings[0]) {
      if (settings[0] === "Login") {
        navigate("/login");
      } else {
        logout();
      }
    } else if (settings.length === 3 && setting === settings[1]) {
      //this is going to add youtube video page
      navigate("/addYoutubeVideos");
    } else if (settings.length === 3 && setting === settings[2]) {
      navigate("/helpManager");
    }
  };

  return (
    <AppBar style={{ background: Colors.backgroundColor }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              height: "4rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              cursor: "pointer"
            }}
            alt="project-rebound-logo"
            src={logo}
            onClick={() => {
              navigate("/home");
            }}
          />

          {/* For mobile devices */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color={Colors.primaryColor}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCloseNavMenu(index);
                  }}
                >
                  <Typography
                    style={{ fontFamily: "Inria Sans" }}
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* For mobile devices */}
          <Box
            component="img"
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              height: "4rem",
              marginTop: "1rem",
              marginBottom: "1rem"
            }}
            alt="project-rebound-logo"
            src={logo}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          ></Typography>

          {/* For medium devices */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center" // Center the buttons horizontally
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={(event) => handleCloseNavMenu(event, index)}
                sx={{
                  mx: 1,
                  color: Colors.primaryColor,
                  fontFamily: "Inria Sans",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "none",
                    color: Colors.primaryColor
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: Colors.primaryColor }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography
                    style={{ fontFamily: "Inria Sans" }}
                    textAlign="center"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
