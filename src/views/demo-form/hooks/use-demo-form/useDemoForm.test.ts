import { renderHook, cleanup } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as yup from 'yup'

import { useDemoForm } from '.'

const performRender = () => renderHook(() => useDemoForm())

describe('useDemoFormHelper Hook', () => {
  afterEach(() => {
    /** Umounts React Hooks mounted with render  */
    cleanup()
  })

  it(`Returns methods exposing individual functions/pieces of data to interact
with the form`, () => {
    const { result } = performRender()

    expect(Object.keys(result.current)).toEqual([
      'initialValues',
      'validationSchema',
      'onSubmit',
      'formHandler',
      'contextValue'
    ])
  })

  it(`Type definitions for the previous methods/data returned are the
  expected`, () => {
    const { result } = performRender()

    expect(result.current).toEqual({
      initialValues: expect.any(Object),
      validationSchema: expect.any(yup.Schema),
      onSubmit: expect.any(Function),
      formHandler: expect.any(Object),
      contextValue: expect.any(Object)
    })
  })

  it(`The default values provided to the form instance are the
  expected`, () => {
    const { result } = performRender()

    expect(Object.keys(result.current.initialValues)).toEqual([
      'name',
      'lastName'
    ])
  })

  it('Validation Schema fields provided to the form are the expected', () => {
    const { result } = performRender()

    expect(Object.keys(result.current.validationSchema.fields)).toEqual([
      'name',
      'lastName'
    ])
  })
})
