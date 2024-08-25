import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../QUERY_KEY'
import { get, post, PostPropsType, put } from 'apps/expo/axios'
import { useToastController } from '@my/ui'
import { TaskType } from 'apps/expo/app'
import { useTranslation } from 'react-i18next'

type TaskResponseType = TaskType & {
  createdAt: Date
  id: string
}

export const useTasks = () => {
  const { t } = useTranslation()
  return useQuery<Array<TaskResponseType>>({
    queryKey: [QUERY_KEY.tasks],
    queryFn: ({ pageParam = 0 }) => {
      return get({
        url: `/`,
      })
    },
  })
}

export const useCreateTask = (
  props?: Partial<
    UseMutationOptions<
      TaskType & {
        createdAt: Date
      },
      {
        response: {
          data: {
            msg: string
          }
        }
      },
      PostPropsType<TaskType>,
      any
    >
  >
) => {
  const queryClient = useQueryClient()
  const toast = useToastController()
  const { t } = useTranslation()

  return useMutation<
    TaskType & {
      createdAt: Date
    },
    {
      response: {
        data: {
          msg: string
        }
      }
    },
    PostPropsType<TaskType>,
    any
  >({
    mutationFn: post,
    onSuccess: (data, variables, context) => {
      toast.show(t('taskCreatedSuccess'), {
        burntOptions: {
          haptic: 'success',
          from: 'top',
        },
        native: true,
        duration: 1000,
        notificationOptions: {},
      })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.tasks] })
    },
    onError: (error, variables, context) => {
      toast.show(error.response.data.msg || t('error'), {
        burntOptions: {
          haptic: 'error',
          from: 'top',
          preset: 'error',
        },
        native: true,
        duration: 1000,
        notificationOptions: {},
      })
    },
    ...props,
  })
}

export const useUpdateTask = () => {
  const toast = useToastController()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<
    TaskResponseType,
    {
      response: {
        data:
          | string
          | {
              msg: string
            }
      }
    },
    PostPropsType<TaskResponseType>,
    any
  >({
    mutationFn: put,
    onSuccess(data, variables, context) {
      toast.show(t('updateSuccess'), {
        burntOptions: {
          haptic: 'success',
          from: 'top',
        },
        native: true,
        duration: 1000,
        notificationOptions: {},
      })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.tasks] })
    },
    onError(error, variables, context) {
      toast.show(
        typeof error.response.data === 'string'
          ? error.response.data
          : (error.response.data?.msg && error.response.data.msg) || t('error'),
        {
          burntOptions: {
            haptic: 'error',
            from: 'top',
            preset: 'error',
          },
          native: true,
          duration: 1000,
          notificationOptions: {},
        }
      )
    },
  })
}
