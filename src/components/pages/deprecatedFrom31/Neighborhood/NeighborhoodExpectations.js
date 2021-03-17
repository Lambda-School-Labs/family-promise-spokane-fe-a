/*
Requires Signatures from Neighborhood Agreement and Expectations
*/

import React from 'react';
import { useHistory } from 'react-router-dom';
//Previous/Next buttons
//import IntakeButton from '../../IntakeButtons';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Button, Input, Card, Progress, DatePicker } from 'antd';

const NeighborhoodExpectations = ({
  navigation,
  tempFormStyle,
  steps,
  formData,
  step,
}) => {
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  const { familyInfo, familyMember } = formData;
  const history = useHistory();
  //useForm resolves before template literals. This function fixes that.
  const familyInfoNameString = (section, value) => {
    return `familyInfo.${section}.${value}`;
  };

  //POSTS family info then posts each member with familyId
  const submitHandlder = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/families`, familyInfo)
      .then(res => {
        const familyId = res.data.families.id;
        Object.keys(formData.familyMember).map(mem => {
          familyMember[mem]['family_id'] = familyId;
          axiosWithAuth()
            .post('/members', familyMember[mem])
            .then(res => {
              history.push(`/familyprofile/${familyId}`);
            })
            .catch(err => {
              console.log('MemberError', err.response);
            });
        });
      })
      .catch(err => console.log('FamiliesError', err));
  };

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. 
  Unable make keys dynamic in spread (currently not DRY code)
  You must create a new function for each input feild or make keys dynamic.
  */

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card
        title="Notice of Neighborhood Agreement and Expectations Requirement (continued)"
        bordered={false}
      >
        {/* <IntakeButton navigation={navigation} /> */}
        {/* Not using intakeButtons component because of submitHandler*/}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={navigation.previous}
            style={{ width: '100px' }}
          >
            Previous
          </Button>

          <Button
            type="primary"
            style={{
              backgroundColor: 'green',
              border: '1px solid green',
              width: '100px',
            }}
            htmlType="Submit"
            onClick={submitHandlder}
          >
            Submit
          </Button>
        </div>

        <strong>
          <u>Neighborhood Expectations:</u>
        </strong>
        <Form>
          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I will clean
            up after myself, my children, and my pets while I am on Family
            Promise property, AS WELL AS, when I am walking around the
            neighborhood, at the bus-stop, on the sidewalks, streets or near a
            neighbor’s home.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I will be
            considerate of the properties belonging to neighbors.{' '}
            <u>This includes:</u> Not yelling or swearing at my children or at
            others while outdoors near neighboring homes, not leaving trash or
            cigarette butts on the sidewalks, streets, in yards or in parking
            lots, not playing loud music outdoors near neighboring homes.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I will not
            stand, sit or walk through the properties of neighbors.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I will not
            smoke marijuanna, drink alcoholic beverages, or use any illegal
            substance on Family Promise properties or within the neighborhood
            where Family Promise of Spokane is located. This includes all
            sidewalks, driveways, or yards near the properties of Family
            Promise, even if the neighbor invites or gives permission for you to
            be there.
          </Form.Item>

          <p>
            <strong>
              **(2002 E Mission’s neighborhood is the Chief Garry Neighborhood
              and it spans from: Trent Avenue North to the Spokane River and
              Greene/Market Street West to the Spokane River)**
            </strong>
          </p>
          <p>
            <strong>
              **(904 E Hartson’s neighborhood is the South Perry District: It
              spans from I-90 South to Southeast Blvd and Sherman East to
              Altamont St. and Crestline St.)**
            </strong>
          </p>

          <strong>
            <u>Agreement and Understanding</u>
          </strong>

          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I understand
            that if I do not follow the above expectations, I may be asked to
            leave a Family Promise shelter temporarily or permanently.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I understand
            that if a neighbor of a Family Promise shelter complains about my
            behavior on or near their property, I may be asked to leave the
            shelter temporarily or permanently.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="Initials" /> I understand
            that if a neighbor sees me using drugs or drinking alcohol while my
            children are with me, they may call law enforcement and/or CPS.
          </Form.Item>

          <Form.Item>
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            CLIENT SIGNATURE(adult)
            <DatePicker />
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            CLIENT SIGNATURE(adult)
            <DatePicker />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NeighborhoodExpectations;
