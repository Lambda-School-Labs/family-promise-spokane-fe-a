import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import PeopleIcon from '@material-ui/icons/People';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { tableIcons } from '../../../utils/tableIcons';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
// import CardShadow from '../../CardShadow';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from '../../modals/GuestNotes';
// import { CopyrightOutlined } from '@material-ui/icons';
import LoadingComponent from '../../common/LoadingComponent';
import Modal from 'react-modal';
import '../Guests/guest.css';
// import { CardContent, Card } from '@material-ui/core';
import GuestMoreInfo from '../Guests/GuestMoreInfo';
Modal.setAppElement('#root');

const Guests = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
      { title: 'Reservation', field: '0.reservation_status' },
      { title: 'Checked In', field: '0.on_site_7pm' },
    ],
    data: [],
  });
  function toggleModal(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        console.log(res.data);
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            ...member.check_in,
            flag_level: 0,
            ...member,
          };
        });

        copy.data.push(...formattedData);
        console.log(copy);

        setState(copy);
      })
      .catch(err => {
        alert('error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const [result, setResult] = useState(null);
  const history = useHistory();

  if (loading) {
    return (
      <div className="exec-guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {result ? <GuestMoreInfo familyInfo={result} /> : ''}
      </Modal>
      <div className="exec-guest-table-container">
        {isNotesOpen && <GuestNotes setIsNotesOpen={setIsNotesOpen} />}
        {isFlagOpen && (
          <FlagGuest
            setIsFlagOpen={setIsFlagOpen}
            setState={setState}
            guestId={guestId}
          />
        )}
        <div className="exec-guest-table">
          <MaterialTable
            options={{
              exportButton: true,
              rowStyle: rowData => ({
                backgroundColor:
                  rowData.flag_level == 2
                    ? 'rgba(255, 255, 0, 0.419)'
                    : rowData.flag_level == 3
                    ? 'rgba(255, 0, 0, 0.418)'
                    : 'white',
              }),
            }}
            icons={tableIcons}
            title="Guests"
            columns={state.columns}
            data={state.data}
            options={{ actionsColumnIndex: -1 }}
            actions={[
              {
                icon: PeopleOutlinedIcon,
                tooltip: 'Family Members',
                onClick: (event, rowData) => {
                  // Do save operation
                  console.log(rowData);
                  history.push(`/family/${rowData.family_id}`);
                },
              },
              {
                icon: NoteOutlinedIcon,
                tooltip: 'Notes',
                onClick: (event, rowData) => {
                  // Do save operation
                  setIsNotesOpen(true);
                },
              },
              {
                icon: FlagOutlinedIcon,
                tooltip: 'Flag Guest',
                onClick: (event, rowData) => {
                  setIsFlagOpen(true);
                  setGuestId(rowData.id);
                },
              },
              {
                icon: InfoOutlinedIcon,
                tooltip: 'More Info',
                onClick: (event, rowData) => {
                  setResult(state.data[rowData.id - 1]); // BUG HERE -- Not getting correct data -Meg
                  console.log(result);
                  toggleModal(event);
                  // Do save operation
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Guests;
