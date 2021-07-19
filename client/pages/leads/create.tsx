import { gql } from '@apollo/client';
import { Container } from '@material-ui/core';

import AddLeadForm from '../../components/addLeadForm';
import { withRefreshToken } from '../../lib/auth';

export const CREATE_LEAD_MUTATION = gql`
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(input: $input) {
      lead {
        id
        name
        website
        email
        phoneNumber
      }
    }
  }
`;

function CreateLead() {
  return (
    <Container maxWidth="sm">
      <AddLeadForm />
    </Container>
  );
}

export default withRefreshToken(CreateLead);
