import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

import Playground from './Playground';
import ComboBoxSection from './sections/ComboBox';
import FormSection from './sections/Form';
import ListFieldSection from './sections/ListField';
import ModalSection from './sections/Modal';
import TableSection from './sections/Table';

const App: FC = () => {
  return <>
    <Typography variant="h4">Playground</Typography>
    <Playground/>

    <Typography variant="h4">ListField section</Typography>
    <ListFieldSection/>

    <Typography variant="h4">ComboBox section</Typography>
    <ComboBoxSection/>

    <Typography variant="h4">Table section</Typography>
    <TableSection/>

    <Typography variant="h4">Modal section</Typography>
    <ModalSection/>

    <Typography variant="h4">Form section</Typography>
    <FormSection/>
  </>;
};

export default App;
