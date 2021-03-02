/*
Signatures for Client Release form from Staff members
*/

import React from 'react';
import { useHistory } from 'react-router-dom';
//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Checkbox, Card, Progress, DatePicker } from 'antd';

const ClientReleaseStaffSignature = ({
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
  const history = useHistory();
  // const submitHandler = e => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .post(`/families`, familyInfo)
  //     .then(res => {
  //       const familyId = res.data.families.id;
  //       Object.keys(formData.familyMember).map(mem => {
  //         familyMember[mem]['family_id'] = familyId;
  //         axiosWithAuth()
  //           .post('/members', familyMember[mem])
  //           .then(res => {
  //             history.push(`/familyprofile/${familyId}`);
  //           })
  //           .catch(err => {
  //             console.log('MemberError', err.response);
  //           });
  //       });
  //     })
  //     .catch(err => console.log('FamiliesError', err));
  // };

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Client Release Staff Signature" bordered={false}>
        <IntakeButton navigation={navigation} />
        <Form>
          <Form.Item>
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            STAFF SIGNATURE
            <DatePicker />
            <Input bordered={false} placeholder="Agency Name" />
            <hr />
            Agency
          </Form.Item>

          <Form.Item>
            <Checkbox />
            Client did NOT consent to the inclusion of personal information in
            CMIS for themselves or any dependents.
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            STAFF SIGNATURE
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Checkbox />
            Staff obtained telephonic consent from client and dependents under
            18 as listed above. Note: Written consent must be obtained at the
            first time the client is physically present at an organization with
            access to the HMIS system.
            <Input bordered={false} placeholder="First & Last Name" />
            <hr />
            STAFF SIGNATURE
            <DatePicker />
            <Input bordered={false} placeholder="Agency Name" />
            <hr />
            Agency
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ClientReleaseStaffSignature;
