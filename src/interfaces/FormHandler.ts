import type { DefaultValues, Mode, UseFormProps, SetValueConfig, FieldValues, FieldErrors } from 'react-hook-form'
import type { ObjectSchema } from 'yup'
import type { useFormHandler } from 'hooks'

/**
 * Props interface for the FormHandler component.
 *
 * @typeparam T - The type of the form field values.
 */
export interface FormHandlerProps<T extends FieldValues> {
  /**
   * Default values for the form fields.
   */
  defaultValues: DefaultValues<T>

  /**
   * The Yup schema to validate the form fields.
   */
  schema: ObjectSchema<T & any>

  /**
   * Callback function triggered when the form is submitted successfully.
   * @param data - The form data submitted.
   */
  onSubmit: (data: T) => void

  /**
   * Callback function triggered when there are validation errors on form submission.
   * @param data - Object containing the field errors.
   */
  onError: (data: FieldErrors<T>) => void

  /**
   * The mode for the form (e.g., "onSubmit", "onBlur", "onChange", etc.).
   */
  mode?: Mode

  /**
   * Additional options for the useForm hook, excluding "defaultValues", "mode", "resolver", and "values".
   */
  options?: Omit<UseFormProps, 'defaultValues' | 'mode' | 'resolver' | 'values'>
}

/**
 * Props interface for setting a value for a specific form field.
 */
export interface SetValueProps {
  /**
   * The name of the form field to set a value for.
   */
  name: string

  /**
   * The value to set for the form field.
   */
  value: unknown

  /**
   * Additional options for setting the value, excluding "shouldValidate" and "shouldDirty".
   */
  options?: Omit<SetValueConfig, 'shouldValidate' | 'shouldDirty'>
}

/**
 * Represents the return type of the useFormHandler hook.
 *
 * @typeparam T - The type of the form field values.
 */
export type UseFormReturn<T extends FieldValues> = ReturnType<typeof useFormHandler<T>>

/**
 * Represents the props for enabling debug mode in the UI.
 */
export interface FormDebugOption {
  /**
   * A boolean value indicating whether the debug mode is enabled or not.
   */
  debugMode?: boolean
}
