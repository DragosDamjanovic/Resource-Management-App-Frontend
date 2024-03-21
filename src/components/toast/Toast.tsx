import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  Easing
} from 'react-native';

import { toast as style } from '@style';

import { Icons } from '@assets';
import { capitalize } from '@core/utils';

import { vs } from '@assets/Metrics';

interface ToastProps {
  title: string;
  type: 'success' | 'error' | 'info';
  hideToast: (toast: Toast) => void;
  toast: Toast; // Assuming there is a Toast type or interface you have defined elsewhere
}

export default class Toast extends Component<ToastProps> {
  animatedHeight: Animated.Value;
  animatedOpacity: Animated.Value;
  animatedSpin: Animated.Value;

  constructor(props: ToastProps) {
    super(props);

    this.animatedHeight = new Animated.Value(0);
    this.animatedOpacity = new Animated.Value(0);
    this.animatedSpin = new Animated.Value(0);
  }

  componentDidMount() {
    this.show();
  }

  render() {
    const { title, type } = this.props;

    return (
      <Animated.View
        style={[
          style.toastContainer,
          {
            transform: [
              {
                translateY: this.animatedHeight.interpolate({
                  inputRange: [0, 1, 2, 3, 4],
                  outputRange: [vs(-20), vs(6), vs(0), vs(6), vs(-20)],
                }),
              },
              {
                rotateX: this.animatedSpin.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['90deg', '0deg'],
                }),
              },
              { perspective: 1000 },
            ],
            opacity: this.animatedOpacity,
          },
          toastTypeStyle(type),
        ]}
      >
        <Image source={Icons[`toast${capitalize(type)}`] as ImageSourcePropType} />
        <View style={style.textWrapper}>
          <Text style={style.title}>{capitalize(type)}</Text>
          <Text style={style.subtitle}>{title}</Text>
        </View>
        <TouchableOpacity style={style.closeToast} onPress={this.hide}>
          <Image source={Icons.toastClose as ImageSourcePropType} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  show = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.animatedHeight, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedSpin, {
          toValue: 1,
          duration: 300,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedOpacity, {
          toValue: 1,
          duration: 300,
          delay: 0,
          useNativeDriver: true
        })
      ]),
      Animated.timing(this.animatedHeight, {
        toValue: 2,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start(() => setTimeout(this.hide, 3500));
  };
  hide = () => {
    Animated.sequence([
      Animated.timing(this.animatedHeight, {
        toValue: 3,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.parallel([
        Animated.timing(this.animatedHeight, {
          toValue: 4,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedSpin, {
          toValue: 0,
          duration: 300,
          delay: 0,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedOpacity, {
          toValue: 0,
          duration: 300,
          delay: 0,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      const { hideToast, toast } = this.props;
      hideToast(toast);
    });
  };
}

const toastTypeStyle = (type: 'success' | 'error' | 'info') => {
  switch (type) {
    case 'success':
      return style.success;
    case 'error':
      return style.error;
    case 'info':
      return style.info;
    default:
      return {};
  }
};