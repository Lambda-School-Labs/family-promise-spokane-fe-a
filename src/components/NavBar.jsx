import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useOktaAuth } from '@okta/okta-react';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const NavBar = () => {
  const history = useHistory();
  const [idRoute, setIdRoute] = useState(null);
  const { authState, authService } = useOktaAuth();

  const redirectToLogin = () => {
    history.push('/login');
  };

  const redirectToHome = () => {
    if (authState.isAuthenticated) {
      history.push('/');
    } else {
      return;
    }
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.clear();
  };

  const goToProfile = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push(`/familyprofile/${idRoute}`);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={goToProfile}>Profile</Menu.Item>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="navbar-icon">
        <img src={logo} alt="" onClick={redirectToHome} />
      </div>

      {authState.isAuthenticated ? (
        <div className="navbar-actions">
          <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      ) : (
        <div className="navbar-actions" onClick={redirectToLogin} />
      )}
    </div>
  );
};

export default NavBar;
