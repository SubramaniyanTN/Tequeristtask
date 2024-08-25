import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../QUERY_KEY'
import { get, post, PostPropsType } from 'apps/expo/axios'

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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.tasks] })
    },
    onError: (error, variables, context) => {},
  })
}
