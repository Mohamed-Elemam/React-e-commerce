import { Stack } from '@mui/material'
import React from 'react'

export default function NotFound() {
  return (
    <>
    <Stack 
    alignItems={'center'}
    justifyContent={'center'}
    // sx={{height:'100vh'}}
    >
        
        <img width={'50%'} src="public\404Error.svg" alt="404 page not found" />
        
    </Stack></>
  )
}
