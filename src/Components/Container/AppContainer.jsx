import React, { useState } from 'react';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';

import BillsForm from '../BillsForm/BillsForm';
import DetailedBills from '../DetailedBills/DetailedBills';

const AppContainer = () => {
  //Styles
  const paperStyle = { width: '340', margin: '20px auto' };
  const tabStyle = { fontSize: '12' };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='disabled tabs example'
      >
        <Tab style={tabStyle} label='Ingrese sus datos' />
        <Tab style={tabStyle} label='Pagos Automaticos' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <BillsForm handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DetailedBills />
      </TabPanel>
    </Paper>
  );
};

export default AppContainer;
