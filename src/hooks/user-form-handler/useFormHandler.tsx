import {
  useForm,
  type FieldValues,
  type Path,
  type KeepStateOptions,
  type PathValue
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEqual } from 'lodash'

import type { FormHandlerProps, SetValueProps } from '@interfaces'
import type { DebugModeState } from './interfaces'

/**
 * Custom hook to manage a form
 *
 * @see
 *  [useForm](https://react-hook-form.com/docs/useform)
 *
 * @returns Methods exposing individual functions to manage the form state.
 *
 * @example
 * ```Text
 * In order to make an implementation of this hook, make sure to follow these
 * steps:
 * ```
 *
 * ```Text
 *
 * 1. Create a hook which will serve as a central place to define:
 *     - Default values
 *     - Mode (create or update, and the logic driving this behaviour)
 *     - ValidationSchema
 *     - onSubmit Callback
 *     - onError Callback
 *     - Current value of the Form Context
 *     - Form Handler Instance
 *
 * Make sure to import the hook 'useFormHandler' in it so you can create a new
 * form instance, which will be expecting the 'defaultValues',
 * 'onSubmit' callback, 'onError' callback, and 'validationSchema'
 * (besides the rest of the options)
 * ```
 *
 *```TSX
 *
 * import { useState, useMemo } from 'react';
 * import * as yup from 'yup';
 * import { useFormHandler } from './path/to/utils';
 * import type { FieldErrors } from 'react-hook-form';
 *
 * import type { UseFormHelperReturn, FormMode } from './path/to/interfaces';
 *  import type { DemoFormSchema } from './path/to/DemoForm.interfaces';
 *
 * export function useDemoFormHelper(): UseFormHelperReturn<DemoFormSchema> {
 *    const [mode] = useState<FormMode>('create');
 *    const defaultValues: Record<keyof DemoFormSchema, any> = {
 *       name: '',
 *       lastName: '',
 *    };
 *
 *    const schema = yup.object().shape<Record<keyof DemoFormSchema, yup.Schema>>({
 *       name: yup.string().required('This field is required'),
 *       lastName: yup.string().required('This field is required'),
 *    });
 *
 *    const onSubmit = (data: DemoFormSchema) => {
 *      console.log('Data ', data);
 *    };
 *
 *    const onError = (errors: FieldErrors<DemoFormSchema>) => {
 *      console.log('something happened ', errors);
 *    };
 *
 *    const formHandler = useFormHandler<DemoFormSchema>({
 *       defaultValues,
 *       schema,
 *       onSubmit,
 *       onError
 *    });
 *
 *    // IMPORTANT: This prevents non-stable values (i.e. object identities)
 *    // from being used as a value for Context.Provider.
 *    const contextValue = useMemo(
 *      () => ({
 *        formHandler,
 *        mode,
 *      }),
 *     [formHandler, mode],
 *    );
 *
 *    return { formHandler, contextValue };
 * }
 * ```
 *
 * ```Text
 *
 * 2. Since the internal form state will be handled by React Context API, it has
 * to expose the properties defined on FormContext<YourFormDefinition>(check
 * the type definition).This is a sample of how your context implementation
 * should look like:
 * ```
 *
 *```TSX
 *
 * import { useDemoFormHelper } from './path/to/useDemoFormHelper';
 * import { FormContent } from './path/to/FormContent';
 * import { DemoFormContext } from './path/to/context';
 *
 *
 * export const DemoForm: React.FC = () => {
 *   const { contextValue } = useDemoFormHelper();
 *
 *   return (
 *     <DemoFormContext.Provider value={contextValue}>
 *       <FormContent debugMode />
 *     </DemoFormContext.Provider>
 *   );
 * };
 * ```
 *
 * ```Text
 *
 * 3. Make usage of the custon hook created on step 1 to access the formHandler
 * and to be able to interact with it
 * ```
 * ```TSX
 *
 * import { TextField } from './path/to/components';
 * import { DebugModeUI } from './path/to/utils';
 * import { useDemoFormContext } from './path/to/useDemoFormContext';
 * import { useDemoFormHelper } from './path/to/DemoForm.helper';
 * import { FormContainer } from './path/to/styles';
 * import type { DebugModeUIProps } from './path/to/interfaces';
 *
 * export const FormContent = ({ debugMode = false }: DebugModeUIProps) => {
 *   const { formHandler } = useDemoFormContext();
 *
 *   return (
 *        <FormContainer data-testid="form-container">
 *           <TextField
 *              data-testid="name-input"
 *              name="name"
 *              label="Name"
 *              formhandler={formHandler}
 *          />
 *          <TextField
 *              data-testid="lastName-input"
 *              name="lastName"
 *              label="Last Name"
 *              formhandler={formHandler}
 *          />
 *          <button
 *              type="button"
 *              onClick={formHandler.onSubmitHandler}
 *              disabled={formHandler.formState().isValid}
 *          >
 *              Submit
 *          </button>
 *       </FormContainer >
 *   )
 * };
 * ```
 *
 * ```Text
 *
 * SUMMARY
 * In order to comply with the pattern, you will need to have:
 *    - Hook to define the methods, logic to manage the form.You have to
 *    implement 'useFormHandler' in this file to create a new form instance so
 *    the mthods to manage the form are exposed.
 *    - Create the API Context, to provide the local state
 *    to the form components and sub components(if it applies).
 *    - Implement the context to wrap the form component and the formHandler to
 *    interact with the input fields of it.
 *
 * NOTE
 * Before thinking of using custom hook, it is required to use the HOC
 * 'withBaseField' to enhance each input field expected to be used in the form
 * component.It will inject an optional prop called 'formhandler' to manage the
 * form state, through the methods returned from the `useFormHandler` hook.
 *
 * The concern of updating the input value in the form state, validating,
 * resetting it, etc.will be taken away from you, and will be done
 * automatically by this HOC.
 * ```
 */
export function useFormHandler<T extends FieldValues>(
  props: FormHandlerProps<T>
) {
  /**
   * It is a custom hook for managing forms with ease. It takes one object as
   * optional argument
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform}
   */
  const formInstance = useForm<T>({
    defaultValues: props.defaultValues,
    mode: props.mode ?? 'onChange',
    resolver: yupResolver(props.schema),
    ...props.options
  })

  /**
   * This function allows you to dynamically set the value of a registered field
   * and have the options to validate and update the form state. At the same
   * time, it tries to avoid unnecessary rerender.
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform/setvalue}
   */
  const setFormValue = (args: SetValueProps) => {
    formInstance.setValue(
      args.name as Path<T>,
      args.value as PathValue<T, Path<T>>,
      { shouldValidate: true, shouldDirty: true, ...args.options }
    )
  }

  /**
   * This object contains information about the entire form state. It helps you
   * to keep on track with the user's interaction with your form application.
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform/formstate}
   */
  const formState = () => {
    const { defaultValues, isValid, errors } = formInstance.formState

    return {
      defaultValues,
      currentState: formInstance.getValues(),
      isValid: !isValid,
      errors,
      hasBeenUpdated: !isEqual(defaultValues, formInstance.getValues())
    }
  }

  /**
   * This method is introduced in react-hook-form (v7.25.0) to return individual
   * field state. It's useful in case you are trying to retrieve nested field
   * state in a typesafe way.
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform/getfieldstate}
   */
  const fieldState = (name: Path<T>) => {
    const { isDirty, isTouched, invalid, error } =
      formInstance.getFieldState(name)

    return { isDirty, isTouched, invalid, error: error?.message ?? '' }
  }

  /**
   * This function can manually clear errors in the form.
   *
   * Link to official documentation
   * {@link https://github.com/react-hook-form/react-hook-form/discussions/2704}
   */
  const clearErrors = (input?: Path<T> | Array<Path<T>>) => {
    if (typeof input === 'string') formInstance.clearErrors(input)
    if (typeof input === 'object') formInstance.clearErrors(input)
    formInstance.clearErrors()
  }

  /**
   * Reset the entire form state, fields reference, and subscriptions. There are
   * optional arguments and will allow partial form state reset.
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform/reset}
   */
  const resetForm = (values?: T, options?: KeepStateOptions) => {
    if (values != null) {
      formInstance.reset(values, options)
      return
    }

    formInstance.reset(props.defaultValues, options)
  }

  /**
   * Manually triggers form or input validation. This method is also useful when
   * you have dependant validation (input validation depends on another input's
   * value).
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform/trigger}
   */
  const triggerValidation = async (input?: string | string[]) => {
    if (typeof input === 'string') { return await formInstance.trigger(input as Path<T>) }
    if (typeof input === 'object') { return await formInstance.trigger(input as Array<Path<T>>) }

    return await formInstance.trigger()
  }

  /**
   * This function will receive the form data if form validation is successful.
   *
   * Link to official documentation
   * {@link https://react-hook-form.com/docs/useform/handlesubmit}
   */
  const onSubmitHandler = formInstance.handleSubmit(
    props.onSubmit,
    props.onError
  )

  /**
   * Get a debug snapshot of the current state of the form instance.
   *
   * @returns An object representing the debug snapshot of the current form
   * state.
   */
  const debugMode = (): DebugModeState => {
    const { defaultValues, currentState, isValid, errors, hasBeenUpdated } =
      formState()

    return {
      defaultValues,
      currentState,
      isValid: !isValid,
      errors,
      hasBeenUpdated
    }
  }

  return {
    setFormValue,
    formState,
    fieldState,
    clearErrors,
    resetForm,
    triggerValidation,
    onSubmitHandler,
    debugMode
  }
}
