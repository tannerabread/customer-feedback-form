import { useEffect, useState } from "react";
import {
  Authenticator,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Radio,
  RadioGroupField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { createFeedback } from "./graphql/mutations";

// remove for production
const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

function App() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  // TODO add slack integration to backend
  // use appsync API with a mutation that goes into dynamoDB
  // use dynamo streams to trigger a lambda function that sends a message to slack
  // future:
  // add date/time submitted

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [rating, setRating] = useState("");
  const [resolutionFeedback, setResolutionFeedback] = useState("");
  const [amplifyFeedback, setAmplifyFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setResponse(params.response);
  }, [params.response]);

  const issueUrl = params.issue;

  const repoMap = {
    "tannerabread/gha-test-issues": "GitHub Actions Test Repo",
    "aws-amplify/amplify-js": "Amplify JS",
    "aws-amplify/amplify-ui": "Amplify UI",
    "aws-amplify/amplify-cli": "Amplify CLI",
    "aws-amplify/docs": "Amplify Docs",
    "aws-amplify/amplify-android": "Amplify Android",
    "aws-amplify/amplify-swift": "Amplify Swift",
    "aws-amplify/amplify-flutter": "Amplify Flutter",
  };
  const repo = repoMap[params.repo];

  async function submitFeedback() {
    const inputObject = {
      op: params.op,
      issueUrl: params.issue,
      issueNumber: params.issue_num,
      repo: params.repo,
      email,
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

  // TODO: move form to own component
  return (
    <Authenticator
      formFields={formFields}
      components={components}
      hideSignUp={true}
    >
      {({ user, signOut }) => (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          gap="0.5rem"
          margin="1rem"
        >
          {/* remove username/signout for live version */}
          <Text as="h1" variant="heading">
            User: {user.getUsername()}
          </Text>
          <Button onClick={signOut}>Sign Out</Button>
          {/* end remove username/signout for live version */}
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
                    label="Do you have any feedback about Amplify in general?"
                    placeholder="Amplify Feedback"
                    onChange={(e) => setAmplifyFeedback(e.target.value)}
                  />
                  <Divider orientation="horizontal" />
                  <Button onClick={submitFeedback} variation="primary">
                    Submit
                  </Button>
                </Flex>
              </View>
            </>
          ) : (
            <Text>
              Thank you for your feedback! You can now close this window.
            </Text>
          )}
        </Flex>
      )}
    </Authenticator>
  );
}

export default App;
