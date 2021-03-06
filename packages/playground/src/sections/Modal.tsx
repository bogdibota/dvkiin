import {
  ConfirmationModal,
  ErrorModal,
  FlexExpander,
  InfoModal,
  InputModal,
  SuccessSnackbar,
  useIncrementalKey,
  useModal,
} from '@dvkiin/material-commons';
import { Button, Divider, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useRef, useState } from 'react';

import useStyles from '../styles';

export default function ModalSection() {
  const { container, card, verticalCenter, gutterRight } = useStyles();

  const {
    isOpen: isInputModalOpen,
    open: openInputModal,
    close: closeInputModal,
  } = useModal();
  const {
    isOpen: isCustomInputModalOpen,
    open: openCustomInputModal,
    close: closeCustomInputModal,
  } = useModal();
  const {
    isOpen: isInfoModalOpen,
    open: openInfoModal,
    close: closeInfoModal,
  } = useModal();
  const {
    isOpen: isComplexInfoModalOpen,
    open: openComplexInfoModal,
    close: closeComplexInfoModal,
  } = useModal();
  const {
    isOpen: isConfirmationModalOpen,
    open: openConfirmationModal,
    close: closeConfirmationModal,
  } = useModal();
  const {
    isOpen: isComplexConfirmationModalOpen,
    open: openComplexConfirmationModal,
    close: closeComplexConfirmationModal,
  } = useModal();

  const [error, setError] = useState<any>(undefined);
  const [error2, setError2] = useState<any>(undefined);

  const [snackbarKey, triggerSnackbar] = useIncrementalKey();
  const snackbarRef = useRef<SuccessSnackbar>(null);

  console.log('Render called');

  useEffect(() => {
    console.log('I wanna be called once');
  }, [openInfoModal]);

  return (
    <div className={container}>
      <Paper className={card}>
        <Typography>Input modal</Typography>
        <Button color="primary" onClick={openInputModal}>
          Show input modal
        </Button>
        <InputModal
          open={isInputModalOpen}
          title="Input modal example"
          fields={[
            {
              name: 'id',
              label: 'numeric id',
              type: 'number',
              autoFocus: true,
            },
            { name: 'name', label: 'string name', type: 'text' },
            { name: 'email', label: 'string email', type: 'email' },
          ]}
          onClose={closeInputModal}
          onCreate={console.log}
          bottomContent={<>Content below</>}
        >
          Content above
        </InputModal>
      </Paper>

      <Paper className={card}>
        <Typography>Custom Input Modal</Typography>
        <Button color="primary" onClick={openCustomInputModal}>
          Show custom input modal
        </Button>
        <InputModal
          open={isCustomInputModalOpen}
          title="Custom input modal example"
          fields={[
            {
              name: 'id',
              label: 'numeric id',
              type: 'number',
              autoFocus: true,
            },
            { name: 'name', label: 'string name', type: 'text' },
            { name: 'email', label: 'string email', type: 'email' },
            {
              name: 'contact',
              label: 'contact',
              type: 'list',
              fields: [
                { name: 'type', label: 'type', type: 'text', required: true },
                { name: 'value', label: 'value', type: 'text' },
              ],
            },
          ]}
          renderActions={(formId: string) => (
            <>
              <Button onClick={closeCustomInputModal}>Cancel</Button>
              <FlexExpander />
              <Button color="primary">preview</Button>
              <Button color="primary" type="submit" form={formId}>
                create
              </Button>
            </>
          )}
          onClose={closeCustomInputModal}
          onCreate={console.log}
        />
      </Paper>

      <Paper className={card}>
        <Typography>Info modal</Typography>
        <Button onClick={openInfoModal}>Show info modal</Button>
        <InfoModal
          message="i am message"
          title="i am title"
          onClose={closeInfoModal}
          open={isInfoModalOpen}
        />
        <Divider />
        <Button onClick={openComplexInfoModal}>Show complex info modal</Button>
        <InfoModal
          message={
            <>
              <Typography variant="h4">important part</Typography>
              <Typography>complex explanation</Typography>
              <Typography variant="caption">not very important part</Typography>
            </>
          }
          title={
            <>
              Very <strong>important</strong> information here!
            </>
          }
          onClose={closeComplexInfoModal}
          open={isComplexInfoModalOpen}
        />
      </Paper>

      <Paper className={card}>
        <Typography>Error modal</Typography>
        <Button onClick={setError}>Show error modal</Button>
        <ErrorModal message="i am error" error={error} />
        <Divider />
        <Button onClick={setError2}>Show complex error modal</Button>
        <ErrorModal
          message={
            <>
              <p>first paragraph</p>
              <p style={{ color: 'rebeccapurple' }}>second red paragraph</p>
            </>
          }
          error={error2}
        />
      </Paper>

      <Paper className={card}>
        <Typography>Confirmation modal</Typography>
        <Button onClick={openConfirmationModal}>Show confirmation modal</Button>
        <ConfirmationModal
          message="are you sure?"
          title="plz confirm"
          open={isConfirmationModalOpen}
          onAccept={() => {
            closeConfirmationModal();
            alert('confirmed');
          }}
          onCancel={closeConfirmationModal}
        />
        <Divider />
        <Button onClick={openComplexConfirmationModal}>
          Show complex confirmation modal
        </Button>
        <ConfirmationModal
          message="are you sure?"
          title="plz confirm"
          open={isComplexConfirmationModalOpen}
          onAccept={() => {
            closeComplexConfirmationModal();
            alert('confirmed');
          }}
          onCancel={closeComplexConfirmationModal}
        >
          <p>more details here</p>
          <p style={{ color: 'red' }}>more red details here</p>
        </ConfirmationModal>
      </Paper>

      <Paper className={card}>
        <Typography>Snackbar</Typography>
        <Button color="primary" onClick={triggerSnackbar}>
          Show success snackbar
        </Button>
        {(snackbarKey && (
          <SuccessSnackbar
            key={snackbarKey}
            ref={snackbarRef}
            message={
              <Typography variant="subtitle1" className={verticalCenter}>
                <AddIcon className={gutterRight} />
                Le magic snackbar
              </Typography>
            }
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => snackbarRef.current?.handleClose()}
              >
                Close me
              </Button>
            }
          />
        )) ||
          null}
      </Paper>
    </div>
  );
}
