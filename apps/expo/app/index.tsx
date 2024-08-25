import { Button, Input, View, debounce } from '@my/ui'
import { SafeAreaViewWrapper, TaskCreationModal } from '../Components'
import { CardModel, ColumnModel, KanbanBoard } from '@intechnity/react-native-kanban-board'
import { useTranslation } from 'react-i18next'
import { useTasks } from '../Query/Tasks/tasks'
import { ActivityIndicator, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'

export type TaskType = {
  title: string
  status: 'notStarted' | 'inProgress' | 'completed'
  description: string
}
export type TaskErrorType = {
  title: string
  status: string
  description: string
}

export default function Screen() {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const tasks = useTasks()
  const columns = [
    new ColumnModel('notStarted', 'Not Started', 1),
    new ColumnModel('inProgress', 'In Progress', 2),
    new ColumnModel('completed', 'Completed', 3),
  ]

  const cards = [
    new CardModel(
      'card1',
      'notStarted',
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
      'notStarted',
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
      <TaskCreationModal isModalVisible={isModalVisible} onRequestClose={onRequestClose} />
    </SafeAreaViewWrapper>
  )
}
