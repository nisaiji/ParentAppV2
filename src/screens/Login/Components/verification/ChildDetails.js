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
import add from '../../../../assets/images/add.png';
import verifyed from '../../../../assets/images/verifyed.png';
import {styles} from './styles';
import BackgroundView from '../../../../components/BackgroundView';
import { useTranslation } from 'react-i18next';
import Header from '../../../../components/Header';

export default function ChildDetail() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [t] = useTranslation();

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header heading={t('childDetail.heading')} noBack />

      <View style={styles.verifiedContainer}>
        <Text style={styles.nameText}>Priyanka Sharma</Text>
        <View style={styles.verifiedWrapper}>
          <Text style={styles.verifyedText}>Verified</Text>
          <Image source={verifyed} style={styles.verifiedIcon} />
        </View>
      </View>

      {/* New Password */}
      <Text style={styles.label}>Name</Text>
      <View style={styles.inputContainerWithIcon}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      {/* Confirm Password */}
      <Text style={styles.label}>{`Student ID (optional)`}</Text>
      <View style={styles.inputContainerWithIcon}>
        <TextInput
          style={styles.input}
          placeholder="12 digit ID"
          placeholderTextColor="#aaa"
          value={id}
          onChangeText={text => setId(text)}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={[styles.continueButton, {marginTop: 35}]}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Add Child Button */}
      <TouchableOpacity style={[styles.addChildButton, {marginBottom: 0}]}>
        <Image source={add} style={styles.addIcon} />
        <Text style={styles.addChildText}>Add Child</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </BackgroundView>
  );
}
