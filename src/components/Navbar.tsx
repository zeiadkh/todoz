import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Theme from './Theme';
import { API_URL } from '../service/auth';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Alert } from '@mui/material';

const settings = ['Dashboard', 'Logout'];
function Navbar() {
  useEffect(() => {
    const fetchData = async (): Promise<void>=> {
      try {
        const token = Cookies.get('token');

        const response = await axios.get(`${API_URL}/users/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
        
      } catch (error) {
        console.error("Error in user:", error);
        setError(error)
        throw error
      }
    };

    fetchData(); 
  }, []);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [error, setError] = React.useState<unknown | null>(null)
  const [userData, setUserData] = React.useState<{id: number, username: string}>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <AppBar position="static" style={{width: "100%", top: 0}}>
      <Container >
        <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography
            variant="h3"
            noWrap
            component="button"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'burlywood',
              textDecoration: 'none',
            }}
          >
            <Link to="/">Todoz</Link>
          </Typography>

          <Typography
            variant="h4"
            noWrap
            component="i"
            
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'burlywood',
              textDecoration: 'none',
            }}
          >
            Todoz
          </Typography>
        

         <Box sx={{display: "flex"}}>
         <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userData?.username[0].toUpperCase()} src="../assets/zk-logo.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link to={setting === "Logout" ? "/logout":setting}>{setting}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Theme />
         </Box>
        </Toolbar>
      </Container>
      <>{ error && <Alert severity='error'>{error.message}</Alert>}</>
    </AppBar>
  );
}
export default Navbar;
