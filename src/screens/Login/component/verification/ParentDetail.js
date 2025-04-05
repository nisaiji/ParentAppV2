import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import {styles} from './styles';

export default function ParentDetailScreen() {
  const [name, setName] = useState('');
  const [optionalName, setOptionalName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={leftArrow} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.title}>Parent Details</Text>
      </View>

      {/* New Password */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainerWithIcon}>
        <TextInput
          style={styles.input}
          placeholder="Father's / Mother's name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>{`Co-parent's name (optional)`}</Text>
      <View style={styles.inputContainerWithIcon}>
        <TextInput
          style={styles.input}
          placeholder="Father's / Mother's name"
          placeholderTextColor="#aaa"
          value={optionalName}
          onChangeText={text => setOptionalName(text)}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={[styles.continueButton, {marginBottom: 0}]}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
