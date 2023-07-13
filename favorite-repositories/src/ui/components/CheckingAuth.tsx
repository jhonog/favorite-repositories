import { CircularProgress } from '@mui/material';

import React from 'react'

export const CheckingAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-main p-4">
      <div className="flex flex-row justify-center">
        <CircularProgress color="warning" />
      </div>
    </div>
  )
}
