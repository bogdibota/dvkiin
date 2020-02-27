import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent, FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';

import { debounce, deepGet, lett } from '../../../lib';

import FormContext from '../context';
import { DVKComboBoxField, DVKComboBoxFieldValue, PropsWithErrorManagement } from '../domain';

function filterDuplicates(options: DVKComboBoxFieldValue[]): DVKComboBoxFieldValue[] {
  const uniqueSet = new Set<string>();
  return options.filter(option => {
    const key = option.name || option;
    if (uniqueSet.has(key)) return false;
    return !!uniqueSet.add(key);
  });
}

const InputComboBox: FunctionComponent<DVKComboBoxField & PropsWithErrorManagement> = ({
                                                                                         name,
                                                                                         label,
                                                                                         type,

                                                                                         required = false,
                                                                                         autoFocus = false,
                                                                                         disabled = false,
                                                                                         multiple = false,
                                                                                         options: staticOptions,
                                                                                         search,
                                                                                         renderOption = opt => opt.label || opt,

                                                                                         hasError,
                                                                                         message,
                                                                                       }) => {
  const { obj, updateProperty } = useContext(FormContext);
  const [ open, setOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const [ options, setOptions ] = useState<DVKComboBoxFieldValue[]>(staticOptions || []);
  const debouncedSearch = useMemo(() => search && debounce((input, callback) => {
    search(input).then(callback);
  }, 200), [ search ]);

  const getOptionSelected = (option: DVKComboBoxFieldValue, value: DVKComboBoxFieldValue) => option.name ? option.name === value.name : option === value;

  const multipleValue = (lett(
    deepGet(obj, name, null),
    (names: string[]) => options.filter(opt => names.includes(opt.name || opt)),
  ) || []);
  const simpleValue = (lett(
    deepGet(obj, name, null),
    name => options.find(opt => name === (opt.name || opt)),
  ) || null);

  useEffect(() => {
    let active = true;

    if (!debouncedSearch) {
      return undefined;
    }

    setLoading(true);
    debouncedSearch(inputValue, (results: DVKComboBoxFieldValue[]) => {
      setLoading(false);
      if (active) {
        setOptions(multiple
          ? (oldOptions) => filterDuplicates([
            ...oldOptions.filter(option => !!multipleValue.find(value => getOptionSelected(option, value))),
            ...results,
          ])
          : results,
        );
      }
    });

    return () => {
      active = false;
    };
  }, [ staticOptions, inputValue, debouncedSearch, setLoading ]);

  return <FormControl
    disabled={ disabled }
    error={ hasError }
    required={ required }
    fullWidth
    margin="dense"
  >
    <Autocomplete
      value={ multiple ? multipleValue : simpleValue }
      onChange={ (_: ChangeEvent, newValue: DVKComboBoxFieldValue | null | DVKComboBoxFieldValue[]) => {
        updateProperty(name, type)(
          multiple ? newValue.map((value: DVKComboBoxFieldValue) => value.name || value) : newValue,
        );
      } }
      open={ open }
      multiple={ multiple }
      disabled={ disabled }
      onOpen={ () => setOpen(true) }
      onClose={ () => {
        setOpen(false);
        setInputValue('');
      } }
      options={ options }
      getOptionSelected={ getOptionSelected }
      getOptionLabel={ (option) => option.label || option }
      inputValue={ multiple ? inputValue : undefined }
      renderOption={ renderOption }
      renderInput={ params => <TextField
        { ...params }
        onChange={ (event) => setInputValue(event.target.value) }
        name={ name }
        label={ label + (required ? ' *' : '') }
        margin="dense"
        fullWidth
        autoFocus={ autoFocus }
        error={ hasError }
        helperText={ message }
        InputProps={ {
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              { search && loading && open ? <CircularProgress color="inherit" size={ 20 }/> : null }
              { params.InputProps.endAdornment }
            </React.Fragment>
          ),
        } }
      /> }
    />
  </FormControl>;
};

export default InputComboBox;
