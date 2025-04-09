import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Colors, Fonts} from '@src/theme/fonts';
import colors from '@src/theme/colors';
import {scale} from 'react-native-size-matters';

const CustomDropdown = ({items, desc, onSelect, selectedValue, isDisabled}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = item => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  useEffect(() => {
    if (selectedValue) {
      const item = items.find(i => i.value === selectedValue);
      setSelectedItem(item);
    }
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      {isOpen && !isDisabled && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <TouchableOpacity
        style={[isOpen ? styles.dropdownOpen : styles.dropdownClose]}
        onPress={() => !isDisabled && setIsOpen(!isOpen)}
        activeOpacity={isDisabled ? 1 : 0.7}>
        <Text style={[styles.text, {color: isDisabled ? 'gray' : 'black'}]}>
          {selectedItem ? selectedItem.label : desc}
        </Text>
      </TouchableOpacity>
      {isOpen && !isDisabled && (
        <View style={styles.dropdownMenu}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}>
                <Text style={[styles.text]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  dropdownClose: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: colors.LIGHT_PURPLE,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  dropdownOpen: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: colors.LIGHT_PURPLE,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  dropdownMenu: {
    maxHeight: 200,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 0.5,
    zIndex: 10,
    borderColor: colors.LIGHT_PURPLE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  dropdownItem: {
    padding: 10,
    paddingHorizontal: scale(10),
    borderBottomColor: colors.LIGHT_PURPLE,
    borderBottomWidth: 0.25,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text: {
    fontSize: Size.font_14,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    paddingHorizontal: scale(5),
  },
  scrollContent: {
    paddingVertical: 5,
  },
});

export default CustomDropdown;
