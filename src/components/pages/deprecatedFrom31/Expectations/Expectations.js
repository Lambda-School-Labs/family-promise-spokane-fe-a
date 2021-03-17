/*
Requires Signatures from Client for clause in Guest Expectations and Decorum Agreement
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress } from 'antd';

const Expectations = ({
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
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  // const { familyMember } = formData;

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. 

  Unable make keys dynamic in spread (currently not DRY code)
  You must create a new function for each input feild or make keys dynamic.
  */

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Guest Expectations and Decorum Agreement" bordered={false}>
        <IntakeButton navigation={navigation} />

        <h3>I will be expected NOT to: </h3>
        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Be Violent or Aggresive:</u>
          </strong>
          <li>
            I understand that Open Doors staff has the right to ask me to leave
            immediately if I am believed to be a threat to another guest,
            volunteer or staff in any way. I understand that violence or
            aggression of any kind ( physical, verbal or emotional) is NOT
            tolerated.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Have Drugs, Alcohol, or Weapons:</u>
          </strong>
          <li>
            I understand that the use, possession, or sale of drugs or alcohol
            is NOT permitted on the Open Doors premises. I agree that I will not
            bring weapons of any kind on the Open Doors premises.
            <strong>
              {' '}
              ** If there is a valid suspicion of drug use or possession on the
              shelter property, a supervisor may ask to look through my
              belongings. This is in an effort to ensure the safety of the other
              guests and their children.
            </strong>
          </li>
        </Form.Item>
        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Leave Children Unattended Out of My Line of Sight:</u>
          </strong>
          <li>
            I agree to supervise my children at all times. Parents are
            responsible for care and “line of sight” supervision of children at
            all times.
            <strong>
              Parents may never leave the building while your child remains in
              the building for any length of time. This applies to children of
              all ages. (While in the kitchen, Children may be in the dining
              room, and be regularly checked on)
            </strong>
          </li>
        </Form.Item>
        <p>
          <strong>
            {' '}
            ***I understand that if I Do any of the above mentioned things I may
            be written up, suspended or terminated from the shelter. I also
            understand that after 3 write-ups (whether I signed them or not), I
            may be suspended or terminated from using this shelter.***
          </strong>
        </p>
      </Card>
    </div>
  );
};

export default Expectations;
