import { gql } from '@apollo/client';
import {
  Container,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { useRouter } from 'next/router';
import {
  Lead,
  useLeadsQuery,
} from '../../generated/graphql';

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

  // FIXME: Delete this --> Just tempporary to have more data
  let leads = [];
  if (data) {
    leads = Array.apply(null, Array(5)).map(() => data.leads[0]);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClick = (id: number) => {
    router.push(`/leads/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`trying to delete lead ${id}`);
  };

  return (
    <Container maxWidth="sm">
      <List style={{ width: '100%' }}>
        {leads.map((lead: Lead) => (
          <ListItem key={lead.id} role={undefined} button onClick={() => handleClick(lead.id)}>
            <ListItemText
              primary={lead.name}
              secondary={
                <>
                  {lead.email || null}
                  {lead.email && <br />}
                  {lead.phoneNumber || null}
                  {lead.phoneNumber && <br />}
                  {lead.website || null}
                  {lead.website && <br />}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(lead.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Fab color="primary" aria-label="add">
        <Add />
      </Fab>
    </Container>
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
