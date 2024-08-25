import { Button, Input, useDebounce, useToastController } from '@my/ui'
import { useQueryClient } from '@tanstack/react-query'
import { TaskType } from 'apps/expo/app'
import { QUERY_KEY } from 'apps/expo/Query/QUERY_KEY'
import { useCreateTask } from 'apps/expo/Query/Tasks/tasks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Pressable, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

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

  const { t } = useTranslation()
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
    createTask.mutate({
      url: '/',
      data: task,
    })
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
          style={{
            width: '80%',
            padding: 20,
            backgroundColor: '#FFF', // Transparent white background
            borderRadius: 10,
            gap: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Input
            placeholder={t('taskName')}
            style={[styles.textInputStyle]}
            onChangeText={(text) => debouncedText('title', text)}
            defaultValue={task.title}
          />
          <Dropdown
            data={dropdownValues}
            labelField={'label'}
            valueField={'value'}
            onChange={(item) => debouncedText('status', item.value)}
            placeholder={'Select Unit *'}
            search={false}
            value={task.status}
            style={styles.dropdownStyle}
            containerStyle={{ width: '70%', backgroundColor: '#f8f8f8' }}
            selectedTextStyle={{ fontSize: 15, color: '#000', fontWeight: '400' }}
            itemTextStyle={{ color: 'gray' }}
          />
          <Input
            placeholder={t('description')}
            style={[styles.textInputStyle, { height: 100 }]}
            multiline
            onChangeText={(text) => debouncedText('description', text)}
            defaultValue={task.description}
          />
          <Button
            style={styles.buttonStyle}
            backgroundColor={'black'}
            color={'white'}
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
