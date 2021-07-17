import { gql } from '@apollo/client';
import { Container } from '@material-ui/core';

import AddLeadForm from '../../components/addLeadForm';

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

export default function CreateLead() {
  return (
    <Container maxWidth="sm">
      <AddLeadForm />
    </Container>
  );
}
