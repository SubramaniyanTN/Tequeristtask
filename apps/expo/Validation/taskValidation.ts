import { Dispatch, SetStateAction } from 'react'
import { TaskErrorType, TaskType } from '../app'

const titleValidation = (title: string): string => {
  if (title.length < 1) {
    return 'Title must contain single Character'
  } else if (title.length > 25) {
    return 'Title must be less than 25 characters'
  } else {
    return ''
  }
}
const descriptionValidation = (title: string): string => {
  if (title.length > 50) {
    return 'Description must be less than 50 characters'
  } else {
    return ''
  }
}

const taskValidation = (
  data: TaskType,
  taskError: TaskErrorType,
  setTaskError: Dispatch<SetStateAction<TaskErrorType>>
) => {
  setTaskError((prev) => {
    return {
      ...prev,
      title: titleValidation(data.title),
      description: descriptionValidation(data.description),
    }
  })
}

export default taskValidation
