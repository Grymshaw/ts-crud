export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type DeleteLeadInput = {
  id: Scalars['Int'];
};

export type DeleteLeadPayload = {
  __typename?: 'DeleteLeadPayload';
  success: Scalars['Boolean'];
  count?: Maybe<Scalars['Int']>;
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
  login: LoginPayload;
  signup: SignupPayload;
};


export type MutationCreateLeadArgs = {
  input: CreateLeadInput;
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
};


export type QueryLeadArgs = {
  id: Scalars['Int'];
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
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['Int']>;
  website?: Maybe<Scalars['String']>;
};

export type UpdateLeadPayload = {
  __typename?: 'UpdateLeadPayload';
  lead: Lead;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  password: Scalars['String'];
};
