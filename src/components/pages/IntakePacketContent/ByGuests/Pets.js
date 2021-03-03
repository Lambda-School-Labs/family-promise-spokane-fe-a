/*
General information about family pets.
This component contains:
  -Pet Information(input(s))
 
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuSignUrl } from '../../../../state/actions/index';
// import { useHistory } from 'react-router-dom';
//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Checkbox, Card, Progress } from 'antd';

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
  const link = useSelector(state => state.DOCUSIGN_URL);
  const [loadDocuSign, setDocuSign] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadDocuSign) {
      history.push('/redirect');
    }
  }, [loadDocuSign]);

  function callDocuSign() {
    console.log('This is our envelope arguments: ', envelopeArgs);
    axios.post('http://localhost:8000/callDS', envelopeArgs).then(res => {
      console.log(res.data);
      setDocuSign(!loadDocuSign);
      dispatch(getDocuSignUrl(res.data));
    });
  }
  //docusign

  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyInfo from ../../intakePacket.jsx (props)
  const { familyInfo } = formData;

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Pets" bordered={false}>
        <IntakeButton navigation={navigation} />

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
          <div className="docusign btn">
            <button onClick={callDocuSign}>Sign your life away</button>
            <Route
              path="/redirect"
              component={() => {
                window.location.href = link;
                return null;
              }}
            />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Pets;
