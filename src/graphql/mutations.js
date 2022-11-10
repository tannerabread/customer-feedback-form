/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
      id
      name
      description
      email
      response
      rating
      issueUrl
      repo
      resolutionFeedback
      amplifyFeedback
      firstResponseTime
      averageResponseTime
      medianResponseTime
      numReactionsFromCommunity
      numCommentsFromCommunity
      totalOPComments
      totalMaintainerComments
      averageMaintainerCommentLength
      closedByMaintainer
      totalTimeToClose
      createdAt
      updatedAt
    }
  }
`;
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback(
    $input: UpdateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    updateFeedback(input: $input, condition: $condition) {
      id
      name
      description
      email
      response
      rating
      issueUrl
      repo
      resolutionFeedback
      amplifyFeedback
      firstResponseTime
      averageResponseTime
      medianResponseTime
      numReactionsFromCommunity
      numCommentsFromCommunity
      totalOPComments
      totalMaintainerComments
      averageMaintainerCommentLength
      closedByMaintainer
      totalTimeToClose
      createdAt
      updatedAt
    }
  }
`;
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
      id
      name
      description
      email
      response
      rating
      issueUrl
      repo
      resolutionFeedback
      amplifyFeedback
      firstResponseTime
      averageResponseTime
      medianResponseTime
      numReactionsFromCommunity
      numCommentsFromCommunity
      totalOPComments
      totalMaintainerComments
      averageMaintainerCommentLength
      closedByMaintainer
      totalTimeToClose
      createdAt
      updatedAt
    }
  }
`;
