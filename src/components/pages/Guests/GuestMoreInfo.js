import React, { useState } from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;
const tabListNoTitle = [
  {
    key: 'Demographics',
    tab: 'Demographics',
  },
  {
    key: 'Barriers',
    tab: 'Barriers',
  },
  {
    key: 'Additional Info',
    tab: 'Additional Info',
  },
];

const GuestMoreInfo = ({ familyInfo }) => {
  const [tab, setTab] = useState({ key: 'tab1', noTitleKey: 'Demographics' });

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };
  let contentListNoTitle = {};
  if (familyInfo) {
    contentListNoTitle = {
      Demographics: (
        <div className="Demographics">
          <div className="addInfoText">
            <Text type="secondary" strong>
              First Name
            </Text>
            <p>
              {familyInfo.demographics.first_name
                ? familyInfo.demographics.first_name
                : ''}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary" strong>
              Last Name
            </Text>
            <p>
              {familyInfo.demographics.last_name
                ? familyInfo.demographics.last_name
                : ''}{' '}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary" strong>
              Relationship
            </Text>
            <p>
              {familyInfo.demographics.relationship
                ? familyInfo.demographics.relationship
                : ''}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary" strong>
              Gender
            </Text>
            <p>
              {familyInfo.demographics.gender
                ? familyInfo.demographics.gender
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Date Of Birth
            </Text>
            <p>
              {familyInfo.demographics.DOB ? familyInfo.demographics.DOB : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              SSN
            </Text>
            <p>
              {' '}
              {familyInfo.demographics.SSN ? familyInfo.demographics.SSN : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Employer
            </Text>
            <p>
              {familyInfo.demographics.employer
                ? familyInfo.demographics.employer
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Income
            </Text>
            <p>
              {' '}
              {familyInfo.demographics.income
                ? familyInfo.demographics.income
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Race
            </Text>
            <p>
              {familyInfo.demographics.race ? familyInfo.demographics.race : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Ethnicity
            </Text>
            <p>
              {familyInfo.demographics.ethnicity
                ? familyInfo.demographics.ethnicity
                : ''}
            </p>
          </div>
        </div>
      ),
      Barriers: (
        <div className="barriers">
          <div className="addInfoText">
            <Text type="secondary">HIV/AIDS:</Text>

            {familyInfo.barriers.HIV_AIDs
              ? familyInfo.barriers.HIV_AIDs === true
                ? 'yes'
                : 'no'
              : ''}

            <br></br>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Alcohol Abuse:</Text>
            <p>
              {familyInfo.barriers.alcohol_abuse
                ? familyInfo.barriers.alcohol_abuse === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Chronic Health Issues:</Text>
            <p>
              {familyInfo.barriers.chronic_health_issues
                ? familyInfo.barriers.chronic_health_issues === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <br></br>
          <div className="addInfoText">
            <Text type="secondary">Physcial Disabilites:</Text>
            <p>
              {familyInfo.barriers.physcial_disabilites
                ? familyInfo.barriers.physcial_disabilites === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary">Development Disabilites:</Text>
            <p>
              {familyInfo.barriers.developmental_disabilites
                ? familyInfo.barriers.developmental_disabilites === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Drug Abuse:</Text>
            <p>
              {familyInfo.barriers.drug_abuse
                ? familyInfo.barriers.drug_abuse === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Indefinite Conditions:</Text>
            <p>
              {familyInfo.barriers.list_indefinite_conditions
                ? familyInfo.barriers.list_indefinite_conditions === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Issues:</Text>
            <p>
              {familyInfo.barriers.issues
                ? familyInfo.barriers.issues === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <br></br>
        </div>
      ),
      'Additional Info': (
        <div className="additional_info">
          <div className="addInfoText">
            <Text type="secondary">Date of Enrollment: </Text>
            <p>
              {familyInfo.date_of_enrollment
                ? familyInfo.date_of_enrollment
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Flag</Text>
            <p>{familyInfo.flag ? familyInfo.flag : ''}</p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Flag Level</Text>
            <p>{familyInfo.flag_level ? familyInfo.flag_level : ''}</p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Length of Stay:</Text>
            <p>{familyInfo.length_of_stay ? familyInfo.length_of_stay : ''}</p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">School: </Text>
            <p>
              {familyInfo.schools.attendance_status
                ? familyInfo.schools.attendance_status
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">School Name: </Text>
            <p>
              {familyInfo.schools.school_name
                ? familyInfo.schools.school_name
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Mc Kinney School:</Text>
            <p>
              {familyInfo.schools.mckinney_school
                ? familyInfo.schools.mckinney_school
                : ''}
            </p>
          </div>
        </div>
      ),
    };
  }

  return (
    <div>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={tab.noTitleKey}
        onTabChange={key => {
          onTabChange(key, 'noTitleKey');
        }}
      >
        {contentListNoTitle[tab.noTitleKey]}
      </Card>
    </div>
  );
};

export default GuestMoreInfo;
