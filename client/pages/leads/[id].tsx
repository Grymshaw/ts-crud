import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useLeadQuery } from '../../generated/graphql';

export const LEAD_QUERY = gql`
  query Lead($id: Int!) {
    lead(id: $id) {
      id
      name
      email
      phoneNumber
      website
      notes {
        id
        note
      }
    }
  }
`;

export default function Lead() {
  const router = useRouter();
  const { data, error, loading } = useLeadQuery({
    variables: { id: +router.query.id },
  });

  if (error) {
    router.push('/');
    return <p>Redirecting...</p>;
  }

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>{data.lead.name}</div>
  );
};
