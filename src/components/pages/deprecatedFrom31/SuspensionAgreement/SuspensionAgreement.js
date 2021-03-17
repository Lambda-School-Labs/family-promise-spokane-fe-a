/*
Signatures for Suspension Agreement
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker } from 'antd';

const SuspensionAgreement = ({
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

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Suspension Agreement" bordered={false}>
        <IntakeButton navigation={navigation} />
        <p>
          <strong>
            In order to create a safe and comfortable environment for children,
            families, staff and volunteers, Open Doors holds the following
            expectations of every person using the shelter:
          </strong>
        </p>
        <Form>
          <Form.Item>
            I, <Input className="printName" placeholder="First & Last Name" />
            understand that If I:
            <ul>
              <li>
                Spank, hit, or aggressively handle my child. i.e. throw, push or
                pull my child etc,
              </li>
              <li>
                Yell at my child, other children or another adult in a
                threatening or aggressive manner,
              </li>
              <li>
                Use profanity (cursing) directed at my child, other children,
                guest, staff, volunteer, or intern,
              </li>
              <li>
                Conduct myself in a manner that creates an environment that
                infringes on the safety, well-being or peace of mind of any
                guest, staff member or volunteer
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            <p>
              <strong>
                I will be asked to leave Open Doors property until 7:00 pm
                check-in the following night, or until I have met with the
                Program Manager (depending on severity). If a staff member or
                volunteer feels that there is ANY question of abuse or neglect
                of your child they will error on the side of caution and make a
                report to CPS.
              </strong>
            </p>
          </Form.Item>

          <Form.Item>
            <strong>Further, I understand: </strong>
            <ul>
              <li>This might result in losing my spot at the night shelter</li>
              <li>I may not have another family or staff member sign me in</li>
              <li>It is not my responsibility to tell on other guests</li>
              <li>Hear-say information will not be given credibility</li>
              <li>All incidents must be witnessed by supervisor on shift</li>
              <li>All incidents will be evaluated by supervisor on shift</li>
              <li>
                I will not be suspended as a result of my child breaking these
                guidelines
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
          <p>
            <strong>
              *** Please be aware that ALL shelter staff are mandatory
              reporters, therefore any behavior toward your child that a staff
              member is concerned about will result in a report to CPS. ***
            </strong>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default SuspensionAgreement;
