import {
  Authenticator,
  Card,
  defaultDarkModeOverride,
  Heading,
  Text,
  ThemeProvider,
  useTheme,
} from "@aws-amplify/ui-react";
import { Form } from "./components/Form";

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
  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode="system">
      <Authenticator
        formFields={formFields}
        components={components}
        hideSignUp={true}
      >
        {({ user, signOut }) => (
          <Card>
            <Form user={user} signOut={signOut} />
          </Card>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
