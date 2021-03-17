/*
Requires Signatures from Client and Staff for clause in Client Release of information
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakePacketContent/IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Card, Progress } from 'antd';

const ClientRelease = ({
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

      <Card title="Client Release" bordered={false}>
        <IntakeButton navigation={navigation} />

        <h3>Spokane CMIS</h3>
        <p>
          IMPORTANT: Do not enter personally identifying information into CMIS
          for clients who are: 1) in DV agencies, 2) currently fleeing or in
          danger from a domestic violence, dating violence, sexual assault or
          stalking situation; or 3) do not want to provide personally
          identifiable information . If this applies to you, STOP- Do not sign
          this form.
        </p>
        <p>
          This agency participates in the Homeless Management Information System
          (CMIS) by collecting information, over time, about the characteristics
          and service needs of men, women, and children experiencing
          homelessness.
        </p>
        <ul>
          <li className="listItems">
            To provide the most effective services in moving people from
            homelessness to permanent housing, we need an accurate count of all
            people experiencing homelessness in the region. In order to make
            sure that clients are not counted twice if services are received by
            more than one agency, we need to collect some personal information.
            We need: name, birth date, race, ethnicity, social security number,
            etc. You may be asked questions on topics like: income sources,
            veteran status, education, and disabilities. This information is
            used to improve the quality of service you, and others like you,
            receive. You have the right to refuse to provide this information.
            The information you provide for inclusion in the CMIS will not
            affect the quality or quantity of services you are eligible to
            receive from this agency, and will not be used to deny outreach,
            shelter or housing.
          </li>
          <li className="listItems">
            To provide the most effective services in moving people from
            homelessness to permanent housing, we need an accurate count of all
            people experiencing homelessness in the region. In order to make
            sure that clients are not counted twice if services are received by
            more than one agency, we need to collect some personal information.
            We need: name, birth date, race, ethnicity, social security number,
            etc. You may be asked questions on topics like: income sources,
            veteran status, education, and disabilities. This information is
            used to improve the quality of service you, and others like you,
            receive. You have the right to refuse to provide this information.
            The information you provide for inclusion in the CMIS will not
            affect the quality or quantity of services you are eligible to
            receive from this agency, and will not be used to deny outreach,
            shelter or housing.
          </li>
          <li className="listItems">
            In order to get an accurate count of all people experiencing
            homelessness in the region and improve homeless services that you
            and others like you receive, the information you provide may be
            shared with other service agencies and the WA State Dept. of
            Commerce. You may request a comprehensive list of agencies that have
            access to your information via written or verbal request to the
            agency that collected your information. A list of agencies is also
            posted at www.spokanehmis.org.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ClientRelease;
