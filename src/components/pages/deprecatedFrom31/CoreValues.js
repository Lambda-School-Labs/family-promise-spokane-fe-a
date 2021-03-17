/*
Signatures for Core Values
possibly want to add a second signature box for adult number two. later iteration
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker } from 'antd';

const CoreValues = ({
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
      <Card title="Family Promise Core Values" bordered={false}>
        <IntakeButton navigation={navigation} />
        <Form>
          <Form.Item>
            {' '}
            At Family Promise we are guided by a set of core values that inform
            each aspect of what we do. All of our staff, volunteers, and guests
            are asked to think about and use these values to guide your
            interactions with staff, volunteers and guests.
            <li>
              <strong>
                All adults, must read and initial that you understand Family
                Promise’s Core Values.
              </strong>
            </li>
          </Form.Item>

          <Form.Item>
            I agree that in all of my interactions with Family Promise I will
            try to:
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" />
            <strong>
              <u>Be Non-Judgmental:</u>
            </strong>
            <li>“We all have issues, so let’s cut others some slack.”</li>
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" />
            <strong>
              <u>Be Respectful/ Compassionate:</u>
            </strong>
            <li>“People deserve our respect and concern.”</li>
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" />
            <strong>
              <u>Be Present:</u>
            </strong>
            <li>
              “The person in front of you is the most important at that moment”
            </li>
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" />
            <strong>
              <u>Be Competent:</u>
            </strong>
            <li>
              “Be excellent and if we don’t know something find the answer”
            </li>
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" />
            <strong>
              <u>Be Empowered:</u>
            </strong>
            <li>
              “You can do it and you can help others know they can do it.”
            </li>
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="initials" />
            <strong>
              <u>Be a Great Neighbor:</u>
            </strong>
            <li>“You are what others know of us.”</li>
          </Form.Item>

          <Form.Item>
            We exist in a community with other organizations, businesses and
            homes. Some of whom did not want a homeless shelter in their
            community because they thought it would detract from the community.
            We acknowledge this and want to change their minds. So we strive to
            be great neighbors and improve the community we are in. We pick up
            trash, clean up the outside of the building, and to take care of the
            space we have been provided. We don’t yell, curse, or disturb our
            neighbors. We want the neighbors and community to never want us to
            leave.
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

export default CoreValues;
