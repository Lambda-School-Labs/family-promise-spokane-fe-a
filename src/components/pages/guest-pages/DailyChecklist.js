import React from 'react';
import { Checkbox } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const dailyTasks = ['Task1', 'Task2', 'Task3', 'Task4', 'Task5'];

const DailyChecklist = () => {
  return (
    <div className="container">
      <h1>Daily Checklist</h1>
      <div className="taskListContainer">
        {dailyTasks.map(task => {
          return (
            <FormControlLabel
              control={<Checkbox value={task} color="primary" size="large" />}
              label={task}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailyChecklist;
