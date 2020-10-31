import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function TabPanel(props) {
  const { children, value, index, classes, ...other } = props;
  const isActive = value === index;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isActive && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}
