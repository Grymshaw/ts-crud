import { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: theme.spacing(1),
    }
  }))

interface State {
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  note: string;
}

export default function AddLeadForm() {
  const classes = useStyles();
  const [values, setValues] = useState<State>({
    name: '',
    email: '',
    phoneNumber: '',
    website: '',
    note: '',
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl variant="outlined" fullWidth className={classes.input}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <OutlinedInput
          id="name"
          value={values.name}
          onChange={handleChange('name')}
          label="Name"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.input}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          value={values.email}
          onChange={handleChange('email')}
          label="Email"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.input}>
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <OutlinedInput
          id="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange('phoneNumber')}
          label="Phone Number"
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth className={classes.input}>
        <InputLabel htmlFor="website">Website</InputLabel>
        <OutlinedInput
          id="website"
          value={values.website}
          onChange={handleChange('website')}
          label="Website"
        />
      </FormControl>
      <TextField
        fullWidth
        className={classes.input}
        label="Initial Note"
        variant="outlined"
        multiline
        rows={4}
        value={values.note}
        onChange={handleChange('note')}
      />
    </form>
  );
}
