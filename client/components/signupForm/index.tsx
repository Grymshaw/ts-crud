import { useState } from 'react';
import { Container, Link, TextField, Typography } from '@material-ui/core';

import LoadingButton from '../loadingButton';

const SignupForm = ({ error, handleSignup, loading, goToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


  const errorMessage = error
    ? 'Error signing up. Username may be taken.'
    : null;

  return (
    <Container maxWidth="sm">
      <TextField
        label="Username"
        value={username}
        error={!!error}
        helperText={errorMessage}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%' }}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        error={!!error}
        helperText={errorMessage}
        style={{ width: '100%' }}
      />
      <TextField
        label="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        error={!!error}
        helperText={errorMessage}
        style={{ width: '100%' }}
      />
      <LoadingButton
        loading={loading}
        color="primary"
        style={{ width: '100%' }}
        onClick={() => handleSignup({ password, passwordConfirm, username })}
      >
        Signup
      </LoadingButton>
      <Typography align="center" variant="subtitle2">
        Already have an account?&nbsp;
        <Link href="#" onClick={goToLogin}>
          Login
        </Link>
      </Typography>
    </Container>
  );
};

export default SignupForm;
