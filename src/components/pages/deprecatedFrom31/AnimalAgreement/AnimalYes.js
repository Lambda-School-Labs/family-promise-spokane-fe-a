/*
Requires Signatures from Client for Animal Agreement
*/
import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker, Checkbox } from 'antd';

const AnimalYes = ({
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
        title="Open Doors Family Shelter Animal Agreement (continued)"
        bordered={false}
      >
        <IntakeButton navigation={navigation} />

        <Form>
          <Form.Item>
            I, <Input className="printName" placeholder="First & Last Name" /> ,
            an Open Doors Guest, agree to the following terms and conditions for
            the care of my animal(s).
          </Form.Item>

          <Form.Item>
            <ul>
              <li>No animal is to be left unattended by their owners.</li>

              <li>All animals must be kenneled or on a leash at all times.</li>

              <li>
                Owners are responsible for cleaning up after their own animals.
                This includes the kennel, litterbox, and outside area.
              </li>

              <li>Cats must have access to litter box at all times.</li>

              <li>
                Dogs must be consistently taken outside to go to the bathroom.
              </li>

              <li>
                Animals exhibiting aggressive behavior toward people or other
                animals may be asked to leave.
              </li>

              <li>
                Owners are responsible for any damage or injury their pet may
                cause property or persons.
              </li>

              <li>Families cannot bring in new animals after their intake.</li>

              <li>
                Only animals that are brought in at the time of intake will be
                allowed.
              </li>

              <li>
                Animals that keep other guests up at night will be asked to
                leave.
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            <strong>
              If these standards are not met, Open Doors reserves the right to
              no longer allow the animal to stay in the shelter.
            </strong>
          </Form.Item>

          <Form.Item>
            Type of animal(s) with your family:
            <Checkbox name="Dog" valuePropName="checked">
              Dog
            </Checkbox>
            <Checkbox name="Cat" valuePropName="checked">
              Cat
            </Checkbox>
          </Form.Item>

          <Form.Item>
            Service Animal:
            <Checkbox name="Service_Yes" valuePropName="checked">
              Yes
            </Checkbox>
            <Checkbox name="Service_No" valuePropName="checked">
              No
            </Checkbox>
          </Form.Item>

          <Form.Item>
            Emotional Support Animal:
            <Checkbox name="Emotional_Yes" valuePropName="checked">
              Yes
            </Checkbox>
            <Checkbox name="Emotional_No" valuePropName="checked">
              No
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <strong>
              ***Please list any additional stipulations or amendments to this
              pet agreement below.***
            </strong>
            <Input />
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

export default AnimalYes;
