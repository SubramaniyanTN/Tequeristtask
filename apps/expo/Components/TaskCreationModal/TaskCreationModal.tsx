import { Button, Input, Text, useDebounce, useToastController } from '@my/ui'
import { useQueryClient } from '@tanstack/react-query'
import { TaskType } from 'apps/expo/app'
import { QUERY_KEY } from 'apps/expo/Query/QUERY_KEY'
import { useCreateTask } from 'apps/expo/Query/Tasks/tasks'
import { useStyles } from 'apps/expo/Utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Pressable, StyleSheet, useColorScheme } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { z } from 'zod'

type DropdownValuesType = [
  {
    label: 'Not Started'
    value: 'notStarted'
  },
  {
    label: 'In Progress'
    value: 'inProgress'
  },
  {
    label: 'Completed'
    value: 'completed'
  },
]

const TaskCreationModal = ({ isModalVisible, onRequestClose }) => {
  const Styles = useStyles()
  const toast = useToastController()
  const queryClient = useQueryClient()
  const createTask = useCreateTask({
    onSuccess: (data, variables, context) => {
      toast.show('Created Successfully', {
        burntOptions: {
          haptic: 'success',
          from: 'top',
        },
        native: true,
        duration: 1000,
        notificationOptions: {},
      })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.tasks] })
      setTask({
        description: '',
        status: 'notStarted',
        title: '',
      })
      onRequestClose()
    },
  })
  const [taskError, setTaskError] = useState({
    title: '',
    description: '',
  })

  const { t } = useTranslation()
  const schema = z.object({
    title: z.string().max(25, t('validationError.max25')).min(1, t('validationError.min1')),
    description: z.string().max(50, t('validationError.max50')),
  })
  let dropdownValues: DropdownValuesType = [
    {
      label: 'Not Started',
      value: 'notStarted',
    },
    {
      label: 'In Progress',
      value: 'inProgress',
    },
    {
      label: 'Completed',
      value: 'completed',
    },
  ]
  const [task, setTask] = useState<TaskType>({
    title: '',
    status: 'notStarted',
    description: '',
  })
  const onChangeText = <T extends TaskType, K extends keyof T>(key: K, value: T[K]) => {
    setTask((prev) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }
  const debouncedText = useDebounce(onChangeText, 1000)
  const onCreate = () => {
    try {
      const data = schema.parse(task)
      if (data) {
        setTaskError({
          title: '',
          description: '',
        })
        createTask.mutate({
          url: '/',
          data: task,
        })
      }
    } catch (error) {
      let newError = {
        title: '',
        description: '',
      }
      error.issues.map((singleError) => {
        if (singleError.path[0] === 'title') {
          newError['title'] = singleError.message
        } else if (singleError.path[0] === 'description') {
          newError['description'] = singleError.message
        }
      })
      setTaskError((prev) => newError)
    }
  }
  return (
    <Modal visible={isModalVisible} transparent={true}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
        }}
        onPress={onRequestClose}
      >
        <Pressable
          style={[
            {
              width: '80%',
              padding: 20,
              backgroundColor: '#FFF', // Transparent white background
              borderRadius: 10,
              gap: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: useColorScheme() === 'dark' ? '#FFF' : undefined,
              borderWidth: 1,
            },
            Styles.container,
          ]}
        >
          <Input
            placeholder={t('taskName')}
            style={[styles.textInputStyle]}
            onChangeText={(text) => debouncedText('title', text)}
            defaultValue={task.title}
            {...Styles.inputStyle}
            borderColor={taskError.title ? 'red' : 'white'}
          />
          {taskError.title && <Text color={'red'}>{taskError.title}</Text>}
          <Dropdown
            data={dropdownValues}
            labelField={'label'}
            valueField={'value'}
            onChange={(item) => debouncedText('status', item.value)}
            placeholder={'Select Unit *'}
            search={false}
            value={task.status}
            style={[
              styles.dropdownStyle,
              Styles.container,
              { backgroundColor: useColorScheme() === 'light' ? '#f8f8f8' : undefined },
            ]}
            containerStyle={[{ width: '70%' }, Styles.container]}
            selectedTextStyle={[{ fontSize: 15, fontWeight: '400' }, Styles.textStyle]}
            itemTextStyle={{ color: 'gray' }}
            itemContainerStyle={{}}
          />
          <Input
            placeholder={t('description')}
            style={[
              styles.textInputStyle,
              { height: 100 },
              { borderColor: '#FFF', borderWidth: 10 },
            ]}
            multiline
            onChangeText={(text) => debouncedText('description', text)}
            defaultValue={task.description}
            {...Styles.inputStyle}
            borderColor={taskError.description ? 'red' : 'white'}
          />
          {taskError.description && <Text color={'red'}>{taskError.description}</Text>}
          <Button
            variant="outlined"
            style={[styles.buttonStyle, Styles.buttonStyle]}
            backgroundColor={'black'}
            color={useColorScheme() === 'light' ? 'black' : 'white'}
            children={t('create')}
            onPress={onCreate}
          />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default TaskCreationModal

const styles = StyleSheet.create({
  textInputStyle: {
    width: '100%',
  },
  buttonStyle: {
    width: '40%',
  },
  dropdownStyle: {
    width: '100%',
    alignSelf: 'center',
    borderColor: 'hsl(0,0%,92.0%)',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 9,
    backgroundColor: '#f8f8f8',
  },
})
