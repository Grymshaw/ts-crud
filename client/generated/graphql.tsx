import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateLeadInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
  note: Scalars['String'];
};

export type CreateLeadPayload = {
  __typename?: 'CreateLeadPayload';
  lead: Lead;
};

export type CreateNoteInput = {
  note: Scalars['String'];
  leadId: Scalars['Int'];
};

export type CreateNotePayload = {
  __typename?: 'CreateNotePayload';
  leadNote: LeadNote;
};

export type DeleteLeadInput = {
  id: Scalars['Int'];
};

export type DeleteLeadPayload = {
  __typename?: 'DeleteLeadPayload';
  deletedLead: Lead;
};

export type DeleteNoteInput = {
  id: Scalars['Int'];
};

export type DeleteNotePayload = {
  __typename?: 'DeleteNotePayload';
  deletedLeadNote: LeadNote;
};

export type Lead = {
  __typename?: 'Lead';
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<LeadNote>>;
};

export type LeadNote = {
  __typename?: 'LeadNote';
  id?: Maybe<Scalars['Int']>;
  lead?: Maybe<Lead>;
  leadId?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createLead: CreateLeadPayload;
  deleteLead: DeleteLeadPayload;
  updateLead: UpdateLeadPayload;
  createLeadNote: CreateNotePayload;
  deleteLeadNote: DeleteNotePayload;
  updateLeadNote: UpdateNotePayload;
  login: LoginPayload;
  signup: SignupPayload;
};


export type MutationCreateLeadArgs = {
  input: CreateLeadInput;
};


export type MutationDeleteLeadArgs = {
  input: DeleteLeadInput;
};


export type MutationUpdateLeadArgs = {
  input: UpdateLeadInput;
};


export type MutationCreateLeadNoteArgs = {
  input: CreateNoteInput;
};


export type MutationDeleteLeadNoteArgs = {
  input: DeleteNoteInput;
};


export type MutationUpdateLeadNoteArgs = {
  input: UpdateNoteInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  lead?: Maybe<Lead>;
  leads?: Maybe<Array<Lead>>;
  notes?: Maybe<Array<LeadNote>>;
};


export type QueryLeadArgs = {
  id: Scalars['Int'];
};


export type QueryNotesArgs = {
  leadId: Scalars['Int'];
};

export type SignupInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type SignupPayload = {
  __typename?: 'SignupPayload';
  user: User;
};

export type UpdateLeadInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

export type UpdateLeadPayload = {
  __typename?: 'UpdateLeadPayload';
  lead: Lead;
};

export type UpdateNoteInput = {
  id: Scalars['Int'];
  note: Scalars['String'];
};

export type UpdateNotePayload = {
  __typename?: 'UpdateNotePayload';
  leadNote: LeadNote;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;