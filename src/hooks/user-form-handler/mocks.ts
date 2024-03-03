import * as yup from 'yup'

export interface DemoFormSchema {
  name: string
  lastName: string
  sex: 'M' | 'F'
  email: string
}

/** Object that serves as the initial state provider form the form instance */
export const defaultValues: DemoFormSchema = {
  email: 'rosalesvictor.dev@gmail.com',
  lastName: 'Rosales',
  name: 'Victor',
  sex: 'M'
}

/** Object validation schema form the 'test' form instance */
export const schema = yup
  .object()
  .shape<Record<keyof DemoFormSchema, yup.Schema>>({
    name: yup.string().required(),
    lastName: yup.string().required(),
    sex: yup.mixed().oneOf(['F', 'M']).required(),
    email: yup.string().required()
  })
