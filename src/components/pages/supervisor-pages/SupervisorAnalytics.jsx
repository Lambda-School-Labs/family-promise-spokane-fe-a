import React, { useState, useEffect } from 'react';
import Guests from '../Guests/Guests';
import SupervisorCheckIn from './SupervisorCheckIn';
import SupervisorGuestLogs from './SupervisorGuestLogs';
// UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Circle from 'react-circle';
import { useSelector } from 'react-redux';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

// utils
import { tableIcons } from '../../../utils/tableIcons';
import { findLastIndex } from 'underscore';

const useStyles = makeStyles({
  bigContainer: {
    //border: '1px solid red',
    marginLeft: '100px',
    width: '90%',
    //display: 'flex',
  },
  heading: {
    marginTop: '2rem',
  },
  container1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '1rem 0',
    //border: '1px solid red',
  },
  monthlyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '1rem 0',
    //border: '1px solid red',
  },
  container2: {
    //border: '1px solid red',
    margin: '1rem 0',
  },
  container3: {
    border: '1px solid red',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem 0',
  },
  root: {
    width: '32%',
    textAlign: 'center',
    //border: '1px solid blue',
  },
  title: {
    fontSize: 18,
  },
  number: {
    fontSize: 36,
  },
  pos: {
    marginBottom: 12,
  },
});

const columns = [
  { title: 'name', field: 'first_name' },
  { title: 'surname', field: 'last_name' },
  { title: 'email', field: 'email' },
  { title: '', field: 'clocked_in', type: 'boolean' },
];
const rows = [
  { name: 'Snow', surname: 'Jon', age: 35 },
  { name: 'Lannister', surname: 'Cersei', age: 42 },
  { name: 'Lannister', surname: 'Jaime', age: 45 },
  { name: 'Stark', surname: 'Arya', age: 16 },
  { name: 'Targaryen', surname: 'Daenerys', age: null },
  { name: 'Melisandre', surname: null, age: 150 },
  { name: 'Clifford', surname: 'Ferrara', age: 44 },
  { name: 'Frances', surname: 'Rossini', age: 36 },
  { name: 'Roxie', surname: 'Harvey', age: 65 },
];

const Analytics = () => {
  const [logs, setLogs] = useState([]);
  const [card, setCard] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const classes = useStyles();
  const user = useSelector(state => state.CURRENT_USER);

  useEffect(() => {
    const interval = setInterval(() => {
      axiosWithAuth()
        .get(`/logs`)
        .then(res => console.log(setLogs(res.data)));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const fetchLogs = e => {
    e.preventDefault();
    setCard(!card);
  };

  return (
    <>
      <Container className={classes.bigContainer}>
        <Container className={classes.heading}>
          <h1>Welcome, Executive Director!</h1>
        </Container>
        <Container>
          <h2>Daily Shelter Stats</h2>
          <hr></hr>
        </Container>
        <Container className={classes.container1}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Beds Reserved
              </Typography>
              <Typography className={classes.number}>20</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guests Checked In
              </Typography>
              <Typography className={classes.number}>12</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Beds Available
              </Typography>
              <Typography className={classes.number}>70</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <h2>Monthly Stats</h2>
          <hr></hr>
        </Container>
        <Container className={classes.monthlyContainer}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guests Exit To
              </Typography>
              <Typography>Permanent: 37%</Typography>
              <Typography>Temporary: 17%</Typography>
              <Typography>Transitional: 24%</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Increased Family Income
              </Typography>
              <Typography className={classes.number}>60</Typography>
              <Typography>Families</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guest Average Stay
              </Typography>
              <Typography className={classes.number}>37</Typography>
              <Typography>Days</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <h2>Daily Guest Logs</h2>
          <hr></hr>
        </Container>
        <Container className={classes.container2}>
          <SupervisorGuestLogs />
        </Container>
      </Container>
    </>
  );
};

export default Analytics;
