/*
Signatures for Personal Belongings Agreement
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakePacketContent/IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker } from 'antd';

const Belongings = ({
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

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Open Doors Personal Belongings Agreement" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form>
          <Form.Item>
            <strong>
              It is our desire at Open Doors to provide you with a safe place
              for you, your children and your belongings while you are
              experiencing homelessness and staying in our shelter - We want you
              to have a place to store the belongings you will need day-to-day
              that is safe and clean!
            </strong>
          </Form.Item>

          <Form.Item>
            In order to accomplish this, it is necessary to have policies in
            place regarding personal belongings. We <u>never</u> want to get rid
            of someone’s personal things and this happens only as a last resort
            at our shelter.
          </Form.Item>

          <Form.Item>
            I <Input className="printName" placeholder="First & Last Name" />,
            an Open Doors Guest, agree to the following terms and conditions for
            storing and caring for my personal and family belongings.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" /> I understand
            that Open Doors is not liable for any items lost, damaged or stolen
            during my stay at Open Doors and I understand the importance of
            limiting items I bring with me to the shelter as well as keeping
            valuable personal items such as purses and phones with me at all
            times.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" /> I understand
            that if I bring valuable items to the shelter with me that there is
            a possibility of my items being lost, stolen or damaged and Open
            Doors is NOT responsible for replacing them.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" /> I understand
            that I am responsible for keeping my things cleaned up and stored
            properly within the shelter. I will keep all of my clothing in bags
            and stored in designated areas.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" /> I understand
            that belongings left unattended in Day or Night Shelter will be
            donated or disposed of after 24 hours.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" /> I understand
            that if I am caught stealing another guests personal belongings I
            will have to speak with the Open Doors director and may be
            terminated from the program. Please respect your fellow guests.
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

export default Belongings;
