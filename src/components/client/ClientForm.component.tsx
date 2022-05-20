import React from 'react'
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, Typography } from '@mui/material'

import useLocalStorage from '../../hooks/useLocalStorage'
import { useAppSelector, useAppDispatch } from '../../hooks/useStore'
import { addClient, generateID } from '../../features/clients/clientSlice'
import { closeModal } from '../../features/modals/modalSlice'

import clientSchema from './ClientForm.schema'

import { IClient } from '../../features/clients/client.interface'

const ClientForm = () => {
  const [clients, setClient] = useLocalStorage('clients', [] as IClient[])
  const openWhitParams = useAppSelector(
    (state) => state.clientModal.openWhitParams
  )
  const params = useAppSelector((state) => state.clientModal.params)
  const dispatch = useAppDispatch()

  const userFormOptions = {
    defaultValues: {
      routes: [
        {
          lat: openWhitParams ? Number(params.lat) : '',
          lng: openWhitParams ? Number(params.lng) : ''
        }
      ]
    },
    resolver: yupResolver(clientSchema)
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IClient>(userFormOptions)

  const { fields } = useFieldArray({ control, name: 'routes' })

  const onSubmit: SubmitHandler<IClient> = (data) => {
    const client = { ...data, id: generateID() }

    if (!clients.length) {
      setClient([client])
      dispatch(addClient([client]))
    } else {
      setClient([...clients, client])
      dispatch(addClient([client]))
    }

    dispatch(closeModal())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" align="center">
        New client
      </Typography>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            label="Name"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
          />
        )}
      />
      {fields.map((field, index) => {
        return (
          <div key={`routes.${index}.lat`}>
            <Controller
              name={`routes.${index}.lat`}
              control={control}
              defaultValue={field.lat}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="latitude-input"
                  disabled={openWhitParams}
                  size="small"
                  label="Latitude"
                  error={Boolean(errors.routes?.[index].lat?.message)}
                  helperText={errors.routes?.[index].lat?.message}
                  margin="normal"
                  fullWidth
                />
              )}
            />
            <Controller
              name={`routes.${index}.lng`}
              control={control}
              defaultValue={field.lng}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="longitude-input"
                  disabled={openWhitParams}
                  size="small"
                  label="Longitude"
                  error={Boolean(errors.routes?.[index].lng?.message)}
                  helperText={errors.routes?.[index].lng?.message}
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </div>
        )
      })}

      <Button
        sx={{
          mt: 2
        }}
        variant="contained"
        type="submit"
        fullWidth>
        Create
      </Button>
    </form>
  )
}

export default ClientForm
