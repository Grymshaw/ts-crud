import { useState } from 'react';
import { Container, Link, TextField, Typography } from '@material-ui/core';

import LoadingButton from '../loadingButton';

const LoginForm = ({ error, handleLogin, loading, goToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const errorMessage = error
    ? 'Incorrect username or password.'
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
      <LoadingButton
        loading={loading}
        color="primary"
        style={{ width: '100%' }}
        onClick={() => handleLogin({ password, username })}
      >
        Login
      </LoadingButton>
      <Typography align="center" variant="subtitle2">
        Don&apos;t have an account?&nbsp;
        <Link href="#" onClick={goToSignup}>
          Signup
        </Link>
      </Typography>
    </Container>
  )
};

export default LoginForm;