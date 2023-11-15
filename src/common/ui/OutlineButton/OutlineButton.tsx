import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {FlatButton} from '../FlatButton';
import {IFlatButtonProps} from '../FlatButton/FlatButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  text: {
    color: 'white',
  },
});

interface IOutlineButtonProps extends IFlatButtonProps {}

export default function OutlineButton({
  style,
  ...rest
}: PropsWithChildren<IOutlineButtonProps>) {
  return (
    <FlatButton
      style={{...styles.container, ...style}}
      textStyle={styles.text}
      {...rest}
    />
  );
}
