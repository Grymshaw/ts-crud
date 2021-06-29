import { gql } from '@apollo/client';
import { useLoginMutation } from '../generated/graphql';

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

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return (
      <div>Error logging in.</div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => login({ variables: { input: { username: 'test', password: 'test' } } })}
    >
      Login
    </button>
  );
}
