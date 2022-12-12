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

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("yes");
  const [consent, setConsent] = useState("no");
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
      email,
      response: response === "yes" ? true : false,
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
    "aws-amplify/amplify-android": "AWS Amplify Android",
    "aws-amplify/amplify-swift": "AWS Amplify Swift",
    "aws-amplify/amplify-flutter": "AWS Amplify Flutter",
  };
  const repo = params.repo ? repoMap[params.repo] : "AWS Amplify";
  
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="2rem 1rem"
      minHeight="100vh"
      backgroundColor="background.primary"
    >
      {!submitted ? (
        <>
          <Text>Github Issue URL: </Text>
          <Link href={issueUrl}>{issueUrl}</Link>
          <View as="form" maxWidth="600px">
            <Flex direction="column" gap="1rem">
              <Text>On a scale of 1-5, how satisfied are you with the resolution of your issue?</Text>
              <RadioGroupField
                label="On a scale of 1-5, how satisfied are you with the resolution of your issue?"
                labelHidden
                labelPosition="top"
                name="satisfied"
                direction="row"
                alignSelf="center"
                textAlign="center"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              >
                <Radio value="1">Terrible 1</Radio>
                <Radio value="2">Unhappy 2</Radio>
                <Radio value="3">Mixed 3</Radio>
                <Radio value="4">Pleased 4</Radio>
                <Radio value="5">Delighted 5</Radio>
              </RadioGroupField>
              <TextAreaField
                label="Why did you pick that score?"
                placeholder="Reason for Score"
                onChange={(e) => setResolutionFeedback(e.target.value)}
              />
              <Divider orientation="horizontal" />
              <TextAreaField
                label={`Do you have any feedback about ${repo} in general?`}
                placeholder="Amplify Feedback"
                onChange={(e) => setAmplifyFeedback(e.target.value)}
              />
              <Divider orientation="horizontal" />
              <RadioGroupField
                label="May we reach out to you with further questions?"
                name="consent"
                direction="row"
                value={consent}
                onChange={(e) => setConsent(e.target.value)}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </RadioGroupField>
              {consent === "yes" && (
                <TextField
                  descriptiveText="Enter a valid email address. AWS Amplify will use this to contact you if we have any follow-up questions."
                  placeholder="Email"
                  label="Email (optional)"
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
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
