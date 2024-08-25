import { Button, Input, Text, View, useToastController, debounce } from '@my/ui'
import { SafeAreaViewWrapper } from '../Components'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { CardModel, ColumnModel, KanbanBoard } from '@intechnity/react-native-kanban-board'
import { useTranslation } from 'react-i18next'
import { useTasks } from '../Query/Tasks/tasks'
import { ActivityIndicator, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { taskValidation } from '../Validation'

enum BOARD_VALUES {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  completed = 'completed',
}

export type TaskType = {
  title: string
  status: BOARD_VALUES
  description: string
}
export type TaskErrorType = {
  title: string
  status: string
  description: string
}

export default function Screen() {
  const { t } = useTranslation()
  const [task, setTask] = useState<TaskType>({
    title: '',
    status: BOARD_VALUES.inProgress,
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
  const tasks = useTasks()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const columns = [
    new ColumnModel(BOARD_VALUES.notStarted, 'Not Started', 1),
    new ColumnModel(BOARD_VALUES.inProgress, 'In Progress', 2),
    new ColumnModel(BOARD_VALUES.completed, 'Completed', 3),
  ]

  const cards = [
    new CardModel(
      'card1',
      BOARD_VALUES.notStarted,
      '1st Card',
      'Example card',
      'test description',
      [
        {
          text: 'Tag1',
          backgroundColor: '#00FF00',
          textColor: '#000000',
        },
      ],
      null,
      1
    ),
    new CardModel(
      'Card2',
      BOARD_VALUES.notStarted,
      '2st Card',
      'Example card',
      'test description',
      [
        {
          text: 'Tag1',
          backgroundColor: '#00FF00',
          textColor: '#000000',
        },
      ],
      null,
      1
    ),
  ]
  const onCardDragEnd = (
    srcColumn: ColumnModel,
    destColumn: ColumnModel,
    item: CardModel,
    targetIdx: number
  ) => {
    // Handle card drag and drop
    console.log('On card drag end', { srcColumn, destColumn, item, targetIdx })
  }

  const onCardPress = (item: CardModel) => {
    // Handle card press
    console.log({ item })
  }
  const onPress = () => {
    setIsModalVisible(true)
  }
  const onRequestClose = () => {
    setIsModalVisible(false)
  }
  return (
    <SafeAreaViewWrapper>
      <View
        style={{
          display: 'flex',
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Button
          onPress={onPress}
          variant="outlined"
          style={{ width: '45%', backgroundColor: '#FFFFFF' }}
          children={t('createTask')}
        />
      </View>
      {tasks.isLoading ? (
        <ActivityIndicator color={'#000'} />
      ) : (
        <KanbanBoard
          columns={columns}
          cards={cards}
          onDragEnd={onCardDragEnd}
          onCardPress={onCardPress}
          style={{}}
        />
      )}
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
    </SafeAreaViewWrapper>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: '100%',
  },
  buttonStyle: {
    width: '40%',
  },
})
