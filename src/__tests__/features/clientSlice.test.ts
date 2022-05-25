import reducer, { addClient, removeRoute } from '@/features/clients/clientSlice'

test('should return the initial state', () => {
  // @ts-ignore
  expect(reducer(undefined, [])).toEqual([])
})

const client = [
  {
    clients: [
      {
        routes: [{ lng: '-95.71821212768555', lat: '37.091882969168644' }],
        name: 'hi',
        id: 'Yd-wOkjci6lDAV5lq9C1U'
      }
    ]
  }
]

test('shuld handle client beign added to an list', () => {
  expect(
    reducer(
      [],
      addClient([
        {
          // @ts-ignore

          clients: [
            {
              routes: [
                { lng: '-95.71821212768555', lat: '37.091882969168644' }
              ],
              name: 'hi',
              id: 'Yd-wOkjci6lDAV5lq9C1U'
            }
          ]
        }
      ])
    )
  ).toEqual([
    {
      clients: [
        {
          routes: [{ lng: '-95.71821212768555', lat: '37.091882969168644' }],
          name: 'hi',
          id: 'Yd-wOkjci6lDAV5lq9C1U'
        }
      ]
    }
  ])
})

test('shuld handle remove client to an list', () => {
  // @ts-ignore
  expect(reducer(client, removeRoute({ id: client.id }))).toEqual([])
})
