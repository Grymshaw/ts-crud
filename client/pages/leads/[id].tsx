import { gql } from '@apollo/client';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useLeadQuery } from '../../generated/graphql';
import { withRefreshToken } from '../../lib/auth';

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

function Lead({ id }: { id: number }) {
  const router = useRouter();
  const { data, error, loading } = useLeadQuery({
    variables: { id: id || +router.query.id },
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

const LeadWithRefreshToken = withRefreshToken(Lead);

LeadWithRefreshToken.getInitialProps = (appContext: NextPageContext) => {
  return { id: +appContext.query.id };
};

export default LeadWithRefreshToken;
