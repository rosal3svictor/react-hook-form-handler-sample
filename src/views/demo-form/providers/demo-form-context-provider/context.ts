import { createContext, useContext } from 'react'

import type { FormContext } from '@interfaces'
import type { DemoFormSchema } from '../../interfaces'

/**
 * Context for managing the state and operations related to a demo form.
 */
export const DemoFormContext = createContext<FormContext<DemoFormSchema>>(
  {} as any
)

/**
 * Hook to access the demo form context.
 *
 * @returns  The context for managing the state and operations related to the
 * demo form.
 */
export const useDemoFormContext = (): FormContext<DemoFormSchema> =>
  useContext(DemoFormContext)
