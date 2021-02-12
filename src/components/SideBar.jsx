import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  InfoCircleFilled,
  HomeOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import BarChartOutlined from '@ant-design/icons/BarChartOutlined';
import MonitorOutlined from '@ant-design/icons/MonitorOutlined';
import PieChartOutlinedIcon from '@material-ui/icons/PieChartOutlined';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const SideBar = () => {
  const user = useSelector(state => state.CURRENT_USER);
  const history = useHistory();
  const [collapsed, setCollapsed] = React.useState(true);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  // const redirectToUserProfile = () => {
  //   history.push('/me');
  // };

  const redirectToAnalytics = () => {
    history.push('/analytics');
  };

  const redirectToIntake = () => {
    history.push('/intake');
  };

  const redirectToGuests = () => {
    history.push('/guests');
  };

  // const redirectToFamily = () => {
  //   history.push('/family');
  // };

  const redirectToMembers = () => {
    history.push('/members');
  };

  const redirectToCaseManagerAnalytics = () => {
    history.push('/caseAnalytics');
  };

  const redirectToCheckIn = () => {
    history.push('/supervisor-checkin');
  };

  const redirectToShelterInfo = () => {
    history.push('/shelterInfo');
  };

  const redirectToDashboard = () => {
    history.push('/guest-dashboard');
  };

  return (
    <div>
      {user.role && (
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          id="sider"
        >
          <div className="logo" />

          <Menu theme="light" mode="inline">
            <br />
            <Menu.Item
              onClick={redirectToAnalytics}
              key="2"
              icon={<BarChartOutlined />}
            >
              Analytics
            </Menu.Item>
            {(user.role === 'guest' || user.role === 'pending') && (
              <Menu>
                <Menu.Item
                  onClick={redirectToMembers}
                  key="3"
                  icon={<TeamOutlined />}
                >
                  Members
                </Menu.Item>
                <Menu.Item
                  onClick={redirectToShelterInfo}
                  key="4"
                  icon={<InfoCircleOutlined />}
                >
                  Shelter Info
                </Menu.Item>
                <Menu.Item
                  onClick={redirectToDashboard}
                  key="5"
                  icon={<HomeOutlined />}
                >
                  Dashboard
                </Menu.Item>
              </Menu>
            )}

            {['supervisor', 'executive_director', 'case_manager'].includes(
              user.role
            ) && (
              <Menu>
                <Menu.Item
                  onClick={redirectToGuests}
                  key="3"
                  icon={<MonitorOutlined />}
                >
                  Guests
                </Menu.Item>
                <Menu.Item
                  onClick={redirectToIntake}
                  key="4"
                  icon={<FileOutlined />}
                >
                  Register Family
                </Menu.Item>
                {user.role === 'case_manager' && (
                  <Menu.Item
                    onClick={redirectToCaseManagerAnalytics}
                    key="5"
                    icon={<PieChartOutlinedIcon />}
                  >
                    Case Manager Analytics
                  </Menu.Item>
                )}
              </Menu>
            )}

            {user.role === 'supervisor' && (
              <Menu>
                <Menu.Item
                  onClick={redirectToCheckIn}
                  key="5"
                  icon={<TeamOutlined />}
                >
                  Check-in Guests
                </Menu.Item>
              </Menu>
            )}
          </Menu>
        </Sider>
      )}
    </div>
  );
};

export default SideBar;
