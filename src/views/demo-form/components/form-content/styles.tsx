import styled from '@emotion/styled'
import { Box as MuiBox } from '@mui/material'

/**
 * Represents a styled form container component.
 *
 * This component applies custom styles to the form element.
 */
export const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
}))
