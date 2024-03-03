import { useEffect } from 'react'

import { useWithBaseFieldHelper } from './useWithBaseFieldHelper'

import type { BaseFieldProps } from '@interfaces'
import type { FieldValues } from 'react-hook-form'

/**
 * Enhances a given React component by providing form handling capabilities.
 *
 * It wraps the `WrappedComponent` with additional props such as `onChange`,
 * `onBlur`, `value`, `error`, and `helperText`.
 *
 * The form handling is powered by a `formhandler` instance implementing
 * specific methods.
 *
 * @param WrappedComponent - The React component to be enhanced with form
 * handling props.
 *
 * @typeParam T - The type of form values managed by the form handler.
 *
 * @returns The enhanced component with form handling props.
 */
export function withBaseField<T extends FieldValues>(
  WrappedComponent: React.FC<T>
) {
  /**
   * The enhanced functional component with form handling capabilities.
   *
   * @param props - Props to be passed to the enhanced component.
   *
   * @returns JSX representing the enhanced component.
   */
  return function WithFormHandlerField(props: T & BaseFieldProps<T>) {
    const { setInitialValue, value, handleBlur, handleChange } =
      useWithBaseFieldHelper(props)

    useEffect(() => {
      setInitialValue()
    }, [props.formhandler?.formState().currentState])

    /**
     * Injects the additional props related to form handling to the
     * WrappedComponent.
     */
    return (
      <WrappedComponent
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        error={props.formhandler?.fieldState(props.name).invalid ?? props.error}
        helperText={
          props.formhandler?.fieldState(props.name).error ?? props.helperText
        }
      />
    )
  }
}
