/*
Signatures for Client Release form from Staff members
*/

import React from 'react';
import { useHistory } from 'react-router-dom';
//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Checkbox, Card, Button, DatePicker } from 'antd';

const ClientReleaseStaffSignature = () => {
  const tempFormStyle = {
    marginLeft: '20%',
    marginTop: '50px',
    maxWidth: '900px',
  };
  //Progress bar
  const submitHandler = e => {};

  return (
    <div style={tempFormStyle}>
      <div>
        <Button
          type="primary"
          style={{
            backgroundColor: 'green',
            border: '1px solid green',
            width: '100px',
          }}
          htmlType="Submit"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>

      <Card title="Client Release Staff Signature" bordered={false}>
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
