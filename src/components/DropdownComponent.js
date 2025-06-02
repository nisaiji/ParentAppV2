import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {scale} from 'react-native-size-matters';
import {Colors, Fonts} from '../theme/fonts';

/**
 * DropdownComponent
 *
 * A reusable dropdown component built using `react-native-element-dropdown`.
 * Supports optional search functionality and customized theming.
 *
 * Props:
 * @param {Array} items - List of dropdown options. Each item must have `label` and `value` keys.
 * @param {string} desc - Placeholder text for the dropdown.
 * @param {string|number} selectedValue - The currently selected value.
 * @param {Function} onSelect - Callback when an item is selected. Receives the selected item object.
 * @param {boolean} [searchable=false] - Whether the dropdown supports search input.
 *
 * Example item format:
 * [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]
 */
const DropdownComponent = ({
  items,
  desc,
  selectedValue,
  onSelect,
  searchable = false,
}) => {
  const [value, setValue] = useState(selectedValue);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
    </View>
  );

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.dropdownContainer}
      itemContainerStyle={styles.itemContainer}
      itemTextStyle={styles.textItem}
      data={items}
      search={searchable}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={desc}
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        onSelect(item);
      }}
      renderItem={renderItem}
      testID={'dropdown'}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: Colors.COLOR_3,
    marginTop: 5,
  },
  dropdownContainer: {
    backgroundColor: Colors.BLACK,
    borderColor: Colors.COLOR_3,
  },
  itemContainer: {
    backgroundColor: Colors.BLACK,
    marginVertical: scale(10),
    marginHorizontal: scale(14),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
  },
  textItem: {
    fontSize: scale(14),
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
  placeholderStyle: {
    fontSize: scale(14),
    color: Colors.COLOR_3,
    fontFamily: Fonts.REGULAR,
  },
  selectedTextStyle: {
    fontSize: scale(14),
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: Colors.WHITE,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: scale(14),
    color: Colors.WHITE,
    backgroundColor: Colors.BLACK,
    borderColor: Colors.COLOR_3,
    fontFamily: Fonts.REGULAR,
  },
});
