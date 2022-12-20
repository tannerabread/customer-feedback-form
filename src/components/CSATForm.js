import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Link,
  Radio,
  RadioGroupField,
  Text,
  TextAreaField,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createFeedback } from "../graphql/mutations";

export function CSATForm() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  // GitHub issue URL: <URL>

  // On a scale of 1-5, how satisfied were you with <INTERACTION>?

  // Why did you pick that answer?
  // <FREE TEXT BOX>
  // -------------------------------------------------------------
  // On a scale of 1-5 how satisfied are you with <PRODUCT>?

  // Why did you pick that answer?
  // <FREE TEXT BOX>
  // -------------------------------------------------------------
  // GitHub Handle (optional): <TEXT FIELD>

  // <SUBMIT BUTTON></SUBMIT>

  const [alias, setAlias] = useState("");
  const [response, setResponse] = useState(0);
  const [rating, setRating] = useState(0);
  const [resolutionFeedback, setResolutionFeedback] = useState("");
  const [amplifyFeedback, setAmplifyFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setResponse(params.response);
  }, [params.response]);

  async function submitFeedback() {
    const inputObject = {
      op: params.op,
      issueUrl: params.issue,
      issueNumber: params.issue_num,
      repo: params.repo,
      alias,
      response,
      rating,
      resolutionFeedback,
      amplifyFeedback,
    };
    console.log({ inputObject });

    await API.graphql(
      graphqlOperation(createFeedback, {
        input: inputObject,
      })
    );

    setSubmitted(true);
  }

  const issueUrl = params.issue;

  const repoMap = {
    "aws-amplify/amplify-js": "AWS Amplify JS",
    "aws-amplify/amplify-ui": "AWS Amplify UI",
    "aws-amplify/amplify-cli": "AWS Amplify CLI",
    "aws-amplify/docs": "AWS Amplify Docs",
    "aws-amplify/amplify-adminui": "AWS Amplify Studio",
    "aws-amplify/amplify-hosting": "AWS Amplify Hosting",
    "aws-amplify/amplify-android": "AWS Amplify Android",
    "aws-amplify/amplify-swift": "AWS Amplify Swift",
    "aws-amplify/amplify-flutter": "AWS Amplify Flutter",
  };
  const repo = params.repo ? repoMap[params.repo] : "AWS Amplify";

  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="1rem 1rem"
      minHeight="100vh"
      backgroundColor="background.primary"
    >
      {!submitted ? (
        <>
          <Text>Github Issue URL: </Text>
          <Link href={issueUrl}>{issueUrl}</Link>
          <View as="form" maxWidth="600px">
            <Flex direction="column" gap="1rem">
              <Text>
                How satisfied are you with the resolution of your issue?
              </Text>
              <RadioGroupField
                label="How satisfied are you with the resolution of your issue?"
                labelHidden
                labelPosition="bottom"
                name="satisfied"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              >
                <Radio value="1">Very Unsatisfied</Radio>
                <Radio value="2">Unsatisfied</Radio>
                <Radio value="3">Neutral</Radio>
                <Radio value="4">Satisfied</Radio>
                <Radio value="5">Very Satisfied</Radio>
              </RadioGroupField>
              <TextAreaField
                label="Why did you pick that answer?"
                placeholder="Reason for choice"
                onChange={(e) => setResolutionFeedback(e.target.value)}
              />
              <Divider orientation="horizontal" />
              <Text>How satisfied are you with {repo} in general?</Text>
              <RadioGroupField
                label={`How satisfied are you with ${repo} in general?`}
                labelHidden
                labelPosition="bottom"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <Radio value="1">Very Unsatisfied</Radio>
                <Radio value="2">Unsatisfied</Radio>
                <Radio value="3">Neutral</Radio>
                <Radio value="4">Satisfied</Radio>
                <Radio value="5">Very Satisfied</Radio>
              </RadioGroupField>
              <TextAreaField
                label="Why did you pick that answer?"
                placeholder="Reason for choice"
                onChange={(e) => setAmplifyFeedback(e.target.value)}
              />
              <Divider orientation="horizontal" />
              <TextField
                descriptiveText="Enter a valid GitHub alias. AWS Amplify will use this to tag you on the original issue if we have any follow-up questions."
                placeholder="GitHub Alias"
                label="GitHub Alias (optional)"
                onChange={(e) => setAlias(e.target.value)}
              />
              <Button onClick={submitFeedback} variation="primary">
                Submit
              </Button>
            </Flex>
          </View>
        </>
      ) : (
        <Text>Thank you for your feedback! You can now close this window.</Text>
      )}
    </Flex>
  );
}
