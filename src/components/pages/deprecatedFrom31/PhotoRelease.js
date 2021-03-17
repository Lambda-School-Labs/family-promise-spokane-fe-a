/*
Signatures for Photo Release
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker, Row, Col } from 'antd';

const PhotoRelease = ({
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
  // //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  // //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  // const { familyMember } = formData;

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card
        title="Family Promise of Spokane Photo/Video Release Form"
        bordered={false}
      >
        <IntakeButton navigation={navigation} />
        <Form>
          <Form.Item>
            <strong>I, </strong>{' '}
            <Input className="printName" placeholder="First & Last Name" />,
            grant permission to Family Promise of Spokane and its employees,
            volunteers, and affiliates the irrevocable and unrestricted right to
            reproduce the photographs and/or video images taken of me, or
            members of my family, for the purpose of publication, promotion,
            illustration, advertising, or trade, in any manner or in any medium.
            I hereby release Family Promise of Spokane and its legal
            representatives for all claims and liability relating to said images
            or video. Furthermore, I grant permission to use my statements that
            were given during an interview, with or without my name, for the
            purpose of advertising and publicity without restriction. I waive my
            right to any compensation and understand that this release shall
            remain in effect until terminated in writing.
          </Form.Item>

          <Form.Item>
            <Input className="initials" placeholder="Initials" />I do not
            consent to the inclusion of personal information about me or any of
            my dependents.
          </Form.Item>

          <Form.Item>
            I acknowledge that I am:
            <Input className="initials" placeholder="Initials" /> over the age
            of 18 AND
            <Input className="initials" placeholder="Initials" /> the legal
            guardian of the following:
          </Form.Item>

          {/* Adding Dependents  */}

          <Form.Item>
            Dependent children under 18 in household, if any (please{' '}
            <strong>add first and last</strong> names):
          </Form.Item>

          <Form.Item>
            <ol>
              <Row>
                <Col span={12}>
                  <li>
                    <Input
                      className="printName"
                      placeholder="First & Last Name"
                    />
                  </li>
                </Col>
                <Col span={12}>
                  <li>
                    <Input
                      className="printName"
                      placeholder="First & Last Name"
                    />
                  </li>
                </Col>
                <Col span={12}>
                  <li>
                    <Input
                      className="printName"
                      placeholder="First & Last Name"
                    />
                  </li>
                </Col>
                <Col span={12}>
                  <li>
                    <Input
                      className="printName"
                      placeholder="First & Last Name"
                    />
                  </li>
                </Col>
                <Col span={12}>
                  <li>
                    <Input
                      className="printName"
                      placeholder="First & Last Name"
                    />
                  </li>
                </Col>
                <Col span={12}>
                  <li>
                    <Input
                      className="printName"
                      placeholder="First & Last Name"
                    />
                  </li>
                </Col>
              </Row>
            </ol>
          </Form.Item>

          <Form.Item>
            I extend the expressed permissions, liability releases, and waivers,
            as stated above, for all minors listed, without restrictions. I
            understand that further permission will be deemed necessary prior to
            releasing and/or publishing the name of a minor with regards to
            photographs and/or video images.
          </Form.Item>

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
        </Form>
      </Card>
    </div>
  );
};

export default PhotoRelease;
