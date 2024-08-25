import { Button, View } from '@my/ui'
import { SafeAreaViewWrapper, TaskCreationModal } from '../Components'
import { CardModel, ColumnModel, KanbanBoard } from '@intechnity/react-native-kanban-board'
import { useTranslation } from 'react-i18next'
import { useTasks, useUpdateTask } from '../Query/Tasks/tasks'
import { ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { Tag } from '@intechnity/react-native-kanban-board/lib/typescript/models/tag'

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
  const updateTask = useUpdateTask()
  const columns = [
    new ColumnModel('notStarted', 'Not Started', 1),
    new ColumnModel('inProgress', 'In Progress', 2),
    new ColumnModel('completed', 'Completed', 3),
  ]
  const tagCreation = (status: TaskType['status']): Tag => {
    if (status === 'notStarted') {
      return {
        backgroundColor: 'red',
        textColor: 'white',
        text: 'Not started',
      }
    } else if (status === 'inProgress') {
      return {
        backgroundColor: 'purple',
        textColor: 'white',
        text: 'In Progress',
      }
    } else {
      return {
        backgroundColor: 'green',
        textColor: 'white',
        text: 'Completed',
      }
    }
  }
  const cards = tasks.data?.map(
    (singleData, index) =>
      new CardModel(
        singleData.id,
        singleData.status,
        singleData.title,
        '',
        singleData.description,
        [tagCreation(singleData.status)],
        null,
        index
      )
  )
  const onCardDragEnd = (
    srcColumn: ColumnModel,
    destColumn: ColumnModel,
    item: CardModel,
    targetIdx: number
  ) => {
    // Handle card drag and drop
    if (srcColumn.id !== destColumn.id) {
      const data = tasks.data?.find((singleData) => singleData.id === item.id)
      if (data) {
        updateTask.mutate({
          url: `/${item.id}`,
          data: {
            id: data.id,
            createdAt: data.createdAt,
            description: data.description,
            title: data.title,
            status: destColumn.id as TaskType['status'],
          },
        })
      }
    }
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
          cards={cards || []}
          onDragEnd={onCardDragEnd}
          onCardPress={onCardPress}
          style={{}}
          cardContentTextStyle={{
            color: '#000',
            fontSize: 10,
          }}
        />
      )}
      <TaskCreationModal isModalVisible={isModalVisible} onRequestClose={onRequestClose} />
    </SafeAreaViewWrapper>
  )
}
