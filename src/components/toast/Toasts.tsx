import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { hideToast } from '../../../core/redux/actions/app';
import Toast from './Toast';
import { RootState } from '../../../core/redux/store'; // Adjust the path as necessary

// Assuming you have a 'styles' object in '@styles'
import styles from '@styles';

// Define the props for the individual Toast component
interface ToastProps {
  message: string;
  type: string; // Or a more specific type, like 'success' | 'error' | 'info'
}

// Map the state from Redux store to the component's props
const mapStateToProps = (state: RootState) => ({
  lang: state.app.lang,
  toasts: state.app.toasts as ToastProps[]
});

// Map the dispatch to props
const mapDispatchToProps = {
  hideToast
};

// Create connector and infer props type from it
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

// Component Props include Redux props and its own props if there are any
type ToastsProps = PropsFromRedux;

class Toasts extends Component<ToastsProps> {
  render() {
    const { lang, toasts, hideToast } = this.props;
    return toasts.length ? (
      <View style={styles.container}>
        <MappedToasts lang={lang} toasts={toasts} hideToast={hideToast} />
      </View>
    ) : null;
  }
}

const MappedToasts: React.FC<{ lang: any; toasts: ToastProps[]; hideToast: typeof hideToast }> = ({ lang, toasts, hideToast }) => {
  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          lang={lang}
          key={index}
          title={toast.message}
          type={toast.type}
          toast={toast}
          hideToast={hideToast}
        />
      ))}
    </>
  );
};

export default connector(Toasts);
