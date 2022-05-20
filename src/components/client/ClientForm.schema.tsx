import { validLatAndLongRegex } from '../../utils'

import * as yup from 'yup'

const clientSchema = yup.object({
  name: yup.string().required('Name is required'),
  routes: yup.array().of(
    yup
      .object({
        lat: yup
          .string()
          .required('Latitude is required')
          .matches(validLatAndLongRegex, 'Latitude is invalid'),

        lng: yup
          .string()
          .required('Longitude is required')
          .matches(validLatAndLongRegex, 'Longitude is invalid')
      })
      .required()
  )
})

export default clientSchema
