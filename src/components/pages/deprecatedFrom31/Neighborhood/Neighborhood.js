/*
Requires Signatures from Neighborhood Agreement and Expectations
*/

import React from 'react';
//Previous/Next buttons
import IntakeButton from '../../IntakePacketContent/IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Card, Progress } from 'antd';

const Neighborhood = ({
  navigation,
  formData,
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
        title="Notice of Neighborhood Agreement and Expectations Requirement"
        bordered={false}
      >
        <IntakeButton navigation={navigation} />

        <p>
          Family Promise of Spokane operates based on a set Core Values. One of
          those Core Values is to Be a Good Neighbor. Being a Good Neighbor
          means that we improve, rather than detract from the neighborhood where
          we are located. We have worked very hard as an organization to
          overcome the stigma that comes with a homeless shelter operating in a
          residential neighborhood in the Spokane community.
        </p>
        <p>
          To ensure that Family Promise of Spokane continues to be a positive
          addition to our community and the Chief Garry and South Perry
          neighborhoods the following Expectations have been added to our intake
          packet. All guests residing in our shelters and satellite locations
          are expected to agree to and follow these additional expectations
          starting today. Any guest unwilling to agree to and follow these
          expectations will be unable to utilize the services provided by Family
          Promise of Spokane.
        </p>

        <p>
          Please read the expectations agreement on the back of this notice and
          initial next to each one. All adults in the household must initial and
          sign this agreement.
        </p>

        <p>
          If you have any questions or concerns about these expectations please
          talk to a Supervisor or fill out a complaint/appeal form.
        </p>

        <p>Sincerely,</p>
        <p>Joe Ader - Executive Director, Family Promise of Spokane</p>
        <p>Serena Graves - Program Manager, Open Doors Family Shelter</p>
      </Card>
    </div>
  );
};

export default Neighborhood;
