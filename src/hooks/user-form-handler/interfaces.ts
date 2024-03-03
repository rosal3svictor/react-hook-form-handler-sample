import type { FieldValues, FieldErrors, DeepPartial } from 'react-hook-form'

/**
 * Represents the overall state of a form.
 */
export interface FormState {
  /**
   * The initial values of the form.
   */
  defaultValues: Readonly<DeepPartial<FieldValues>> | undefined

  /**
   * The current values of the form.
   */
  currentState: FieldValues

  /**
   * Indicates if the form is valid (true if there are no validation errors).
   */
  isValid: boolean

  /**
   * The validation errors for each field.
   */
  errors: FieldErrors<FieldValues>

  /**
   * Indicates if the form has been updated (true if the values have changed
   * from initial values).
   */
  hasBeenUpdated: boolean
}

/**
 * Represents the state of a form in debug mode.
 *
 * This interface provides the same properties as `FormState` for debugging
 * purposes.
 */
export type DebugModeState = FormState
