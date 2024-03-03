import { useState } from 'react'

import type { FieldValues } from 'react-hook-form'
import type { BaseFieldProps } from '@interfaces'

/**
 * A hook for handling form field input with optional react-hook-form integration.
 *
 * @typeparam T - The type of FieldValues values.
 *
 * @param props - The properties to configure the form field.
 *
 * @returns An object containing handlers for `onChange` and `onBlur` events,
 * the current input value, and a method to set the initial value.
 */
export const useWithBaseFieldHelper = <T extends FieldValues>(
  props: T & BaseFieldProps<T>
) => {
  const [value, setValue] = useState<string>('')

  /**
   * Handles the `onChange` event for the input element.
   *
   * @param e - The `ChangeEvent` object.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value)

    // This will update React Hook Form's state
    props.formhandler?.setFormValue({
      name: props.name,
      value: e.target.value
    })

    // This will update local input state
    props.onChange?.(e)
  }

  /**
   * Handles the `onBlur` event for the input element.
   *
   * @param e - The `FocusEvent` object.
   */
  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value)

    // This will update React Hook Form's state
    props.formhandler?.setFormValue({
      name: props.name,
      value: e.target.value
    })

    // This will update local input state
    props.onBlur?.(e)
  }

  /**
   * Sets the initial value of the input field based on:
   *
   * - Formik's current state, if formhandler is provided
   * - Initial value assigned to the field when implemented outside of a form
   */
  const setInitialValue = () => {
    setValue(
      props.formhandler?.formState().currentState[props.name] ?? props.value
    )
  }

  return {
    handleBlur,
    handleChange,
    value,
    setInitialValue
  }
}
