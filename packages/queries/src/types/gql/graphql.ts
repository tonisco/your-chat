/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Conversation = {
  __typename?: 'Conversation';
  conversationMembers: Array<ConversationMembers>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  latestMessage?: Maybe<LatestMessage>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ConversationMemberId = {
  id: Scalars['String']['input'];
};

export type ConversationMembers = {
  __typename?: 'ConversationMembers';
  hasReadlastMessage: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  unreadMessageNumber: Scalars['Int']['output'];
  user: User;
};

export type FoundUsers = {
  __typename?: 'FoundUsers';
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type LatestMessage = {
  __typename?: 'LatestMessage';
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  sender: User;
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
};

export type MessageType =
  | 'bot'
  | 'user';

export type Mutation = {
  __typename?: 'Mutation';
  createConversation: Message;
  createUsername: Message;
  loginUser: UserWithToken;
};


export type MutationCreateConversationArgs = {
  input: Array<ConversationMemberId>;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  conversations: Array<Conversation>;
  findUsers: Array<FoundUsers>;
};


export type QueryFindUsersArgs = {
  username: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationCreated: Conversation;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateConversationMutationVariables = Exact<{
  input: Array<ConversationMemberId> | ConversationMemberId;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Message', message: string } };

export type ConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConversationsQuery = { __typename?: 'Query', conversations: Array<(
    { __typename?: 'Conversation' }
    & { ' $fragmentRefs'?: { 'ConversationFieldsFragment': ConversationFieldsFragment } }
  )> };

export type ConversationCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ConversationCreatedSubscription = { __typename?: 'Subscription', conversationCreated: (
    { __typename?: 'Conversation' }
    & { ' $fragmentRefs'?: { 'ConversationFieldsFragment': ConversationFieldsFragment } }
  ) };

export type ConversationMembersFieldsFragment = { __typename?: 'ConversationMembers', id: string, hasReadlastMessage: boolean, unreadMessageNumber: number, user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFieldsFragment': UserFieldsFragment } }
  ) } & { ' $fragmentName'?: 'ConversationMembersFieldsFragment' };

export type ConversationFieldsFragment = { __typename?: 'Conversation', id: string, createdAt: any, updatedAt: any, conversationMembers: Array<(
    { __typename?: 'ConversationMembers' }
    & { ' $fragmentRefs'?: { 'ConversationMembersFieldsFragment': ConversationMembersFieldsFragment } }
  )>, latestMessage?: (
    { __typename?: 'LatestMessage' }
    & { ' $fragmentRefs'?: { 'LatestMessageFieldsFragment': LatestMessageFieldsFragment } }
  ) | null } & { ' $fragmentName'?: 'ConversationFieldsFragment' };

export type UserFieldsFragment = { __typename?: 'User', id: string, email?: string | null, username?: string | null, name?: string | null, image?: string | null } & { ' $fragmentName'?: 'UserFieldsFragment' };

export type LatestMessageFieldsFragment = { __typename?: 'LatestMessage', id: string, body: string, type: MessageType, createdAt: any, updatedAt: any, sender: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFieldsFragment': UserFieldsFragment } }
  ) } & { ' $fragmentName'?: 'LatestMessageFieldsFragment' };

export type CreateUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername: { __typename?: 'Message', message: string } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  image: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserWithToken', id: string, email?: string | null, username?: string | null, name?: string | null, image?: string | null, token: string } };

export type FindUsersQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FindUsersQuery = { __typename?: 'Query', findUsers: Array<{ __typename?: 'FoundUsers', id: string, username?: string | null, image?: string | null }> };

export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const ConversationMembersFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationMembersFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationMembers"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hasReadlastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]} as unknown as DocumentNode<ConversationMembersFieldsFragment, unknown>;
export const LatestMessageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LatestMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LatestMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]} as unknown as DocumentNode<LatestMessageFieldsFragment, unknown>;
export const ConversationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Conversation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ConversationMembersFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LatestMessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationMembersFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationMembers"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hasReadlastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LatestMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LatestMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}}]} as unknown as DocumentNode<ConversationFieldsFragment, unknown>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationMemberId"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const ConversationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"conversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ConversationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationMembersFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationMembers"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hasReadlastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LatestMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LatestMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Conversation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ConversationMembersFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LatestMessageFields"}}]}}]}}]} as unknown as DocumentNode<ConversationsQuery, ConversationsQueryVariables>;
export const ConversationCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"conversationCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversationCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ConversationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationMembersFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationMembers"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hasReadlastMessage"}},{"kind":"Field","name":{"kind":"Name","value":"unreadMessageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LatestMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LatestMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ConversationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Conversation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conversationMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ConversationMembersFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LatestMessageFields"}}]}}]}}]} as unknown as DocumentNode<ConversationCreatedSubscription, ConversationCreatedSubscriptionVariables>;
export const CreateUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreateUsernameMutation, CreateUsernameMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const FindUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<FindUsersQuery, FindUsersQueryVariables>;