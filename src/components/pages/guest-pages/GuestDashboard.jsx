import React, { useEffect, useState } from 'react';
import OffHours from './OffHours';
import CurrentReservation from './CurrentReservation';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

// UI
import { Divider, Button, Checkbox, Typography } from 'antd';
import '../../../styles/app.scss';

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector } from 'react-redux';

const GuestDashboard = ({ fetchHousehold, fetchFamily, fetchMembers }) => {
  // The current user
  const user = useSelector(state => state.CURRENT_USER);

  //UserState
  const [users, setUsers] = useState([]);
  // console.log("users", users);
  //Mock beds counter
  const [count, setCount] = useState();
  useEffect(() => {
    axiosWithAuth()
      .get('/beds')
      .then(res => {
        console.log('Beds', res.data[0].total_beds);
        setCount(res.data[0].total_beds);
      });
  }, []);

  const { Text } = Typography;

  // For Members Staying
  const [membersStaying, setMembersStaying] = useState([]);

  // For Waitlist
  const [waitList, setWaitList] = useState([]);

  //logs user state of reservation status
  const [isReserved, setIsReserved] = useState(false);
  const [familyID, setFamilyID] = useState(null);

  //Sets state for members staying and waitlist members
  useEffect(() => {
    axiosWithAuth()
      //This can persist if you useParams to pull in the id of the api and change the hard coded 7 to ${id}
      .get(`/logs/${resID}`)
      .then(res => {
        console.log('Logs', res.data);
        if (res.data[0]) {
          setFamilyID(res.data[0].family_id);
          setMembersStaying(res.data[0].members_staying);
          setWaitList(res.data.waitlist);
        }
      });
  }, []);

  //1> Create another useEffect that will make an axios call to the logs endpoint using the family ID (wait, that doesn't make sense because we will need to go through the family id. So )
  // console.log("FAMILYID", familyID);
  useEffect(() => {
    if (familyID) {
      axiosWithAuth()
        .get(`/families/${familyID}/logs`)
        .then(res => console.log('families/logs', res))
        .catch(err => console.log(err));
    }
  }, [familyID]);

  // console.log('Is Reserved', isReserved);
  //************THIS COULD BE A FUNCTION BECAUSE IT IS BEING USED TWICE:******************
  // This will target the checked members and add or take them away from the holding array or state of the membersStaying list. It will also update the state of the count for total beds.
  const familyStaying = e => {
    if (e.target.checked === true) {
      if (count > 0) {
        setCount(count - 1);
      }

      if (membersStaying.indexOf(e.target.value) === -1)
        setMembersStaying([...membersStaying, e.target.value]);
      console.log('membersStaying', membersStaying);
    } else if (e.target.checked === false) {
      setCount(count + 1);

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
          console.log('dub ax out', res.data[0].family_id);
          axiosWithAuth()
            .get(`logs/${res.data[0].family_id}`)
            .then(res => console.log(res.data[0].reservation_status))
            .catch(err => console.log(err));
        })
        .catch(err => console.log('get family error'));
    } catch (error) {
      //alert('error');
    }
  };

  //Warning shows for this but it is needed in order to render the checkboxes
  useEffect(() => {
    fetchFamilyInformation().then(res => console.log(res));
  }, [count]);

  let userId = users.map(user => {
    return user.family_id;
  });

  //Reserve button - Will post to the logs endpoint with the membersStaying , will set isReserved to true, will return the reservation ID for put requeset, Confirm that the user has made a reservation.
  const reserveButton = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/logs', {
        supervisor_id: '00u2lh0bsAliwLEe75d6',
        family_id: 1,
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
        console.log('res data', res.data);
        setResID(resId);
        setIsReserved(res.data.logs.reservation_status);

        axiosWithAuth().put('/beds', {
          total_beds: count,
        });

        return (
          <div>
            <p>
              Congratulations, you have reserved {membersStaying.length} amount
              of beds at 904 E Hartson Ave, Spokane, WA 99202 for MM/DD/YYY.
              Please be sure to have at least ONED ADULT available at the
              shelter before 7pm to check in with the supervisor.
            </p>
            <p>
              If you do not show ip with your total amont of family members,
              those beds will be reserved for other guests.
            </p>
          </div>
        );
      })
      .catch(err => {
        console.log('Nope', err);
      });
  };

  // the cancel button
  const [resID, setResID] = useState(0); // This is set in the post request to retrieve the reservation ID which is needed in order to edit the reservation.

  const cancelButton = (e, resId) => {
    console.log('before put inside cancel function', resID);
    e.preventDefault();

    axiosWithAuth().put('/beds', {
      total_beds: count + membersStaying.length,
    });

    membersStaying.length = 0;

    setCount(count);

    axiosWithAuth()
      .put(`/logs/${resID}`, {
        supervisor_id: '00u2lh0bsAliwLEe75d6',
        family_id: 1,
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
        There are currently <span className="number-of-beds">{count}</span> beds
        remaining at the shelter
      </h2>

      <Divider />

      {/* When the user logs back in or when the user makes a reservation, they will need to have their session stored locally so they can see that they have already made a reservation and can cancel. */}

      {isReserved === true ? (
        <>
          <CurrentReservation
            membersStaying={membersStaying}
            cancelButton={cancelButton}
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
