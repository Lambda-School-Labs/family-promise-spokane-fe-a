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
import { red } from 'kleur';

const useStyles = makeStyles({
  bigContainer: {
    marginLeft: '100px',
    width: '90%',
    opacity: 0.87,
  },
  heading: {
    marginTop: '2rem',
  },
  hr: {
    border: '1px solid grey',
    opacity: '8%',
  },
  formControl: {
    minWidth: 150,
    height: 15,
  },
  container1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1rem',
    paddingBottom: '1rem',
  },
  monthlyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1rem',
    paddingBottom: '1rem',
  },
  monthly: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 0,
  },
  container2: {
    margin: '1rem 0',
    paddingBottom: '1rem',
  },
  root: {
    width: '32%',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },

  exitStats: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    opacity: 0.67,
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

  const [monthlyExit, setMonthlyExit] = useState({});
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [monthlyStay, setMonthlyStay] = useState();
  const [guestsCheckedInCount, setGuestsCheckedInCount] = useState(0);

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
    let filteredLogs = [];
    if (globalLogs !== []) {
      filteredLogs = globalLogs.filter(
        member =>
          member.reservation_status === true &&
          member.check_in[0].reservation_status === true
      );
    }
    setTotalBedsReserved(filteredLogs.length);
    setLogs(globalLogs);
    let guestCount = 0;
    filteredLogs.forEach(log => {
      // sets the number of guests checked in by checking check_in status of each member
      if (log.check_in) {
        if (log.check_in[0].on_site_10pm) {
          guestCount += 1;
        }
      }
    });
    setGuestsCheckedInCount(guestCount);
  }, [globalLogs]);

  const fetchLogs = e => {
    e.preventDefault();
    setCard(!card);
  };

  //----Call to DS API for Monthly Stats -----//

  const changeRange = e => {
    e.preventDefault();
    setRangeValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://fam-promise-ds-teamb.eba-sj7vxixq.us-east-1.elasticbeanstalk.com/exits/${rangeValue}`
      )
      .then(res => {
        console.log('***********MONTHLY EXITS************', res.data);
        setMonthlyExit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(
        `http://fam-promise-ds-teamb.eba-sj7vxixq.us-east-1.elasticbeanstalk.com/average_stay/${rangeValue}`
      )
      .then(res => {
        console.log('***********MONTHLY STAY************', res.data);
        setMonthlyIncome(Math.round(res.data['Average Stay']));
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`https://b-ds.familypromisesofspokane.dev/income/${rangeValue}`)
      .then(res => {
        console.log('**********MONTHLY INCOME************', res.data);
        setMonthlyStay(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [rangeValue]);

  return (
    <>
      <Container className={classes.bigContainer}>
        <Container className={classes.heading}>
          <h1>Dashboard</h1>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <h2 className={classes.h2}>Daily Shelter Stats</h2>
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
              <Typography className={classes.number}>
                {guestsCheckedInCount}
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
                Beds Available
              </Typography>
              <Typography className={classes.number}>{globalCount}</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <Container className={classes.monthly}>
            <h2 className={classes.h2}>Monthly Stats</h2>
            <FormControl className={classes.formControl}>
              <Select
                value={rangeValue}
                onChange={changeRange}
                label="Range"
                displayEmpty
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
            <CardContent className={classes.guestExit}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guests Exit To
              </Typography>
              <Typography className={classes.exitStats}>
                <div className="exitCategory">Permanent</div>
                <div className="exitNum">{monthlyExit['Permanent Exits']}</div>
              </Typography>
              <Typography className={classes.exitStats}>
                <div className="exitCategory">Temporary</div>
                <div className="exitNum">
                  {monthlyExit['Temporary Exits'] +
                    monthlyExit['Emergency Shelter']}
                </div>
              </Typography>
              <Typography className={classes.exitStats}>
                <div className="exitCategory">Transitional</div>
                <div className="exitNum">
                  {monthlyExit['Transitional Homes'] +
                    monthlyExit['Unknown/Other']}
                </div>
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
                Increased Family Income
              </Typography>
              <Typography className={classes.number}>
                {monthlyIncome}
              </Typography>
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
              <Typography className={classes.number}>{monthlyStay}</Typography>
              <Typography>Days</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <h2 className={classes.h2}>Daily Guest Logs</h2>
        </Container>
        <Container className={classes.container2}>
          <SupervisorGuestLogs
            setGuestsCheckedInCount={setGuestsCheckedInCount}
            guestsCheckedInCount={guestsCheckedInCount}
          />
        </Container>
        {/* Used for development purposes, this will display all global logs from the redux store*/}
        {/* <Container>
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
            </CardContent>
          </Card>
        </Container> */}
      </Container>
    </>
  );
};

export default Analytics;
