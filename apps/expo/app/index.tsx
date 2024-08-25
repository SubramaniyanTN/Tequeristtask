import { Button, View } from '@my/ui'
import { SafeAreaViewWrapper } from '../Components'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { CardModel, ColumnModel, KanbanBoard } from '@intechnity/react-native-kanban-board'
import { useTranslation } from 'react-i18next'

enum BOARD_VALUES {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  completed = 'completed',
}

export default function Screen() {
  const { t } = useTranslation()
  const gesture = Gesture.Pan()
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
    // ... add more cards ...
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
  const onPress = () => {}
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
          children={t('create')}
        />
      </View>
      <GestureDetector gesture={gesture}>
        <KanbanBoard
          columns={columns}
          cards={cards}
          onDragEnd={onCardDragEnd}
          onCardPress={onCardPress}
          style={{}}
        />
      </GestureDetector>
    </SafeAreaViewWrapper>
  )
}
