import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation register(
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      id
      email
      firstName
      lastName
      profileImage
      contactPhone
      token
      type
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      profileImage
      contactPhone
      token
      type
    }
  }
`;
