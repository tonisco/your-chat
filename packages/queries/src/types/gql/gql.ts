/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createConversation($input: [ConversationMemberId!]!) {\n    createConversation(input: $input) {\n      message\n      conversationId\n    }\n  }\n": types.CreateConversationDocument,
    "\n  query conversations {\n    conversations {\n      ...ConversationFields\n    }\n  }\n  \n": types.ConversationsDocument,
    "\n  subscription conversationCreated {\n    conversationCreated {\n      ...ConversationFields\n    }\n  }\n  \n": types.ConversationCreatedDocument,
    "\n  fragment ConversationMembersFields on ConversationMembers {\n    id\n    hasReadlastMessage\n    unreadMessageNumber\n    user {\n      ...UserFields\n    }\n  }\n\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    conversationMembers {\n      ...ConversationMembersFields\n    }\n    latestMessage {\n      ...MessageField\n    }\n  }\n\n  fragment UserFields on User {\n    id\n    email\n    username\n    name\n    image\n  }\n\n  fragment MessageField on Message {\n    id\n    body\n    type\n    createdAt\n    updatedAt\n    sender {\n      ...UserFields\n    }\n  }\n": types.ConversationMembersFieldsFragmentDoc,
    "\n  query messages($conversationId: String!) {\n    messages(conversationId: $conversationId) {\n      ...MessageField\n    }\n  }\n  \n": types.MessagesDocument,
    "\n  mutation sendMessage($input: createMessageInput!) {\n    sendMessage(input: $input)\n  }\n": types.SendMessageDocument,
    "\n  mutation createUsername($username: String!) {\n    createUsername(username: $username) {\n      message\n    }\n  }\n": types.CreateUsernameDocument,
    "\n  mutation loginUser(\n    $email: String!\n    $username: String\n    $name: String!\n    $image: String!\n  ) {\n    loginUser(email: $email, username: $username, name: $name, image: $image) {\n      id\n      email\n      username\n      name\n      image\n      token\n    }\n  }\n": types.LoginUserDocument,
    "\n  query findUsers($username: String!) {\n    findUsers(username: $username) {\n      id\n      username\n      image\n    }\n  }\n": types.FindUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createConversation($input: [ConversationMemberId!]!) {\n    createConversation(input: $input) {\n      message\n      conversationId\n    }\n  }\n"): (typeof documents)["\n  mutation createConversation($input: [ConversationMemberId!]!) {\n    createConversation(input: $input) {\n      message\n      conversationId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query conversations {\n    conversations {\n      ...ConversationFields\n    }\n  }\n  \n"): (typeof documents)["\n  query conversations {\n    conversations {\n      ...ConversationFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription conversationCreated {\n    conversationCreated {\n      ...ConversationFields\n    }\n  }\n  \n"): (typeof documents)["\n  subscription conversationCreated {\n    conversationCreated {\n      ...ConversationFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ConversationMembersFields on ConversationMembers {\n    id\n    hasReadlastMessage\n    unreadMessageNumber\n    user {\n      ...UserFields\n    }\n  }\n\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    conversationMembers {\n      ...ConversationMembersFields\n    }\n    latestMessage {\n      ...MessageField\n    }\n  }\n\n  fragment UserFields on User {\n    id\n    email\n    username\n    name\n    image\n  }\n\n  fragment MessageField on Message {\n    id\n    body\n    type\n    createdAt\n    updatedAt\n    sender {\n      ...UserFields\n    }\n  }\n"): (typeof documents)["\n  fragment ConversationMembersFields on ConversationMembers {\n    id\n    hasReadlastMessage\n    unreadMessageNumber\n    user {\n      ...UserFields\n    }\n  }\n\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    conversationMembers {\n      ...ConversationMembersFields\n    }\n    latestMessage {\n      ...MessageField\n    }\n  }\n\n  fragment UserFields on User {\n    id\n    email\n    username\n    name\n    image\n  }\n\n  fragment MessageField on Message {\n    id\n    body\n    type\n    createdAt\n    updatedAt\n    sender {\n      ...UserFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query messages($conversationId: String!) {\n    messages(conversationId: $conversationId) {\n      ...MessageField\n    }\n  }\n  \n"): (typeof documents)["\n  query messages($conversationId: String!) {\n    messages(conversationId: $conversationId) {\n      ...MessageField\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($input: createMessageInput!) {\n    sendMessage(input: $input)\n  }\n"): (typeof documents)["\n  mutation sendMessage($input: createMessageInput!) {\n    sendMessage(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUsername($username: String!) {\n    createUsername(username: $username) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation createUsername($username: String!) {\n    createUsername(username: $username) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser(\n    $email: String!\n    $username: String\n    $name: String!\n    $image: String!\n  ) {\n    loginUser(email: $email, username: $username, name: $name, image: $image) {\n      id\n      email\n      username\n      name\n      image\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser(\n    $email: String!\n    $username: String\n    $name: String!\n    $image: String!\n  ) {\n    loginUser(email: $email, username: $username, name: $name, image: $image) {\n      id\n      email\n      username\n      name\n      image\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findUsers($username: String!) {\n    findUsers(username: $username) {\n      id\n      username\n      image\n    }\n  }\n"): (typeof documents)["\n  query findUsers($username: String!) {\n    findUsers(username: $username) {\n      id\n      username\n      image\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;