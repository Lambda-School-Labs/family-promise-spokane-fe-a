/*
General information about family pets.
This component contains:
  -Pet Information(input(s))
 
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosWithAuth from '../../../../api/axiosWithAuth';
import { getDocuSignUrl } from '../../../../state/actions/index';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Checkbox, Card, Progress, Button } from 'antd';

const Pets = ({
  navigation,
  tempFormStyle,
  formData,
  setForm,
  steps,
  step,
}) => {
  //docusign
  const signerInfo = useSelector(state => state.SIGNER_INFORMATION);
  let envelopeArgs = {
    signer1Email: signerInfo.email,
    signer1Name: signerInfo.first_name + ' ' + signerInfo.last_name,
    signer1Id: signerInfo.id,
  };
  const [loadDocuSign, setLoadDocusign] = useState(false);
  const { familyInfo, familyMember } = formData;
  const { previous } = navigation;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadDocuSign) {
      history.push('/redirect');
    }
  }, [loadDocuSign]);

  function callDocusign() {
    axiosWithAuth()
      .post(`/families`, familyInfo)
      .then(res => {
        const familyId = res.data.families.id;
        Object.keys(formData.familyMember).map(mem => {
          familyMember[mem]['family_id'] = familyId;
          axiosWithAuth()
            .post('/members', familyMember[mem])
            .then(res => console.log('Members added', res.data))
            .catch(err => {
              console.log('MemberError', err.response);
            });
        });
        axios
          .post('http://localhost:8000/callDS', envelopeArgs)
          .then(res => {
            setLoadDocusign(!loadDocuSign);
            dispatch(getDocuSignUrl(res.data));
          })
          .catch(err => console.log('DocuSign error', err));
      })
      .catch(err => console.log('FamiliesError', err));
  }
  //docusign

  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Pets" bordered={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={previous}
            style={{ width: '100px' }}
          >
            Previous
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={callDocusign}
            style={{ width: '100px' }}
          >
            Next
          </Button>
        </div>

        <Form layout="vertical">
          <Form.Item>
            <Checkbox
              name="familyInfo.pets.shelter"
              defaultChecked={familyInfo.pets.shelter}
              onChange={setForm}
            >
              Is your family bringing an animal with you into the shelter at the
              time of your intake?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            How many pets will you be bringing:
            <Checkbox
              name="familyInfo.pets.amount"
              defaultChecked={familyInfo.pets.amount.value1}
              onChange={setForm}
              value1={1}
            >
              1
            </Checkbox>
            <Checkbox
              name="familyInfo.pets.amount"
              defaultChecked={familyInfo.pets.amount.value2}
              onChange={setForm}
              value2={2}
            >
              2
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.pets.dog"
              defaultChecked={familyInfo.pets.dog}
              onChange={setForm}
            >
              Dog?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.pets.cat"
              defaultChecked={familyInfo.pets.cat}
              onChange={setForm}
            >
              Cat?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.pets.service_animal"
              defaultChecked={familyInfo.pets.service_animal}
              onChange={setForm}
            >
              Service Animal?
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              name="familyInfo.pets.support_animal"
              defaultChecked={familyInfo.pets.support_animal}
              onChange={setForm}
            >
              Emotional Support Animal?
            </Checkbox>
          </Form.Item>

          <Form.Item label="Name of Pet 1">
            <Input
              name="familyInfo.pets.name_one"
              value={familyInfo.pets.name_one}
              onChange={setForm}
            />
          </Form.Item>

          <Form.Item label="Name of Pet 2">
            <Input
              name="familyInfo.pets.name_two"
              value={familyInfo.pets.name_two}
              onChange={setForm}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Pets;
