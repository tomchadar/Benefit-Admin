import * as React from 'react'

import {
  Typography,
  Grid,
  Button,
  Box,
  Tab,
} from '@mui/material'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import SettingsIcon from '@mui/icons-material/Settings'

import { DataStore } from '@aws-amplify/datastore'

export default function SysAdmin(props) {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClearDataStore = (event) => {
    // DataStore.clear()
    alert('Employer has been created.')
  }

  return (
    <>
      <Typography variant="h4" component="h6" style={{ paddingBottom: 20 }}>
        System Admin
      </Typography>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="admin tabs">
              <Tab icon={<SettingsIcon />} label="Benefit Admin" value="1"></Tab>
              <Tab icon={<SettingsIcon />} label="System Admin" value="2" />
              {/* <Tab icon={<SettingsIcon />} label="Taxable Benefits" value="3" /> */}
              {/* <Tab
                icon={<AttachMoneyIcon />}
                label="Historical Bonuses"
                value="3"
              />
              <Tab
                icon={<CreditScoreIcon />}
                label="Historical Loans"
                value="4"
              /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid item xs={6}>
              <Button
                style={{ marginTop: 20, marginRight: 10 }}
                variant="contained"
                onClick={handleClearDataStore}
              >
                Set up Employer
              </Button>
            </Grid>
            <Grid item xs={6}></Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  style={{ marginTop: 20, marginRight: 10 }}
                  variant="contained"
                  onClick={handleClearDataStore}
                >
                  Clear DataStore
                </Button>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3"></TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
