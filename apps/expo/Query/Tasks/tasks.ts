import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../QUERY_KEY'
import { get, post, PostPropsType } from 'apps/expo/axios'
import { Toast, useToastController } from '@my/ui'

export const useTasks = () => {
  return useQuery({
    queryKey: [QUERY_KEY.tasks],
    queryFn: ({ pageParam = 0 }) => {
      return get({
        url: `/`,
      })
    },
  })
}
export const useCreateTasks = () => {
  const queryClient = useQueryClient()
  const toast = useToastController()

  return useMutation<
    {
      status: number
      message: string
      data: any
    },
    {
      response: {
        data: {
          devMessage: null | any
          message: string
          statusCode: number
          success: boolean
        }
      }
    },
    PostPropsType<any>,
    any
  >({
    mutationFn: post,
    onSuccess: (data) => {
      console.log(data)
      toast.show('Completed', {
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
      console.log(error)
      toast.show('Error', {
        burntOptions: {
          haptic: 'error',
          from: 'top',
        },
        native: true,
        duration: 1000,
        notificationOptions: {},
      })
    },
  })
}
