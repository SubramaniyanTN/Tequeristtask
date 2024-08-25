import { Button, debounce, Input, View } from '@my/ui'
import { TaskType } from 'apps/expo/app'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Pressable, StyleSheet } from 'react-native'

const TaskCreationModal = ({ isModalVisible, onRequestClose }) => {
  const { t } = useTranslation()
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
  const debouncedText = debounce(onChangeText)
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
        <View
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
          />
        </View>
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
})
