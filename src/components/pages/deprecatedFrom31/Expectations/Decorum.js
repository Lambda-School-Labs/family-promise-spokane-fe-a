/*
Requires Signatures from Client for clause in Guest Expectations and Decorum Agreement
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress } from 'antd';

const Decorum = ({
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

      <Card
        title="Guest Expectations and Decorum Agreement Continued"
        bordered={false}
      >
        <IntakeButton navigation={navigation} />

        <h3>I will be expected NOT to: </h3>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Spank, Yell or Curse:</u>
          </strong>
          <li>
            I understand that{' '}
            <strong>
              spanking and/or yelling are not acceptable forms of parenting
            </strong>{' '}
            at Open Doors. Cursing, spanking and yelling are not allowed at Open
            Doors.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Touch, Pickup or Hold Someone Else’s Child:</u>
          </strong>
          <li>
            I understand that I may never, under any circumstances, put my hands
            on another guest’s child for any reason. This includes: spanking,
            grabbing, pushing, lifting, tickling or holding babies. I may side
            hug or give high fives as appropriate. I may never discipline
            another guest’s child while at Open Doors.
            <strong>
              {' '}
              This applies even if you have been given permission by the child’s
              parents.
            </strong>
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Babysit or Ask Someone Else to Babysit:</u>
          </strong>
          <li>
            I understand I may not,<strong> under any circumstances</strong> ,
            babysit another guest’s child while in the shelter and I will not
            let other guests babysit my child while in the shelter. I understand
            that supervising and/or disciplining my children is not the
            responsibility of other guests, volunteers, or staff.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Sleep in the Day Shelter:</u>
          </strong>
          <li>
            I understand that{' '}
            <strong>Adults sleeping in the day shelter is not allowed</strong>{' '}
            for any reason. Children may nap but not adults. Adults should be
            looking for work, housing or resources during daytime hours or
            helping out around the shelter. If there is a medical reason that
            requires me to rest during the day, I will have my Dr fill out a
            special accommodation form.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Lend money or items of any value to another guest:</u>
          </strong>
          <li>
            I understand that Family Promise (Open Doors) is{' '}
            <strong>not</strong> and can not be held responsible in any way, if
            I choose to lend money or any items of value to another guest. This
            includes: phone, tablet, laptop, car, money, etc.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>I will not:</u>
          </strong>
          <li>
            lend, trade, or borrow food stamps under any circumstances since
            this is an illegal act and could lead to my family losing the
            benefit.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>I will NOT use tobacco products:</u>
          </strong>
          <li>
            anywhere except for in designated areas for both Day Shelter and
            Night Shelter. This includes rolling, chewing, dipping, refilling,
            vaping, or any other type of product containing nicotine. I also
            will <strong>not</strong> allow my under age child to use any
            product containing nicotine on shelter property.
          </li>
        </Form.Item>
      </Card>
    </div>
  );
};

export default Decorum;
