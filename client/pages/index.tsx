import { gql } from '@apollo/client';

import { useLoginMutation } from '../generated/graphql';
import LoadingButton from '../components/loadingButton';
import LoginForm from '../components/loginForm';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
      }
    }
  }
`;

export default function Home() {
  const [login, { loading, error }] = useLoginMutation();

  const handleLogin = ({ username, password }) => {
    login({ variables: { input: { username, password } } })
      .catch(() => { });
  };

  return (
    <LoginForm
      error={error}
      handleLogin={handleLogin}
      loading={loading}
    />
  );
}
