import { useRef } from 'react'
import { TextField as MUITextField, type TextFieldProps } from '@mui/material'
import { withBaseField } from '@hocs'

/**
 * Custom TextField component that integrates with form handling utilities.
 *
 * @typeParam T - The type of form values managed by the form handler.
 *
 * @param props - The properties for the TextField.
 *
 * @returns A form-aware TextField component.
 */
const BaseTextField = (props: TextFieldProps) => {
  /**
   * A reference to the underlying HTML input element.
   *
   * It can be used to interact with the input element directly if needed.
   */
  const ref = useRef<HTMLInputElement>(null)

  return <MUITextField {...props} ref={ref} autoComplete="off" />
}

/**
 * A form-aware TextField component created by enhancing the `BaseTextField`
 * component with form handling capabilities.
 *
 * @typeParam T - The type of form values managed by the form handler.
 *
 * @param props - The properties for the TextField, including form handling
 * props.
 *
 * @returns A form-aware TextField component.
 */
export const TextField = withBaseField(BaseTextField)
