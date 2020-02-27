import { DVKComboBoxFieldValue, DVKForm, DVKObject } from '@dvkiin/material-commons';
import { Grid, Paper, Typography } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';

import { wait } from '../lib';
import useStyles from '../styles';

async function fakeApiCall(search: string): Promise<string[]> {
  await wait(2e3);
  return [
    'Option 1',
    'Option 2',
    'Country 1',
    'Country 2',
  ].filter(it => it.toLowerCase().indexOf(search.toLowerCase()) > -1);
}

async function fakeApiCallWithObjects(search: string): Promise<DVKComboBoxFieldValue[]> {
  await wait(2e3);
  return [
    { name: 'opt1', label: 'Option 1' },
    { name: 'opt2', label: 'Option 2' },
    { name: 'country1', label: 'Country 1' },
    { name: 'country2', label: 'Country 2' },
  ].filter(it => it.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
}

const ComboBoxSection: FC = () => {
  const { card, pre } = useStyles();

  const [ submittedDefaultedAC, submitDefaultedAC ] = useState<DVKObject>();
  const [ changedDefaultedAC, changeDefaultedAC ] = useState<DVKObject>();
  const [ submittedDefaultedMultiple, submitDefaultedMultiple ] = useState<DVKObject>();
  const [ changedDefaultedMultiple, changeDefaultedMultiple ] = useState<DVKObject>();
  const [ submittedDefaultedModifiers, submitDefaultedModifiers ] = useState<DVKObject>();
  const [ changedDefaultedModifiers, changeDefaultedModifiers ] = useState<DVKObject>();

  const defaultValueAC = useMemo(() => ({
    'preselected-simple': 'Option 1',
    'preselected-object': 'opt2',
    'preselected-simple-async': 'Option 1',
    'preselected-object-async': 'opt2',
  }), []);

  const defaultValueMultiple = useMemo(() => ({
    'preselected-simple': [ 'Option 1' ],
    'preselected-object': [ 'opt2' ],
    'preselected-simple-async': [ 'Option 1' ],
    'preselected-object-async': [ 'opt2' ],
  }), []);

  return <Grid container wrap="wrap">
    <Paper className={ card }>
      <Typography>Form with one option autocomplete</Typography>
      <DVKForm
        fields={ [
          {
            name: 'simple',
            label: 'With static strings',
            type: 'combo-box',
            options: [ 'Option 1', 'Option 2' ],
          },
          {
            name: 'object',
            label: 'With static objects',
            type: 'combo-box',
            options: [ { name: 'opt1', label: 'Option 1' }, { name: 'opt2', label: 'Option 2' } ],
          },
          {
            name: 'preselected-simple',
            label: 'Preselected with static strings',
            type: 'combo-box',
            options: [ 'Option 1', 'Option 2' ],
          },
          {
            name: 'preselected-object',
            label: 'Preselected with static objects',
            type: 'combo-box',
            options: [ { name: 'opt1', label: 'Option 1' }, { name: 'opt2', label: 'Option 2' } ],
          },
          {
            name: 'simple-async',
            label: 'With async strings',
            type: 'combo-box',
            search: fakeApiCall,
          },
          {
            name: 'object-async',
            label: 'With async objects',
            type: 'combo-box',
            search: fakeApiCallWithObjects,
          },
          {
            name: 'preselected-simple-async',
            label: 'Preselected with async strings',
            type: 'combo-box',
            options: [ 'Option 1' ],
            search: fakeApiCall,
          },
          {
            name: 'preselected-object-async',
            label: 'Preselected with async objects',
            type: 'combo-box',
            options: [ { name: 'opt2', label: 'Option 2' } ],
            search: fakeApiCallWithObjects,
          },
        ] }
        defaultValue={ defaultValueAC }
        invalidFields={ null }
        onSubmit={ submitDefaultedAC }
        onChange={ changeDefaultedAC }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Form with one option autocomplete</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedDefaultedAC) }</pre>
      <br/>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedDefaultedAC) }</pre>
    </Paper>

    <Paper className={ card }>
      <Typography>Form with multiple option autocomplete</Typography>
      <DVKForm
        fields={ [
          {
            name: 'simple',
            label: 'With static strings',
            type: 'combo-box',
            multiple: true,
            options: [ 'Option 1', 'Option 2' ],
          },
          {
            name: 'object',
            label: 'With static objects',
            type: 'combo-box',
            multiple: true,
            options: [ { name: 'opt1', label: 'Option 1' }, { name: 'opt2', label: 'Option 2' } ],
          },
          {
            name: 'preselected-simple',
            label: 'Preselected with static strings',
            type: 'combo-box',
            multiple: true,
            options: [ 'Option 1', 'Option 2' ],
          },
          {
            name: 'preselected-object',
            label: 'Preselected with static objects',
            type: 'combo-box',
            multiple: true,
            options: [ { name: 'opt1', label: 'Option 1' }, { name: 'opt2', label: 'Option 2' } ],
          },
          {
            name: 'simple-async',
            label: 'With async strings',
            type: 'combo-box',
            multiple: true,
            search: fakeApiCall,
          },
          {
            name: 'object-async',
            label: 'With async objects',
            type: 'combo-box',
            multiple: true,
            search: fakeApiCallWithObjects,
          },
          {
            name: 'preselected-simple-async',
            label: 'Preselected with async strings',
            type: 'combo-box',
            multiple: true,
            options: [ 'Option 1' ],
            search: fakeApiCall,
          },
          {
            name: 'preselected-object-async',
            label: 'Preselected with async objects',
            type: 'combo-box',
            multiple: true,
            options: [ { name: 'opt2', label: 'Option 2' } ],
            search: fakeApiCallWithObjects,
          },
        ] }
        defaultValue={ defaultValueMultiple }
        invalidFields={ null }
        onSubmit={ submitDefaultedMultiple }
        onChange={ changeDefaultedMultiple }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Form with multiple option autocomplete</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedDefaultedMultiple) }</pre>
      <br/>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedDefaultedMultiple) }</pre>
    </Paper>

    <Paper className={ card }>
      <Typography>Modifiers</Typography>
      <DVKForm
        fields={ [
          {
            name: 'disabled',
            label: 'Disabled',
            type: 'combo-box',
            disabled: true,
            options: [ 'Option 1', 'Option 2' ],
          },
          {
            name: 'required',
            label: 'Required',
            type: 'combo-box',
            required: true,
            options: [ 'Option 1', 'Option 2' ],
          },
          {
            name: 'required-multiple',
            label: 'Required multiple',
            type: 'combo-box',
            required: true,
            multiple: true,
            options: [ 'Option 1', 'Option 2' ],
          },
        ] }
        invalidFields={ null }
        onSubmit={ submitDefaultedModifiers }
        onChange={ changeDefaultedModifiers }
      />
    </Paper>

    <Paper className={ card }>
      <Typography>Modifiers</Typography>
      <Typography>Submitted value</Typography>
      <pre className={ pre }>{ JSON.stringify(submittedDefaultedModifiers) }</pre>
      <br/>
      <Typography>Changed value</Typography>
      <pre className={ pre }>{ JSON.stringify(changedDefaultedModifiers) }</pre>
    </Paper>
  </Grid>;
};

export default ComboBoxSection;
