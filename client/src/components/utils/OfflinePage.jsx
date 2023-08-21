import { Stack } from '@mui/material'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Helmet } from 'react-helmet'
import { Box,Typography } from '@mui/material';

export default function OfflinePage() {
  return (
    <>
    <Helmet>
    <title>You are offline</title>
</Helmet>
<Box textAlign={'center'} mt={2} component={'div'} >
<Typography variant='h5' color={'error'}>You are offline check your connection </Typography>
</Box>
    <Stack 
    alignItems={'center'}
    justifyContent={'center'}
    >
        
        <img width={'50%'} src="./Going offline.gif" alt="404 page not found" />
        
    </Stack></>
  )
}
