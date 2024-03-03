import { renderHook, cleanup } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { defaultValues, schema } from './mocks'

import { useFormHandler } from '.'

const performRender = () =>
  renderHook(() =>
    useFormHandler({
      defaultValues,
      schema,
      onSubmit: () => {
        console.log('Form has been submitted')
      },
      onError: () => {
        console.log('Form has some errors')
      }
    })
  )

describe('useFormHandler Hook', () => {
  afterEach(() => {
    /** Umounts React Hooks that were mounted with render */
    void cleanup()
  })

  it('Returns methods exposing individual functions to manage the form state', () => {
    const { result } = performRender()

    expect(Object.keys(result.current)).toEqual([
      'setFormValue',
      'formState',
      'fieldState',
      'clearErrors',
      'resetForm',
      'triggerValidation',
      'onSubmitHandler',
      'debugMode'
    ])
  })

  it('Type definitions for the previous methods returned are the expected', () => {
    const { result } = performRender()

    expect(result.current).toEqual({
      setFormValue: expect.any(Function),
      formState: expect.any(Function),
      fieldState: expect.any(Function),
      clearErrors: expect.any(Function),
      resetForm: expect.any(Function),
      triggerValidation: expect.any(Function),
      onSubmitHandler: expect.any(Function),
      debugMode: expect.any(Function)
    })
  })

  describe('Hook functionalities work as expected', () => {
    it('setFormValue - Dynamically sets the value of a registered field', () => {
      const {
        result: {
          current: { setFormValue, formState }
        }
      } = performRender()
      const newPropertyValue = 'Ana'

      setFormValue({
        name: 'name',
        value: newPropertyValue
      })

      expect(formState().currentState.name).toBe(newPropertyValue)
    })

    it('formState - Returns an object containing information about the entire form state', () => {
      const {
        result: {
          current: { formState }
        }
      } = performRender()

      const expectedKeyNamesReturned = [
        'defaultValues',
        'currentState',
        'isValid',
        'errors',
        'hasBeenUpdated'
      ]

      // Returns the expected key names
      expect(Object.keys(formState())).toStrictEqual(expectedKeyNamesReturned)

      // Returns the expected property values
      expect(formState()).toStrictEqual({
        defaultValues,
        currentState: defaultValues,
        isValid: true,
        hasBeenUpdated: false,
        errors: {}
      })
    })

    it('fieldState - Returns individual field state', () => {
      const {
        result: {
          current: { fieldState }
        }
      } = performRender()

      const expectedKeyNamesReturned = [
        'isDirty',
        'isTouched',
        'invalid',
        'error'
      ]

      // Returns the expected key names
      expect(Object.keys(fieldState('email'))).toStrictEqual(
        expectedKeyNamesReturned
      )

      // Returns the expected property values
      expect(fieldState('email')).toStrictEqual({
        isDirty: false,
        isTouched: false,
        invalid: false,
        error: ''
      })
    })

    it('clearErrors - Function through which it can be manually cleared errors in the form', async () => {
      const {
        result: {
          current: { setFormValue, fieldState, clearErrors }
        }
      } = performRender()

      await waitFor(() => {
        setFormValue({
          name: 'sex',
          value: 3
        })
      })

      // Field 'sex' should be flagged as 'invalid'
      expect(fieldState('sex').invalid).toBeTruthy()

      await waitFor(() => {
        clearErrors('sex')
      })

      // Fiels 'sex' should be valid again
      expect(fieldState('sex').invalid).toBeFalsy()
    })

    it('resetForm - Reset the entire form state, fields reference, and subscriptions', async () => {
      const {
        result: {
          current: { formState, resetForm }
        }
      } = performRender()

      await waitFor(() => {
        resetForm({
          name: 'Test Value 1',
          lastName: 'Test Value 2',
          sex: 'F',
          email: 'dummyEmail@gmail.com'
        })
      })

      // Current form state should display the set values
      expect(formState().currentState).toStrictEqual({
        name: 'Test Value 1',
        lastName: 'Test Value 2',
        sex: 'F',
        email: 'dummyEmail@gmail.com'
      })
    })

    it('triggerValidation - Manually triggers form or input validation', async () => {
      const {
        result: {
          current: { triggerValidation, fieldState, resetForm }
        }
      } = performRender()

      await waitFor(() => {
        resetForm({
          name: '',
          lastName: '',
          sex: 'M',
          email: ''
        })
      })

      await waitFor(() => {
        void triggerValidation()
      })

      expect(fieldState('name').invalid).toBeTruthy()
      expect(fieldState('lastName').invalid).toBeTruthy()
      expect(fieldState('email').invalid).toBeTruthy()
    })

    it('debugMode - This function will return the Form State to be used as `debug information`', () => {
      const {
        result: {
          current: { debugMode }
        }
      } = performRender()

      const debugModeResult = debugMode()

      expect(debugModeResult).toStrictEqual({
        defaultValues,
        currentState: defaultValues,
        isValid: false,
        hasBeenUpdated: false,
        errors: {}
      })
    })
  })
})
