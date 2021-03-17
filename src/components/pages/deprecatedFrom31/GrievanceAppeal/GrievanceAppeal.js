//form for grievance appeal
import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress, DatePicker } from 'antd';

const SuspensionAgreement = ({ navigation, tempFormStyle, steps, step }) => {
  // //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card
        title="Understanding of Right to Grievance and Appeal Process"
        bordered={false}
      >
        <IntakeButton navigation={navigation} />
        <p>
          When Open Doors Family Shelter renders a decision with which a guest
          disagrees or a staff member, volunteer or other guest acts in a way
          that is viewed by you to be inappropriate or not in line with Open
          Doors core values, a grievance or appeal process is available to you.
        </p>
        <p>
          The grievance/appeal process provides you the opportunity to request a
          reconsideration of a decision that affects your household’s
          eligibility for our programs or file a complaint about a staff member,
          guest or volunteer’s actions or behavior.
        </p>
        <p>
          <strong>
            The steps of the Appeal/Grievance Process are as follows:
          </strong>
        </p>
        <p>
          1. Put the appeal or grievance in writing on a Grievance/Appeal form
          you can obtain from the office, date and sign and be sure to include
          your phone number. (You may have a representative do this for you).
          You may choose a staff member, family member, friend or other advocate
          to represent them through the complaint procedure.
        </p>
        <p>
          2. Send the complaint to the Program Manager. (There is a locked
          mailbox outside of the Program Manager’s door for complaints and
          appeals)
        </p>
        <p>
          3. The Program Manager will make an appointment to discuss the
          complaint with them within three working days of receiving the
          complaint.
        </p>
        <p>
          4. A written report of the Manager's review and initial disposition of
          the complaint will be given to you within three working days following
          the appointment day.
        </p>
        <p>
          5. If you are still dissatisfied, you may request that the disposition
          of the complaint be appealed to the Program Director of Open Doors.
        </p>
        <p>
          6. A written report of the decision/disposition of the Program
          Director of Open Doors will be made available within 15 working days
          of the date their request for appeal was made.
        </p>
        <p>
          7. If the complaint is still not resolved under the above guidelines,
          you may contact the Executive Director of Family Promise directly. The
          Program Director will ensure that the complaint is brought to the
          Executive Director's attention. A written response will be provided to
          you within 30 calendar days.
        </p>
        <p>
          <strong>
            There will be no retaliation, formal or informal, against you for
            filing a complaint.
          </strong>
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

export default SuspensionAgreement;
