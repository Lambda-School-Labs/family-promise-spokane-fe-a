/*
Signatures for Animal Agreement
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker, Checkbox } from 'antd';
// import { Checkbox } from '@material-ui/core';

const AnimalNo = ({
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
      <Card title="Open Doors Family Shelter Animal Agreement" bordered={false}>
        <IntakeButton navigation={navigation} />
        <Form>
          <Form.Item>
            <strong>
              **Open Doors allows up to <u>two</u> pets per family in the
              shelter. Pets that are allowed are limited to <u>CATS AND DOGS</u>{' '}
              at this time as our shelter does not have accommodations set up
              for other types of animals. No new animals may be brought in after
              the initial intake.***
            </strong>
          </Form.Item>
          Is your family bringing an animal with you into the shelter at the
          time of your intake?
          <Form.Item>
            <Checkbox name="Yes" valuePropName="checked">
              Yes
            </Checkbox>
            <strong>
              <u>If so</u>, please fill out the agreement on the next page and
              sign.
            </strong>
          </Form.Item>
          <Form.Item>
            <Checkbox name="No" valuePropName="checked">
              No
            </Checkbox>
            <strong>
              <u>If NOT</u>, please sign below to indicate that you understand
              you will not be allowed to bring an animal in the shelter after
              this point.
            </strong>
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

export default AnimalNo;
