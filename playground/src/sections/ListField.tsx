import { DVKForm, DVKObject, InputModal } from '@dvkiin/material-commons';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';

import useStyles from '../styles';

const ListFieldSection: FC = () => {
  const { card, pre } = useStyles();

  const [ submittedDefaulted, submitDefaulted ] = useState<DVKObject>();
  const [ changedDefaulted, changeDefaulted ] = useState<DVKObject>();

  return <Grid container wrap="wrap">
    <Paper className={ card }>
      <Typography>Form with ListField</Typography>
      <DVKForm
        fields={ [
          {
            name: 'attributes.nested', label: 'Attributes', type: 'list', fields: [
              { name: 'name', label: 'Name', type: 'text', required: true, autoFocus: true },
              {
                name: 'type', label: 'Type', type: 'select', required: true,
                values: [
                  { name: 'NUMBER', label: 'Number' },
                  { name: 'TEXT', label: 'Text' },
                ],
              },
              { name: 'unit', label: 'Measuring unit', type: 'text' },
            ],
            newLabel: 'custom text here',
            accordionProps: {
              defaultExpanded: false
            }
          },
        ] }
        invalidFields={ null }
        onSubmit={ submitDefaulted }
        onChange={ changeDefaulted }
        InputModal={ InputModal }
        renderActions={ () => <>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </> }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>ListField</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedDefaulted) }</pre>
      <br/>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedDefaulted) }</pre>
    </Paper>
  </Grid>;
};

export default ListFieldSection;
