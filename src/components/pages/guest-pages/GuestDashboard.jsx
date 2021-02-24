import React, { useEffect, useState } from 'react';
import OffHours from './OffHours';
import CurrentReservation from './CurrentReservation';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

import { getLatestLog, updateBedCount } from '../../../state/actions/index';

// UI
import { Divider, Button, Checkbox, Typography } from 'antd';
import '../../../styles/app.scss';

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector, useDispatch } from 'react-redux';

const GuestDashboard = ({ fetchHousehold, fetchFamily, fetchMembers }) => {
  const dispatch = useDispatch();
  // The current user
  const user = useSelector(state => state.CURRENT_USER);
  const log = useSelector(state => state.LATEST_LOG);
  const globalCount = useSelector(state => state.TOTAL_BEDS);
  const fam = useSelector(state => state.FAMILY);
  const household = useSelector(state => state.HOUSEHOLD);
  const [checkLogs, setCheckLogs] = useState(true);
  //UserState
  const [users, setUsers] = useState([]);
  // console.log("users", users);
  //Mock beds counter
  const [count, setCount] = useState();
  // useEffect(() => {
  //   axiosWithAuth()
  //     .get('/beds')
  //     .then(res => {
  //       console.log('Beds', res.data[0].total_beds);
  //       setCount(res.data[0].total_beds);
  //     });
  // }, []);

  useEffect(() => {
    dispatch(getLatestLog(household[0].family_id));
  }, []);

  useEffect(() => {
    //const myLog =  await
    //console.log('myLog', myLog);

    if (log.date === fullDate && log.reservation_status === true) {
      console.log('THIS IS THE RES STATUS');
      setIsReserved(true);
      setResID(log.reservation_id);
    }
  }, [log]);

  const { Text } = Typography;

  // For Members Staying
  const [membersStaying, setMembersStaying] = useState([]);

  // For Waitlist
  const [waitList, setWaitList] = useState([]);

  //logs user state of reservation status
  const [isReserved, setIsReserved] = useState(false);
  const [familyID, setFamilyID] = useState(null);
  const [localBedCount, setLocalBedCount] = useState(0);
  // console.log('Is Reserved', isReserved);
  //************THIS COULD BE A FUNCTION BECAUSE IT IS BEING USED TWICE:******************
  // This will target the checked members and add or take them away from the holding array or state of the membersStaying list. It will also update the state of the count for total beds.
  const familyStaying = e => {
    console.log(membersStaying.indexOf(e.target.value));
    if (e.target.checked === true) {
      if (count > 0) {
        setCount(count - 1);
      }

      if (membersStaying.indexOf(e.target.value) === -1)
        setMembersStaying([...membersStaying, e.target.value]);
      console.log('membersStaying', membersStaying);
    } else if (e.target.checked === false) {
      setCount(count + 1);
      //taking member out if canceling
      let temp = membersStaying;
      temp = temp.filter(item => {
        if (item !== e.target.value) return item;
        else return;
      });
      setMembersStaying(temp);
    }
  };

  // This will target the checked members and add or take them away from the holding array or state of the waitlist.
  const waitListMembers = e => {
    if (e.target.checked === true) {
      if (waitList.indexOf(e.target.value) === -1);
      setWaitList([...waitList, e.target.value]);
      console.log('waitlist', waitList);
    } else if (e.target.checked === false) {
      let temp = waitList;
      temp = temp.filter(item => {
        if (item !== e.target.value) return item;
        else return;
      });
      setWaitList(temp);
    }
  };

  //This function is pulling in data from 2 apis. The second api (/families/:id/members) is getting the family information which is holding the state of the users.
  const fetchFamilyInformation = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);

      const family = res.data.family;
      // console.log('fetchFamilyInformation', family);

      axiosWithAuth()
        .get(`/families/${family.id}/members`)
        .then(res => {
          // console.log('families/family.id/members', res.data);
          setUsers(res.data);
          //console.log('dub ax out', res.data[0].family_id);
          axiosWithAuth()
            .get(`logs/${res.data[0].family_id}`)
            .then(res => console.log(res.data[0].reservation_status))
            .catch(err => console.log(err));
        })
        .catch(err => console.log('get family error'));
    } catch (error) {
      //alert('error');
      console.log(error);
    }
  };

  //Warning shows for this but it is needed in order to render the checkboxes *******************
  useEffect(() => {
    fetchFamilyInformation().then(res => console.log(res));
  }, [globalCount]);

  let userId = users.map(user => {
    return user.family_id;
  });

  //Reserve button - Will post to the logs endpoint with the membersStaying , will set isReserved to true, will return the reservation ID for put requeset, Confirm that the user has made a reservation.
  const reserveButton = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/logs', {
        supervisor_id: '00u2lh0bsAliwLEe75d6',
        family_id: fam.id,
        reservation_status: true,
        waitlist: false,
        on_site_7pm: false,
        on_site_10pm: false,
        date: fullDate,
        time: `${hours}:${minutes}`,
        beds_reserved: membersStaying.length,
        actual_beds_reserved: membersStaying.length,
        members_staying: membersStaying,
      })
      .then(res => {
        const resId = res.data.logs.reservation_id;
        console.log('res data', res.data.logs.reservation_status);
        setResID(resId);
        setIsReserved(res.data.logs.reservation_status);
        //setLocalBedCount(res.data.logs.beds_reserved);
        // axiosWithAuth().put('/beds', {
        //   total_beds: count,
        // });
      })
      .catch(err => {
        console.log('Nope', err);
      });
    console.log('local bed count', localBedCount);
    console.log('global bed count', globalCount);
    dispatch(updateBedCount(globalCount - membersStaying.length));
    dispatch(getLatestLog()); //We want to get log by res id ***********
  };

  // the cancel button
  const [resID, setResID] = useState(0); // This is set in the post request to retrieve the reservation ID which is needed in order to edit the reservation.

  const cancelButton = (e, resId) => {
    console.log('before put inside cancel function', resID);
    e.preventDefault();

    // axiosWithAuth().put('/beds', {
    //   total_beds: globalCount + log.beds_reserved,
    // });
    dispatch(updateBedCount(globalCount + log.actual_beds_reserved));

    membersStaying.length = 0;

    setCount(count); //This might be causing a weird bug?????

    axiosWithAuth()
      .put(`/logs/${resID}`, {
        supervisor_id: '00u2lh0bsAliwLEe75d6',
        family_id: fam.id,
        reservation_status: false,
        waitlist: false,
        on_site_7pm: true,
        on_site_10pm: false,
        date: fullDate,
        time: `${hours}:${minutes}`,
        beds_reserved: 1,
        actual_beds_reserved: 0,
        members_staying: membersStaying,
      })
      .then(res => {
        setIsReserved(res.data.logs.reservation_status);
        alert(
          'You have canceled your reservation. If you canceled by mistake you will be able to make a reservation per available beds.'
        );
        window.location.reload();
        // console.log('put res', res.data);
      })
      .catch(err => {
        console.log('Nope', err);
      });

    // setIsReserved(false);
    /*
    1. This button will change the membersStaying array length to 0
    2. Number of beds will be updated
    3. Message will pop ups stating: You have canceled your reservation, if you want to reserve, please refresh this page and make another reservation.
    */
  };

  //For Date and time
  const date = new Date();
  const fullDate = date.toDateString();
  const hours = new Date().getHours();
  const getMinutes = new Date().getMinutes();
  const minutes = (getMinutes < 10 ? '0' : '') + getMinutes;
  // const getTime = fullDate + hours + '-' + minutes;
  // This seconds will not be seen, but this will allow the clock to rerender accordingly.
  const [seconds, setSeconds] = useState();
  let sec = new Date().getSeconds();
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(sec);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  //-----------------------------------------------------------------
  // --------------------------START OF RENDER-----------------------
  //-----------------------------------------------------------------

  return 7 < hours < 21 ? (
    <div className="container">
      <h2>{`Today is ${fullDate} ${hours}:${minutes}`}</h2>

      <h1>Guest dashboard</h1>
      <h1 className="welcome-guest-dashboard">
        Welcome To Family Promise of Spokane
      </h1>
      <h2>
        There are currently{' '}
        <span className="number-of-beds">{globalCount}</span> beds remaining at
        the shelter
      </h2>

      <Divider />

      {/* When the user logs back in or when the user makes a reservation, they will need to have their session stored locally so they can see that they have already made a reservation and can cancel. */}

      {isReserved === true ? (
        <>
          <CurrentReservation
            membersStaying={log.members_staying}
            cancelButton={cancelButton}
            beds={log.beds_reserved}
          />
        </>
      ) : (
        ''
      )}

      {count === 0 && isReserved === false ? (
        //WAITLIST ________________________________
        <>
          <p>To join the waitlist, please click below</p>
          {users.map(member => {
            return (
              <div className="members">
                <Checkbox
                  value={`${member.demographics.first_name} ${member.demographics.last_name}`}
                  onChange={waitListMembers}
                >
                  {member.demographics.first_name}{' '}
                  {member.demographics.last_name}
                </Checkbox>
              </div>
            );
          })}

          <Button shape="round" className="reservation-button">
            Reserve Beds
          </Button>

          <p>
            Message: Please be sure to arrive at the shelter by 7pm. The
            supervisor will announce if there are any more beds available
          </p>
        </>
      ) : (
        //MEMBERS STAYING ___________________________
        <div className={isReserved === true ? 'isReserved' : ''}>
          <Text strong>
            {' '}
            If you would like to reserve {membersStaying.length} beds, please
            click the button below:{' '}
          </Text>

          {users.map(member => {
            return (
              <div>
                <Checkbox
                  value={`${member.demographics.first_name} ${member.demographics.last_name}`}
                  onChange={familyStaying}
                >
                  {member.demographics.first_name}{' '}
                  {member.demographics.last_name}
                </Checkbox>
              </div>
            );
          })}
          <Button className="reserve-button" onClick={reserveButton}>
            Reserve Beds
          </Button>
        </div>
      )}
    </div>
  ) : (
    <OffHours />
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
  fetchBeds: actions.fetchBeds,
  fetchMembers: actions.fetchMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestDashboard);
