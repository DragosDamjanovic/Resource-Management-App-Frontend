import React from 'react';
import { VStack, Input, Button, Spinner, Center, Heading } from 'native-base';

interface RegisterViewProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  onRegister: () => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({
  email,
  password,
  firstName,
  lastName,
  loading,
  setEmail,
  setPassword,
  setFirstName,
  setLastName,
  onRegister,
}) => {
  return (
    <Center flex={1} px="3">
      <Heading size="lg" color="primary.500" alignSelf="center" mb="6">
        Welcome Back
      </Heading>
      <VStack space={4} width="100%" mt="4">
        <Input
          variant="filled"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input
          variant="filled"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        {loading ? (
          <Spinner accessibilityLabel="Logging in..." />
        ) : (
          <Button mt="2" onPress={onRegister}>
            Log In
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default RegisterView;
