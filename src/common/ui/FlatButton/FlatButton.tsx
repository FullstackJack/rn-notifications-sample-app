import React from 'react';
import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';

export interface IFlatButtonProps {
  onPress?: () => void;
  text: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
  testID?: string;
}

export default function FlatButton({
  style,
  textStyle,
  text,
  onPress,
  testID,
}: IFlatButtonProps) {
  const backgroundColor =
    style?.backgroundColor ?? styles.container.backgroundColor;
  return (
    <Pressable
      testID={testID}
      style={({pressed}) => [
        styles.container,
        style,
        {
          backgroundColor: pressed ? '#ccc' : backgroundColor,
        },
      ]}
      onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 'auto',
  },
});
