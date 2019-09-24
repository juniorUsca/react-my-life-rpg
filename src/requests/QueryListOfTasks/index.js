import gql from 'graphql-tag'

const GET_TASKS = gql`
subscription {
  task {
    id
    title
    start_at
    end_at
    project {
      title
    }
    time_trackings {
      start_at
      end_at
      note
    }
  }
}
`

export default GET_TASKS
