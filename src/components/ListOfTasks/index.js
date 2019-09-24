import React from 'react'
import { useSubscription } from '@apollo/react-hooks'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import GET_TASKS from '../../requests/QueryListOfTasks'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const ListOfTasks = () => {
  /*
  const { loading, error, data } = useQuery(GET_TASKS)
  */

  const classes = useStyles();

  const { loading, error, data } = useSubscription(GET_TASKS);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  console.log(data, '')


  return (
    <>
      <Button variant="contained" className={classes.button}>
        Default
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="contained" color="secondary" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons" className={classes.button}>
        Link
      </Button>
      {data.task.map((task) => (
        <div key={task.id}>
          {task.title}
        </div>
      ))}
    </>
  )
}

export default ListOfTasks
