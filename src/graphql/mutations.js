/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSympObj = /* GraphQL */ `
  mutation CreateSympObj(
    $input: CreateSympObjInput!
    $condition: ModelSympObjConditionInput
  ) {
    createSympObj(input: $input, condition: $condition) {
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
export const updateSympObj = /* GraphQL */ `
  mutation UpdateSympObj(
    $input: UpdateSympObjInput!
    $condition: ModelSympObjConditionInput
  ) {
    updateSympObj(input: $input, condition: $condition) {
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
export const deleteSympObj = /* GraphQL */ `
  mutation DeleteSympObj(
    $input: DeleteSympObjInput!
    $condition: ModelSympObjConditionInput
  ) {
    deleteSympObj(input: $input, condition: $condition) {
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
export const createVitalObj = /* GraphQL */ `
  mutation CreateVitalObj(
    $input: CreateVitalObjInput!
    $condition: ModelVitalObjConditionInput
  ) {
    createVitalObj(input: $input, condition: $condition) {
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
export const updateVitalObj = /* GraphQL */ `
  mutation UpdateVitalObj(
    $input: UpdateVitalObjInput!
    $condition: ModelVitalObjConditionInput
  ) {
    updateVitalObj(input: $input, condition: $condition) {
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
export const deleteVitalObj = /* GraphQL */ `
  mutation DeleteVitalObj(
    $input: DeleteVitalObjInput!
    $condition: ModelVitalObjConditionInput
  ) {
    deleteVitalObj(input: $input, condition: $condition) {
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
export const createMedObj = /* GraphQL */ `
  mutation CreateMedObj(
    $input: CreateMedObjInput!
    $condition: ModelMedObjConditionInput
  ) {
    createMedObj(input: $input, condition: $condition) {
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
export const updateMedObj = /* GraphQL */ `
  mutation UpdateMedObj(
    $input: UpdateMedObjInput!
    $condition: ModelMedObjConditionInput
  ) {
    updateMedObj(input: $input, condition: $condition) {
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
export const deleteMedObj = /* GraphQL */ `
  mutation DeleteMedObj(
    $input: DeleteMedObjInput!
    $condition: ModelMedObjConditionInput
  ) {
    deleteMedObj(input: $input, condition: $condition) {
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
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
      id
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
      id
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
      id
      userId
      text
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
