/*
Requires Signatures from Client and Staff for clause in Third Party Consent form 
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakePacketContent/IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker, Row, Col } from 'antd';

const ThirdPartySigs = ({
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

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. 

  Unable make keys dynamic in spread (currently not DRY code)
  You must create a new function for each input feild or make keys dynamic.
  */

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Third Party Consent Form (continued)" bordered={false}>
        <IntakeButton navigation={navigation} />
        <h3>EACH SECTION BELOW MUST BE COMPLETED</h3>

        <Form>
          <Form.Item>
            <ol type="I">
              <li>
                I,{' '}
                <Input
                  bordered={false}
                  className="printName"
                  placeholder="First & Last Name"
                />
                , hearby knowingly and voluntarily consent to and authorize the
                release of information from my records as specified below.
              </li>
              <li>
                The information may be exchanged between the following
                persons/organizations:
                <ul>
                  <li>
                    Name of Facility:
                    <u> Family Promise/Open Doors of Spokane</u>
                  </li>
                  <li>
                    Address: <u>2002 E Mission Ave, Spokane, WA 99202</u>
                  </li>
                  <li>
                    Name of Individual, Agency, or Facility:
                    <Row>
                      <Col span={6}>
                        <ul> Salvation Army of Spokane </ul>
                      </Col>
                      <Col span={6}>
                        <ul>DSHS</ul>
                      </Col>
                      <Col span={6}>
                        <ul>CPS</ul>
                      </Col>
                      <Col span={6}>
                        <ul>DCYF</ul>
                      </Col>
                      <Col span={6}>
                        <ul>Passages</ul>
                      </Col>
                      <Col span={6}>
                        <ul>SHA</ul>
                      </Col>
                      <Col span={6}>
                        <ul>SVA</ul>
                      </Col>
                      <Col span={6}>
                        <ul>Vanessa Behan Crisis Nursery</ul>
                      </Col>
                      <Col span={6}>
                        <ul>Catholic Charities</ul>
                      </Col>
                      <Col span={6}>
                        <ul>HFCA</ul>
                      </Col>
                      <Col span={6}>
                        <ul>Spokane Public Schools</ul>
                      </Col>
                      <Col span={6}>
                        <ul>Frontier Behavioral Health</ul>
                      </Col>
                      <Col span={6}>
                        <ul>St. Margarets</ul>
                      </Col>
                      <Col span={6}>
                        <ul>Any agency deemed appropriate by FPS</ul>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </li>
              <li>
                These persons/organizations may communicate regarding and
                disclose to each other information related to me and my
                household
                <ul>
                  <strong>
                    **The information to be released may be communicated to a
                    3rd party: In writing, verbally or electronically
                  </strong>
                </ul>
              </li>
            </ol>
          </Form.Item>
          <hr />
          <Form.Item>
            <p>
              I understand that I may revoke this authorization at any time,
              except to the extent that action has already been taken in
              reliance upon it. This authorization must be revoked in writing
              for data protected under HIPAA but may be revoked orally for data
              protected under 42 C.F.R. part 2. One of the persons/organizations
              to which information is being released can provide you with a form
              for revoking your consent, if applicable. If this authorization is
              not specifically revoked earlier, it will terminate after:{' '}
              <strong>One year from date of signature below</strong>
            </p>
          </Form.Item>

          <Form.Item>
            <p>
              I understand that I might be denied services if I refuse to
              consent to a disclosure for purposes of treatment, payment, or
              healthcare operations, if permitted by law. I will not be denied
              services if I refuse to consent to a disclosure for other
              purposes.
            </p>
            <p>
              **Above mentioned consent will include information about any minor
              children in my care
            </p>
          </Form.Item>

          <Form.Item>
            <p>
              Dependent childrern under 18 in household, if any(please enter
              first and last names):
            </p>
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

          <bold>*** MUST BE SIGNED BY ALL ADULTS IN HOUSEHOLD ***</bold>
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

export default ThirdPartySigs;
