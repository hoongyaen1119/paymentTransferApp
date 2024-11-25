import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomHeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  iconType?: 'Ionicons' | 'MaterialIcons';
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  iconType = 'Ionicons', 
}) => {

  const iconOption = (icon: string) => {
    if (iconType === 'MaterialIcons') {
      return <MaterialIcons name={icon} size={24} color="white" />;
    } else {
      return <Icon name={icon} size={24} color="white" />;
    }
  };

  return (
    <View style={[styles.headerContainer, { backgroundColor: 'black' }]}>
      <View style={styles.iconButton}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress}>
            {iconOption(leftIcon)}
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.headerTitle, { color: 'white' }]}>{title}</Text>
      <View style={styles.iconButton}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            {iconOption(rightIcon)}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    height: 24,
    width: 24,
  },
});

export default CustomHeader;