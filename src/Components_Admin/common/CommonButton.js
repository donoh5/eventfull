import { Button } from '@mui/material'
import React from 'react'

const CommonButton = ({children, color, disabled, size, sx, variant, onClick}) => {
  return (
    <Button 
        color={color}
        disabled={disabled}
        size={size}
        variant={variant}
        sx={sx}
        onClick={onClick}
        >
            {children}
        </Button>
  )
}

export default CommonButton