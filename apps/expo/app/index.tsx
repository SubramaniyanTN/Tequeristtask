import { Button, View } from '@my/ui'
import { SafeAreaViewWrapper, TaskCreationModal } from '../Components'
import { CardModel, ColumnModel, KanbanBoard } from '@intechnity/react-native-kanban-board'
import { useTranslation } from 'react-i18next'
import { useTasks, useUpdateTask } from '../Query/Tasks/tasks'
import { ActivityIndicator, Modal } from 'react-native'
import { useCallback, useState, useRef } from 'react'
import { Tag } from '@intechnity/react-native-kanban-board/lib/typescript/models/tag'
import { useStyles } from '../Utils'

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
  const Styles = useStyles()
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const tasks = useTasks()
  const updateTask = useUpdateTask()

  const draggingRef = useRef(false)

  const [columns, setColumns] = useState([
    new ColumnModel('notStarted', t('notStarted'), 1),
    new ColumnModel('inProgress', t('inProgress'), 2),
    new ColumnModel('completed', t('completed'), 3),
  ])

  const tagCreation = (status: TaskType['status']): Tag => {
    if (status === 'notStarted') {
      return {
        backgroundColor: 'red',
        textColor: 'white',
        text: t('notStarted'),
      }
    } else if (status === 'inProgress') {
      return {
        backgroundColor: 'purple',
        textColor: 'white',
        text: t('inProgress'),
      }
    } else {
      return {
        backgroundColor: 'green',
        textColor: 'white',
        text: t('completed'),
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

  const onCardDragEnd = useCallback(
    (srcColumn: ColumnModel, destColumn: ColumnModel, item: CardModel, targetIdx: number) => {
      if (srcColumn.id !== destColumn.id && !draggingRef.current) {
        draggingRef.current = true
        const data = tasks.data?.find((singleData) => singleData.id === item.id)
        if (data) {
          updateTask.mutate(
            {
              url: `/${item.id}`,
              data: {
                id: data.id,
                createdAt: data.createdAt,
                description: data.description,
                title: data.title,
                status: destColumn.id as TaskType['status'],
              },
            },
            {
              onSuccess: () => {
                draggingRef.current = false
              },
              onError: () => {
                draggingRef.current = false
              },
            }
          )
        } else {
          draggingRef.current = false
        }
      }
    },
    [tasks.data, updateTask]
  )

  const onCardPress = useCallback((item: CardModel) => {
    console.log({ item })
  }, [])

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
          style={[{ width: '45%' }, Styles.buttonStyle]}
          children={t('createTask')}
          color={Styles.muitextStyle.color}
        />
      </View>
      {tasks.isLoading ? (
        <ActivityIndicator color={Styles.textStyle.color} />
      ) : (
        <KanbanBoard
          columns={columns}
          cards={cards || []}
          onDragEnd={onCardDragEnd}
          onCardPress={onCardPress}
          style={{ backgroundColor: '#000' }}
          cardContentTextStyle={{
            color: '#000',
            fontSize: 10,
          }}
        />
      )}
      <Modal style={{ flex: 1 }} transparent visible={updateTask.isPending}>
        <View
          style={[
            {
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              opacity: 0.4,
            },
            Styles.container,
          ]}
        >
          <ActivityIndicator color={Styles.textStyle.color} />
        </View>
      </Modal>
      <TaskCreationModal isModalVisible={isModalVisible} onRequestClose={onRequestClose} />
    </SafeAreaViewWrapper>
  )
}
