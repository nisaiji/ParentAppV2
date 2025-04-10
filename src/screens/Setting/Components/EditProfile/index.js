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
import circlePencilIcon from '../../../../assets/images/circlePencil.png'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

function EditProfile() {
  return (
    <GestureHandlerRootView>
      <BackgroundView>
      <SafeAreaView style={styles.container}>
        <Header heading='Edit Profile' style={styles.header}/>
        <ScrollView style={styles.innerContainer}>
          <View style={styles.childImgContainer}>
            <Image source={childDummy} resizeMode={'contain'} style={styles.childImg} />
            <TouchableOpacity style={styles.pencilIconView}>
            <Image source={circlePencilIcon} resizeMode={'contain'} style={styles.pencilIcon} />
            </TouchableOpacity>
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
            <Text style={styles.label}>Age</Text>
            <TextInput style={styles.textInput} placeholder='Select age' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.textInput} placeholder='Enter email' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Contact</Text>
            <TextInput style={styles.textInput} placeholder='Enter contact number' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Qualification</Text>
            <TextInput style={styles.textInput} placeholder='Enter qualification' placeholderTextColor={styles.placeholderText}/>
            </View>
            <View style={styles.formInput}>
            <Text style={styles.label}>Occupation</Text>
            <TextInput style={styles.textInput} placeholder='Enter occupation' placeholderTextColor={styles.placeholderText}/>
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

export default EditProfile;
