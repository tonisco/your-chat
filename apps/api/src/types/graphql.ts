import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  latestMessage?: Maybe<Message>;
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

export type Members = {
  id: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  conversationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  sender: User;
  type: MessageType;
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageReturn = {
  __typename?: 'MessageReturn';
  message: Scalars['String']['output'];
};

export type MessageSentReturn = {
  __typename?: 'MessageSentReturn';
  members?: Maybe<Array<ConversationMembers>>;
  message: Message;
};

export type MessageType =
  | 'bot'
  | 'user';

export type Mutation = {
  __typename?: 'Mutation';
  addNewMembers: MessageReturn;
  createConversation: CreateConversationReturn;
  createUsername: MessageReturn;
  deleteMessage?: Maybe<Scalars['Boolean']['output']>;
  editMessage?: Maybe<Scalars['Boolean']['output']>;
  loginUser: UserWithToken;
  markConversationAsRead?: Maybe<Scalars['Boolean']['output']>;
  removeMembers: MessageReturn;
  sendMessage?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddNewMembersArgs = {
  conversationId: Scalars['String']['input'];
  members: Array<Members>;
};


export type MutationCreateConversationArgs = {
  input: Array<ConversationMemberId>;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  conversationId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationEditMessageArgs = {
  body: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMarkConversationAsReadArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationRemoveMembersArgs = {
  conversationId: Scalars['String']['input'];
  members: Array<Members>;
};


export type MutationSendMessageArgs = {
  body: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  conversations: Array<Conversation>;
  findUsers: Array<FoundUsers>;
  findUsersNotInChat: Array<FoundUsers>;
  getConversationsMembers: Array<FoundUsers>;
  messages: Array<Message>;
};


export type QueryFindUsersArgs = {
  username: Scalars['String']['input'];
};


export type QueryFindUsersNotInChatArgs = {
  conversationId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetConversationsMembersArgs = {
  conversationId: Scalars['String']['input'];
};


export type QueryMessagesArgs = {
  conversationId: Scalars['String']['input'];
};

export type RemoveConversationReturn = {
  __typename?: 'RemoveConversationReturn';
  conversationId: Scalars['String']['output'];
  members: Array<NewMembersList>;
};

export type SubMessageReturn = {
  __typename?: 'SubMessageReturn';
  changeMessage: Message;
  conversationId: Scalars['String']['output'];
  members: Array<ConversationMembers>;
};

export type Subscription = {
  __typename?: 'Subscription';
  addedToConversation: AddedToConversationReturn;
  conversationCreated: Conversation;
  conversationUpdated: Conversation;
  deletedMessage: SubMessageReturn;
  editedMessage: SubMessageReturn;
  messageSent: MessageSentReturn;
  removeFromConversation: RemoveConversationReturn;
};


export type SubscriptionMessageSentArgs = {
  conversationId: Scalars['String']['input'];
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

export type AddedToConversationReturn = {
  __typename?: 'addedToConversationReturn';
  conversation: Conversation;
  members: Array<NewMembersList>;
};

export type CreateConversationReturn = {
  __typename?: 'createConversationReturn';
  conversationId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type CreateMessageInput = {
  body: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
};

export type NewMembersList = {
  __typename?: 'newMembersList';
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  ConversationMemberId: ConversationMemberId;
  ConversationMembers: ResolverTypeWrapper<ConversationMembers>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FoundUsers: ResolverTypeWrapper<FoundUsers>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Members: Members;
  Message: ResolverTypeWrapper<Message>;
  MessageReturn: ResolverTypeWrapper<MessageReturn>;
  MessageSentReturn: ResolverTypeWrapper<MessageSentReturn>;
  MessageType: MessageType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveConversationReturn: ResolverTypeWrapper<RemoveConversationReturn>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubMessageReturn: ResolverTypeWrapper<SubMessageReturn>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserWithToken: ResolverTypeWrapper<UserWithToken>;
  addedToConversationReturn: ResolverTypeWrapper<AddedToConversationReturn>;
  createConversationReturn: ResolverTypeWrapper<CreateConversationReturn>;
  createMessageInput: CreateMessageInput;
  newMembersList: ResolverTypeWrapper<NewMembersList>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Conversation: Conversation;
  ConversationMemberId: ConversationMemberId;
  ConversationMembers: ConversationMembers;
  DateTime: Scalars['DateTime']['output'];
  FoundUsers: FoundUsers;
  Int: Scalars['Int']['output'];
  Members: Members;
  Message: Message;
  MessageReturn: MessageReturn;
  MessageSentReturn: MessageSentReturn;
  Mutation: {};
  Query: {};
  RemoveConversationReturn: RemoveConversationReturn;
  String: Scalars['String']['output'];
  SubMessageReturn: SubMessageReturn;
  Subscription: {};
  User: User;
  UserWithToken: UserWithToken;
  addedToConversationReturn: AddedToConversationReturn;
  createConversationReturn: CreateConversationReturn;
  createMessageInput: CreateMessageInput;
  newMembersList: NewMembersList;
};

export type ConversationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  conversationMembers?: Resolver<Array<ResolversTypes['ConversationMembers']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latestMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConversationMembersResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConversationMembers'] = ResolversParentTypes['ConversationMembers']> = {
  hasReadlastMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unreadMessageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FoundUsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['FoundUsers'] = ResolversParentTypes['FoundUsers']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  conversationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MessageType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageReturn'] = ResolversParentTypes['MessageReturn']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageSentReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageSentReturn'] = ResolversParentTypes['MessageSentReturn']> = {
  members?: Resolver<Maybe<Array<ResolversTypes['ConversationMembers']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addNewMembers?: Resolver<ResolversTypes['MessageReturn'], ParentType, ContextType, RequireFields<MutationAddNewMembersArgs, 'conversationId' | 'members'>>;
  createConversation?: Resolver<ResolversTypes['createConversationReturn'], ParentType, ContextType, RequireFields<MutationCreateConversationArgs, 'input'>>;
  createUsername?: Resolver<ResolversTypes['MessageReturn'], ParentType, ContextType, RequireFields<MutationCreateUsernameArgs, 'username'>>;
  deleteMessage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'conversationId' | 'messageId'>>;
  editMessage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEditMessageArgs, 'body' | 'conversationId' | 'messageId'>>;
  loginUser?: Resolver<ResolversTypes['UserWithToken'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'image' | 'name'>>;
  markConversationAsRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMarkConversationAsReadArgs, 'conversationId'>>;
  removeMembers?: Resolver<ResolversTypes['MessageReturn'], ParentType, ContextType, RequireFields<MutationRemoveMembersArgs, 'conversationId' | 'members'>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'body' | 'conversationId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  conversations?: Resolver<Array<ResolversTypes['Conversation']>, ParentType, ContextType>;
  findUsers?: Resolver<Array<ResolversTypes['FoundUsers']>, ParentType, ContextType, RequireFields<QueryFindUsersArgs, 'username'>>;
  findUsersNotInChat?: Resolver<Array<ResolversTypes['FoundUsers']>, ParentType, ContextType, RequireFields<QueryFindUsersNotInChatArgs, 'conversationId' | 'username'>>;
  getConversationsMembers?: Resolver<Array<ResolversTypes['FoundUsers']>, ParentType, ContextType, RequireFields<QueryGetConversationsMembersArgs, 'conversationId'>>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'conversationId'>>;
};

export type RemoveConversationReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveConversationReturn'] = ResolversParentTypes['RemoveConversationReturn']> = {
  conversationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['newMembersList']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubMessageReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubMessageReturn'] = ResolversParentTypes['SubMessageReturn']> = {
  changeMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  conversationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['ConversationMembers']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  addedToConversation?: SubscriptionResolver<ResolversTypes['addedToConversationReturn'], "addedToConversation", ParentType, ContextType>;
  conversationCreated?: SubscriptionResolver<ResolversTypes['Conversation'], "conversationCreated", ParentType, ContextType>;
  conversationUpdated?: SubscriptionResolver<ResolversTypes['Conversation'], "conversationUpdated", ParentType, ContextType>;
  deletedMessage?: SubscriptionResolver<ResolversTypes['SubMessageReturn'], "deletedMessage", ParentType, ContextType>;
  editedMessage?: SubscriptionResolver<ResolversTypes['SubMessageReturn'], "editedMessage", ParentType, ContextType>;
  messageSent?: SubscriptionResolver<ResolversTypes['MessageSentReturn'], "messageSent", ParentType, ContextType, RequireFields<SubscriptionMessageSentArgs, 'conversationId'>>;
  removeFromConversation?: SubscriptionResolver<ResolversTypes['RemoveConversationReturn'], "removeFromConversation", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWithTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithToken'] = ResolversParentTypes['UserWithToken']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddedToConversationReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['addedToConversationReturn'] = ResolversParentTypes['addedToConversationReturn']> = {
  conversation?: Resolver<ResolversTypes['Conversation'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['newMembersList']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateConversationReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['createConversationReturn'] = ResolversParentTypes['createConversationReturn']> = {
  conversationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewMembersListResolvers<ContextType = any, ParentType extends ResolversParentTypes['newMembersList'] = ResolversParentTypes['newMembersList']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Conversation?: ConversationResolvers<ContextType>;
  ConversationMembers?: ConversationMembersResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  FoundUsers?: FoundUsersResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageReturn?: MessageReturnResolvers<ContextType>;
  MessageSentReturn?: MessageSentReturnResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveConversationReturn?: RemoveConversationReturnResolvers<ContextType>;
  SubMessageReturn?: SubMessageReturnResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserWithToken?: UserWithTokenResolvers<ContextType>;
  addedToConversationReturn?: AddedToConversationReturnResolvers<ContextType>;
  createConversationReturn?: CreateConversationReturnResolvers<ContextType>;
  newMembersList?: NewMembersListResolvers<ContextType>;
};

