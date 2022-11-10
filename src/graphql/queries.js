/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
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
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
