/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      userId
      name
      dates
      hashes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userId: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        name
        dates
        hashes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSympObj = /* GraphQL */ `
  query GetSympObj($id: ID!) {
    getSympObj(id: $id) {
      id
      userId
      date
      symptom
      notes
      sympSeverity
      medHashes
      medPotency
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSympObjs = /* GraphQL */ `
  query ListSympObjs(
    $filter: ModelSympObjFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSympObjs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        date
        symptom
        notes
        sympSeverity
        medHashes
        medPotency
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVitalObj = /* GraphQL */ `
  query GetVitalObj($id: ID!) {
    getVitalObj(id: $id) {
      id
      userId
      Hb
      RBC
      Temp
      SpO2
      Hr
      Date
      Time
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVitalObjs = /* GraphQL */ `
  query ListVitalObjs(
    $filter: ModelVitalObjFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVitalObjs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        Hb
        RBC
        Temp
        SpO2
        Hr
        Date
        Time
        date
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMedObj = /* GraphQL */ `
  query GetMedObj($id: ID!) {
    getMedObj(id: $id) {
      id
      userId
      ids
      title
      time
      days
      description
      hashCode
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMedObjs = /* GraphQL */ `
  query ListMedObjs(
    $filter: ModelMedObjFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedObjs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        ids
        title
        time
        days
        description
        hashCode
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($userId: ID!) {
    getChat(userId: $userId) {
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $userId: ID
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChats(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        text
        type
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
