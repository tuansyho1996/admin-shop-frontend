// components/VerticalMenu.js

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import MediaIcon from '@mui/icons-material/InsertLink';
import TopCategoryIcon from '@mui/icons-material/AlignVerticalTop';
import ReviewsIcon from '@mui/icons-material/Reviews';
import OrderIcon from '@mui/icons-material/Checklist';
import BlogIcon from '@mui/icons-material/Note';

export default function Navigate() {
  return (
    <div className="h-auto w-60  shadow-md">
      <List component="nav" className="p-4">
        <Link to="/" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link to="/category" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
        </Link>
        <Link to="/media" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <MediaIcon />
            </ListItemIcon>
            <ListItemText primary="Media" />
          </ListItem>
        </Link>
        <Link to="/top-category" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <TopCategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Top category" />
          </ListItem>
        </Link>
        <Link to="/reviews" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <ReviewsIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItem>
        </Link>
        <Link to="/orders" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <OrderIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Link to="/blog" >
          <ListItem className="hover:bg-gray-600 rounded-lg">
            <ListItemIcon>
              <BlogIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
