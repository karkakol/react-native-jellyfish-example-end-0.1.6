import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';
import {
  type GestureResponderEvent,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {AdditionalColors, BrandColors} from '../utils/Colors.ts';

const IconSize = 24;

type ButtonTypeName = 'primary' | 'disconnect';

type InCallButtonProps = {
  type?: ButtonTypeName;
  onPress: (event: GestureResponderEvent) => void;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
};

const InCallButton = ({
  type = 'primary',
  onPress,
  iconName,
}: InCallButtonProps) => {
  return (
    <TouchableHighlight onPress={onPress} style={InCallButtonStyles.common}>
      <View style={GetStylesForButtonType(type)}>
        <MaterialCommunityIcons
          name={iconName}
          size={IconSize}
          color={GetIconColorForButtonType(type)}
        />
      </View>
    </TouchableHighlight>
  );
};

const GetStylesForButtonType = (type: ButtonTypeName) => {
  return [
    InCallButtonStyles.common,
    type === 'primary'
      ? InCallButtonStyles.primary
      : InCallButtonStyles.disconnect,
  ];
};

const GetIconColorForButtonType = (type: ButtonTypeName) => {
  switch (type) {
    case 'primary':
      return BrandColors.darkBlue100;
    case 'disconnect':
      return AdditionalColors.white;
  }
};

const InCallButtonStyles = StyleSheet.create({
  common: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    borderWidth: 1,
    borderColor: BrandColors.darkBlue80,
    borderStyle: 'solid',
    backgroundColor: AdditionalColors.white,
  },
  disconnect: {
    backgroundColor: AdditionalColors.red80,
  },
});

export default InCallButton;
