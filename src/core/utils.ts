import { Toast } from 'native-base';

interface GraphQLError {
  message: string;
  // You can include more specific properties of the GraphQL error if needed
}

interface ErrorWithGraphQLErrors {
  graphQLErrors?: GraphQLError[];
  message?: string;
  // You can include more specific properties of the error if needed
}

// Define an interface for language strings used in the validation messages
interface ValidationLanguage {
  TOAST_INVALID_EMAIL_FORMAT: string;
  TOAST_EMPTY_FIELDS: string;
  TOAST_INVALID_PASSWORD: string;
  TOAST_NON_MATCHING_PASSWORD: string;
  TOAST_SOMETHING_WENT_WRONG: string; 
}

// Define the type for the displayToast function
type DisplayToastFunction = (message: string, type: 'error' | 'success' | 'info') => void;

// Utilize a regular expression to match a proper email
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Utilize a regular expression to match the password requirements
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const Validate = {
  emailNotRequired: (email: string, lang: ValidationLanguage, displayToast: DisplayToastFunction): boolean => {
    if (!email) {
      return false;
    }
    if (!emailRegex.test(email.toLowerCase())) {
      Toast.show({
        description: lang.TOAST_EMPTY_FIELDS,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    return true;
  },
  email: (email: string, lang: ValidationLanguage, displayToast: DisplayToastFunction): boolean => {
    if (!email) {
      Toast.show({
        description: lang.TOAST_EMPTY_FIELDS,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      Toast.show({
        description: lang.TOAST_EMPTY_FIELDS,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    return true;
  },
  password: (password: string, lang: ValidationLanguage, displayToast: DisplayToastFunction): boolean => {
    if (!password) {
      Toast.show({
        description: lang.TOAST_EMPTY_FIELDS,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    if (!passwordRegex.test(password)) {
      Toast.show({
        description: lang.TOAST_INVALID_PASSWORD,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    return true;
  },
  confirmPassword: (password: string, confirmed: string, lang: ValidationLanguage, displayToast: DisplayToastFunction): boolean => {
    if (!confirmed) {
      Toast.show({
        description: lang.TOAST_EMPTY_FIELDS,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    if (password !== confirmed) {
      Toast.show({
        description: lang.TOAST_NON_MATCHING_PASSWORD,
        //type: 'error',  
        duration: 5000 
      });
      return false;
    }
    return true;
  },
};

export const ParseErrorMessage = (
  error: ErrorWithGraphQLErrors,
  lang: ValidationLanguage,
  displayToast: DisplayToastFunction
) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const errorMessage = lang[error.graphQLErrors[0].message as keyof ValidationLanguage] || lang.TOAST_SOMETHING_WENT_WRONG;
    Toast.show({
      description: errorMessage,
      //type: 'error', 
      duration: 5000 
    });
  } else {
    const fallbackMessage = error.message && lang[error.message as keyof ValidationLanguage] || lang.TOAST_SOMETHING_WENT_WRONG;
    Toast.show({
      title: fallbackMessage,
      // type: 'error', uncomment this if 'type' is supported in the version of NativeBase you are using
      duration: 5000 
    });
  }
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};