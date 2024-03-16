/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateSympObj = /* GraphQL */ `
  subscription OnCreateSympObj($filter: ModelSubscriptionSympObjFilterInput) {
    onCreateSympObj(filter: $filter) {
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
export const onUpdateSympObj = /* GraphQL */ `
  subscription OnUpdateSympObj($filter: ModelSubscriptionSympObjFilterInput) {
    onUpdateSympObj(filter: $filter) {
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
export const onDeleteSympObj = /* GraphQL */ `
  subscription OnDeleteSympObj($filter: ModelSubscriptionSympObjFilterInput) {
    onDeleteSympObj(filter: $filter) {
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
export const onCreateVitalObj = /* GraphQL */ `
  subscription OnCreateVitalObj($filter: ModelSubscriptionVitalObjFilterInput) {
    onCreateVitalObj(filter: $filter) {
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
export const onUpdateVitalObj = /* GraphQL */ `
  subscription OnUpdateVitalObj($filter: ModelSubscriptionVitalObjFilterInput) {
    onUpdateVitalObj(filter: $filter) {
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
export const onDeleteVitalObj = /* GraphQL */ `
  subscription OnDeleteVitalObj($filter: ModelSubscriptionVitalObjFilterInput) {
    onDeleteVitalObj(filter: $filter) {
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
export const onCreateMedObj = /* GraphQL */ `
  subscription OnCreateMedObj($filter: ModelSubscriptionMedObjFilterInput) {
    onCreateMedObj(filter: $filter) {
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
export const onUpdateMedObj = /* GraphQL */ `
  subscription OnUpdateMedObj($filter: ModelSubscriptionMedObjFilterInput) {
    onUpdateMedObj(filter: $filter) {
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
export const onDeleteMedObj = /* GraphQL */ `
  subscription OnDeleteMedObj($filter: ModelSubscriptionMedObjFilterInput) {
    onDeleteMedObj(filter: $filter) {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
