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

export function Form() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("yes");
  const [rating, setRating] = useState("");
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
      alias: email,
      response: response === "yes" ? 5 : 1,
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
  const repo = params.repo ? repoMap[params.repo] : 'AWS Amplify';

  return (
    <Flex
      direction="column"
      alignItems="center"
      gap="0.5rem"
      padding="1rem"
      height="100vh"
      backgroundColor="background.primary"
    >
      {!submitted ? (
        <>
          <Text>Github Issue URL: </Text>
          <Link href={issueUrl}>{issueUrl}</Link>
          <View as="form">
            <Flex direction="column" gap="1rem">
              <TextField
                descriptiveText="Enter a valid email address. AWS Amplify will use this to contact you if we have any follow-up questions."
                placeholder="Email"
                label="Email (optional)"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Divider orientation="horizontal" />
              <RadioGroupField
                label="Are you satisfied with the resolution of your issue?"
                name="satisfied"
                direction="row"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroupField>
              <RadioGroupField
                label={`How likely are you to recommend ${repo} to a friend?`}
                direction="row"
                name="rating"
                // labelPosition="top"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
              </RadioGroupField>
              <Divider orientation="horizontal" />
              <TextAreaField
                label="Do you have any feedback on the resolution of your issue?"
                placeholder="Resolution Feedback"
                onChange={(e) => setResolutionFeedback(e.target.value)}
              />
              <Divider orientation="horizontal" />
              <TextAreaField
                label="Do you have any feedback about AWS Amplify in general?"
                placeholder="Amplify Feedback"
                onChange={(e) => setAmplifyFeedback(e.target.value)}
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
