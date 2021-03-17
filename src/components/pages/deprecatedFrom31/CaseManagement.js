/*
Signatures for Case Management acknowledgement of understand 
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker } from 'antd';

const CaseManagement = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  count,
  setCount,
  nameString,
  steps,
  step,
}) => {
  // //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  // //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  // const { familyMember } = formData;

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card
        title="Open Doors Case Management Acknowledgement of Understanding"
        bordered={false}
      >
        <IntakeButton navigation={navigation} />

        <Form>
          <Form.Item>
            Open Doors case management is a guest driven service. This means you
            are always in the driver's seat for finding stable housing for you
            and your family. It is up to you to start the case management
            process. You are responsible for setting up the 1st in-person
            appointment with the case manager and complete weekly goal plans to
            come up with a 30 day exit to housing plan. The case manager
            encourages you to check in on a weekly basis. This can be done in
            person or over the phone. It is your responsibility to contact the
            case manager for updates and follow ups.
          </Form.Item>

          <Form.Item>
            <strong>Case Management- What it is:</strong>
          </Form.Item>

          <Form.Item>
            <ul>
              <li>
                Will help you and your household navigate the resources offered
                in Spokane.
              </li>
              <li>May be able to advocate on your behalf.</li>
              <li>
                Will help you navigate any concerns that may come up pertaining
                to Open Doors Shelter.
              </li>
              <li>
                Will help you gather documents needed for certain housing
                programs.
              </li>
              <li>
                May help complete a housing assessment so you can apply for
                referrals to other shelter programs.
              </li>
              <li>
                Will help you complete weekly goal plans to gain housing
                stability.
              </li>
              <li>May help pay for 1 rental application fee.</li>
              <li>
                May help with a daily or 2 hour bus pass if they are in stock.
              </li>
              <li>
                May help with funds to travel to other support networks, if
                funds are available.
              </li>
              <li>
                May give extensions to 30 day agreement if you are actively
                working toward
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            CLIENT SIGNATURE (adult)
            <DatePicker />
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            CLIENT SIGNATURE (adult)
            <DatePicker />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CaseManagement;
