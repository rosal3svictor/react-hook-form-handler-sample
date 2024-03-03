import { TextContainer } from './styles'

import type { FieldValues } from 'react-hook-form'
import type { UseFormReturn } from '@interfaces'

/**
 * Represents a React functional component that displays debug information about
 * the form's state.
 *
 * @param formHandler - The form handler object returned from the
 * `useFormHandler` hook.
 *
 * @returns The JSX element representing the debug information.
 */
const DebugModeUI = <T extends FieldValues>(formHandler: UseFormReturn<T>) => {
  const { defaultValues, currentState, isValid, errors, hasBeenUpdated } =
    formHandler.debugMode()

  return (
    <TextContainer data-testid="debug-mode-ui">
      <h3>DEBUG MODE</h3>
      <p>Default Values: {JSON.stringify(defaultValues)}</p>
      <p>Current State: {JSON.stringify(currentState)}</p>
      <p>Valid Data: {JSON.stringify(isValid)}</p>
      <p>Errors: {JSON.stringify(errors)}</p>
      <p>Form Has Been Updated: {String(hasBeenUpdated)}</p>
    </TextContainer>
  )
}

export default DebugModeUI
