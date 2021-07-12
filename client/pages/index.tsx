import { gql } from '@apollo/client';
import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useLoginMutation, useSignupMutation } from '../generated/graphql';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signupForm';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        id
      }
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [login, { loading: loginLoading, error: loginError }] = useLoginMutation();
  const [signup, { loading: signupLoading, error: signupError }] = useSignupMutation();

  const handleLogin = ({ username, password }) => {
    login({ variables: { input: { username, password } } })
      .then(() => router.push('/leads'))
      .catch(() => { }); // error is handled by mutation hook
  };

  const handleSignup = ({ username, password, passwordConfirm }) => {
    signup({ variables: { input: { username, password, passwordConfirm } } })
      .then(() => router.push('/leads'))
      .catch(() => { }); // error is handled by mutation hook
  }

  return (
    <Container>
      {isLogin
        ? (
          <LoginForm
            error={loginError}
            handleLogin={handleLogin}
            loading={loginLoading}
            goToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            handleSignup={handleSignup}
            error={signupError}
            loading={signupLoading}
            goToLogin={() => setIsLogin(true)}
          />
        )
      }
    </Container>
  );
}
