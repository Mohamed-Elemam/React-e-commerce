import { Stack } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
    <Helmet>
    <title>Page not found</title>
</Helmet>
    <Stack 
    alignItems={'center'}
    justifyContent={'center'}
    // sx={{height:'100vh'}}
    >
        
        <img width={'50%'} src="./404Error.svg" alt="404 page not found" />
        
    </Stack></>
  )
}
