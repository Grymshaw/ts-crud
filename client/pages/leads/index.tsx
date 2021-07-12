import { gql } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Lead, useLeadsQuery } from '../../generated/graphql';

export const LEADS_QUERY = gql`
  query Leads {
    leads {
      id
      name
      website
      email
      phoneNumber
    }
  }
`;

export default function Leads() {
  const { data, error, loading } = useLeadsQuery();
  const router = useRouter();

  if (error) {
    router.push('/');
    return <p>Redirecting...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {data.leads.map((lead: Lead) => (
        <li key={lead.id}>
          <Link href={`/leads/${lead.id}`}>
            <a>{lead.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// NOTE: Not needed because we need to be authenticated to view our leads
// export const getStaticProps = async () => {
//   const apolloClient = initializeApollo();
// 
//   await apolloClient.query({ query: LEADS_QUERY });
// 
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   };
// };
