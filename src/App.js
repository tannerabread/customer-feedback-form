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
  withAuthenticator,
} from "@aws-amplify/ui-react";

function App({ signOut, user }) {
  // remove withAuthenticator and login functionality for live version
  const username = user.getUsername();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [recommend, setRecommend] = useState("");
  const [resolutionFeedback, setResolutionFeedback] = useState("");
  const [amplifyFeedback, setAmplifyFeedback] = useState("");

  useEffect(() => {
    setResponse(params.response);
  }, [params.response]);

  const issueUrl = params.issue;
  const repo = params.repo || "Amplify";

  async function submitFeedback() {
    // send email, response, recommend, issueUrl, repo, resolutionFeedback, amplifyFeedback
    // add API(GraphQL) call here
    console.log({
      email,
      response,
      recommend,
      issueUrl,
      repo,
      resolutionFeedback,
      amplifyFeedback,
    });
  }

  // TODO: move form to own component
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      gap="0.5rem"
    >
      {/* remove username/signout for live version */}
      <Text as="h1" variant="heading">
        User: {username}
      </Text>
      <Button onClick={signOut}>Sign Out</Button>
      {/* end remove username/signout for live version */}
      <Text>Github Issue URL: </Text>
      <Link href={issueUrl}>{issueUrl}</Link>
      <View as="form">
        <Flex direction="column" gap="1rem">
          <TextField
            descriptiveText="Enter a valid email"
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
          <Text>{`On a scale of 0 to 10, how likely are you to recommend ${repo} to a friend?`}</Text>
          <RadioGroupField
            label="recommendation"
            labelHidden="true"
            direction="row"
            name="recommend"
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}
          >
            <Radio value="0">0</Radio>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
            <Radio value="4">4</Radio>
            <Radio value="5">5</Radio>
            <Radio value="6">6</Radio>
            <Radio value="7">7</Radio>
            <Radio value="8">8</Radio>
            <Radio value="9">9</Radio>
            <Radio value="10">10</Radio>
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
    </Flex>
  );
}

export default withAuthenticator(App);
