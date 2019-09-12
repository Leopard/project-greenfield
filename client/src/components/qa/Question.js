import React, { Fragment } from 'react';
import Answers from './Answers';
import AnswerForm from './AnswerForm';

import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  smallbutton: {
    margin: theme.spacing(1),
    'border-radius': 0,
    padding: '15px'
  },
  smallbutton: {
    margin: theme.spacing(1),
    'border-radius': 0,
    padding: '15px'
  },
  input: {
    display: 'none'
  }
}));

const Question = props => {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <Fragment>
      <Grid container justify='space-between' alignItems='flex-start'>
        <Grid item lg={9} md={9} sm={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant='h6'>Q: </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h6'>
                {props.question.question_body}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems='flex-start'>
            <Grid item>
              <Typography variant='h6'>A: </Typography>
            </Grid>
            <Grid item>
              <Answers question_id={props.question.question_id} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
          <Grid
            container
            direction='row'
            justify='flex-end'
            alignItems='center'>
            <Button
              disabled={disabled}
              onClick={() => {
                props.voteQ(props.question.question_id);
                setDisabled(!disabled);
              }}>
              Helpful? ({props.question.question_helpfulness})
            </Button>
            <Typography component='h4'> | </Typography>
            <AnswerForm
              question={props.question.question_body}
              question_id={props.question.question_id}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Question;
