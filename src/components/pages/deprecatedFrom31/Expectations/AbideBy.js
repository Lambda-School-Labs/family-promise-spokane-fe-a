/*
Requires Signatures from Client for clause in Guest Expectations and Decorum Agreement
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker } from 'antd';

const AbideBy = ({
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

        <h3>I WILL be expected to: </h3>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Have My Kids In School:</u>
          </strong>
          <li>
            I understand that all school-aged children must be enrolled in and
            regularly attending school. Also, I will be looking for and using
            available preschool programs for my preschool aged children, so I
            can be looking for employment, housing and resources more
            efficiently.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Keep Pets on a Leash or in Kennel and will Not get New Pets:</u>
          </strong>
          <li>
            I understand that my pet is welcome at the shelter and that all pets
            staying at the shelter must be kept kenneled at night. All pets must
            be kept on a leash at all times and the leash must be held by a
            person.. If my pet were to ever bite or harm any individual or other
            pets they will have to leave the shelter and I will be held fully
            legally responsible. I further understand that if I did not have a
            pet with me at the time of my intake I will not be allowed to bring
            one in after, or get additional pets. Pets must leave the shelter
            with me any time I leave the shelter, unless a signed agreement
            exists for that day.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Participate in keeping the shelter clean and sanitary:</u>
          </strong>
          <li>
            I agree to participate in{' '}
            <strong>chores every day in the evenings and mornings</strong> at
            the day and night shelters. I agree to participate in a positive
            manner while I am a guest here. I understand that I will be expected
            to clean up after myself and my children at all times and may
            sometimes be asked to help clean up after others as well.{' '}
            <strong>
              Children under 16 are not allowed to sign up for chores on the
              chore list
            </strong>
            , but may help in chores. (If you want your kids to help that is
            fine, however, adults are ultimately responsible for the completion
            of the chore.)
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Limit the amount of personal belongings:</u>
          </strong>
          <li>
            I agree to limit my personal belongings inside the Open Doors
            shelter to what my family needs for the day and to keep these
            belongings stored in the lockers that are indoors. I understand that
            unattended personal belongings and food items may be donated after
            24 hours unless I have made prior arrangements.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Keep my food storage area clean and sanitary:</u>
          </strong>
          <li>
            I understand that Open Doors will provide food for my family when
            donations are available. I will be allowed to bring in my own food
            for my family and store it in the food storage area only and if I
            leave food in any other area of the shelter it will be disposed of.
            I understand that unattended food items in the food storage area may
            be donated after <strong>24 hours</strong> unless I have made prior
            arrangements. Open Doors is not responsible for stolen food.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Only eat in the dining area or kitchen:</u>
          </strong>
          <li>
            I will not bring any food into any areas of the shelter that are not
            designated for eating. I will follow the kitchen hours and clean up
            after myself and my children after preparing and/or eating.
          </li>
        </Form.Item>

        <Form.Item>
          <Input className="initials" placeholder="Initials" />
          <strong>
            <u>Wear shoes and shirts at all times while in the shelter:</u>
          </strong>
          <li>
            I will not walk around inside of the shelter or in the parking lot
            without wearing shoes and a shirt. I will have clothing on top and
            bottom at night while in my bed in the shelter.
          </li>
        </Form.Item>
        <p>
          Non-Compliance of the above mentioned expectations does NOT
          necessarily exclude me from a bed in Open Doors Shelter
        </p>
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
      </Card>
    </div>
  );
};

export default AbideBy;
