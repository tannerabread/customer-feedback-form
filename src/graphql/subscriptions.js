/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onCreateFeedback(filter: $filter) {
      id
      op
      issueUrl
      issueNumber
      repo
      alias
      response
      rating
      resolutionFeedback
      amplifyFeedback
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onUpdateFeedback(filter: $filter) {
      id
      op
      issueUrl
      issueNumber
      repo
      alias
      response
      rating
      resolutionFeedback
      amplifyFeedback
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
    onDeleteFeedback(filter: $filter) {
      id
      op
      issueUrl
      issueNumber
      repo
      alias
      response
      rating
      resolutionFeedback
      amplifyFeedback
      createdAt
      updatedAt
    }
  }
`;
