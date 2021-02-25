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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useSelector, useDispatch } from 'react-redux';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import axios from 'axios';
// utils
import { tableIcons } from '../../../utils/tableIcons';
import { findLastIndex } from 'underscore';
import { getDailyReservationLogs } from '../../../state/actions/index';

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
  hr: {
    border: '.5px solid lightgrey',
  },
  formControl: {
    minWidth: 150,
    height: 15,
  },
  container1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '1rem 0',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    //border: '1px solid red',
  },
  monthlyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '1rem 0',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    //border: '1px solid red',
  },
  monthly: {
    display: 'flex',
    justifyContent: 'space-between',
    //border: '1px solid red',
    padding: 0,
  },
  container2: {
    //border: '1px solid red',
    margin: '1rem 0',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  // container3: {
  //   border: '1px solid red',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   margin: '1rem 0',
  // },
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
  const [totalBedsReserved, setTotalBedsReserved] = useState(0);
  const [monthlyData, setMonthlyData] = useState({});
  const [rangeValue, setRangeValue] = useState(90);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.CURRENT_USER);
  const date = new Date();
  const fullDate = date.toDateString();
  const globalCount = useSelector(state => state.TOTAL_BEDS);
  const globalLogs = useSelector(state => state.RESERVATION_LOGS);

  useEffect(() => {
    dispatch(getDailyReservationLogs());
  }, []);

  useEffect(() => {
    const filteredLogs = globalLogs.filter(item => {
      if (fullDate === item.date && item.reservation_status === true) {
        return item;
      }
    });
    console.log('filtered data', filteredLogs);
    setLogs(filteredLogs);
    let total = 0;
    filteredLogs.forEach(item => {
      total = total + item.beds_reserved;
    });
    setTotalBedsReserved(total);
  }, [globalLogs]);
  // axiosWithAuth()
  //   .get(`/logs`)
  //   .then(res => {
  //     const filteredLogs = res.data.filter(item => {
  //       if (fullDate === item.date && item.reservation_status === true) {
  //         return item;
  //       }
  //     });
  //     console.log('filtered data', filteredLogs);
  //     setLogs(filteredLogs);
  //     let total = 0;
  //     filteredLogs.forEach(item => {
  //       total = total + item.beds_reserved
  //     });
  //     setTotalBedsReserved(total);
  //   });

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

  //----Call to DS API for Monthly Stats -----//

  const changeRange = e => {
    e.preventDefault();
    setRangeValue(e.target.value);
    console.log('range value', rangeValue);
  };

  // useEffect(() => {
  //   axios()
  //   .get(`urladdress/${rangeValue}`)
  //   .then(res => {
  //     console.log('monthly object', res.data)
  //     setMonthlyData(res.data)
  //   })
  //   .catch(err => {console.log(err)})

  // }, [rangeButton]);

  return (
    <>
      <Container className={classes.bigContainer}>
        <Container className={classes.heading}>
          <h1>Dashboard</h1>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <h2>Daily Shelter Stats</h2>
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
              <Typography className={classes.number}>
                {totalBedsReserved}
              </Typography>
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
              <Typography className={classes.number}>3</Typography>
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
              <Typography className={classes.number}>{globalCount}</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <Container className={classes.monthly}>
            <h2>Monthly Stats</h2>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Range
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rangeValue}
                onChange={changeRange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={90}>90 days</MenuItem>
                <MenuItem value={365}>365 days</MenuItem>
              </Select>
            </FormControl>
          </Container>
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
          <hr className={classes.hr}></hr>
          <h2>Daily Guest Logs</h2>
        </Container>
        <Container className={classes.container2}>
          <SupervisorGuestLogs />
        </Container>
        <Container>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Logs
              </Typography>
              <button
                onClick={e => {
                  fetchLogs(e);
                }}
              >
                Fetch Logs
              </button>
              {card
                ? logs.map(log => (
                    <Card key={log.id}>
                      <CardContent>
                        <p> Checked in: {log.checked_in ? 'Yes' : 'No'}</p>
                        <p>Date: {log.date}</p>
                        <p>Family Id: {log.family_id}</p>
                        <p> On-Site: {log.on_sight ? 'Yes' : 'No'}</p>
                        <p>Supervisor Id: {log.supervisor_id}</p>
                        <p> Time: {log.time}</p>
                        <p>Beds Reserved: {log.beds_reserved}</p>
                        <p>
                          Reservation Status:{' '}
                          {log.reservation_status ? 'Yes' : 'No'}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                : ''}
              {/* <Typography>22</Typography> */}
            </CardContent>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default Analytics;
