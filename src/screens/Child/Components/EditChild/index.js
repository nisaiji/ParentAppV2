/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View, Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import BackgroundView from '@src/components/BackgroundView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../../components/Header';
import childDummy from '../../../../assets/images/childDummy.png'
import pencilIcon from '../../../../assets/images/childDummy.png'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';


function EditChild() {
  return (
    <GestureHandlerRootView>
      <BackgroundView>
      <SafeAreaView style={styles.container}>
        <Header heading='Child Settings' />
        <ScrollView style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.schoolName}>IPS Academy</Text>
            <View style={styles.classContainer}>
              <Text style={styles.classSec}>11th - C</Text>
            </View>
          </View>
          <View style={styles.childImgContainer}>
            <Image source={childDummy} resizeMode={'contain'} style={styles.childImg} />
            <Image source={pencilIcon} resizeMode={'contain'} style={styles.pencilIcon} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>Personal Information</Text>
            <View style={styles.formInput}>
            <Text style={styles.label}>First name</Text>
            <TextInput style={styles.textInput} placeholder='Student’s first name' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.textInput} placeholder='Student’s last name' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.textInput} placeholder='Select gender' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Blood group</Text>
            <TextInput style={styles.textInput} placeholder='Select blood group' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Date of birth</Text>
            <TextInput style={styles.textInput} placeholder='MM/DD/YYYY' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Address</Text>
            <TextInput multiline numberOfLines={3} style={[styles.textInput]} textAlignVertical="top" placeholder='Complete address' placeholderTextColor={styles.placeholderText}/>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonLabel}>Update & save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundView>
    </GestureHandlerRootView>
  );
}

export default EditChild;
