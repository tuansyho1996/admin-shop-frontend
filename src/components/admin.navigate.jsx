// components/VerticalMenu.js

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export default function Navigate() {
  return (
    <div className="h-auto w-60 bg-gray-100 shadow-md">
      <List component="nav" className="p-4">
        <Link to="/" >
          <ListItem className="hover:bg-gray-200 rounded-lg">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link to="/category" >
          <ListItem className="hover:bg-gray-200 rounded-lg">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
        </Link>
        <Link to="/media" >
          <ListItem className="hover:bg-gray-200 rounded-lg">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Media" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
