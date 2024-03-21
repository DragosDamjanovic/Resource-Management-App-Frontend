import React, {useState} from 'react';
import RegisterView from './RegisterView';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Perform the Register logic
      //await Register(email, password);
      // Handle success - navigate to the next screen or show success message
    } catch (error) {
      // Handle errors - show error message
    }
    setLoading(false);
  };

  // More logic and handlers can be added here

  return (
    <RegisterView
      email={email}
      password={password}
      firstName={firstName}
      lastName={lastName}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
      setFirstName={setFirstName}
      setLastName={setLastName}
      onRegister={handleRegister}
    />
  );
}
