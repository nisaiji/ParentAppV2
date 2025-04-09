/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BackgroundView from '../../../components/BackgroundView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import childDummy from '../../../assets/images/childDummy.png'
import pencilIcon from '../../../assets/images/pencilIcon.png'
import { globalStyle } from '../../../theme/fonts';
import { scale } from 'react-native-size-matters';

function Setting() {
  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
        <Header noBack heading='Settings' />
        <ScrollView>
        <View style={styles.personalDetailContainer}>
          <View style={styles.parentDetailLeft}>
            <Image source={childDummy} style={styles.childImg} resizeMode="contain" />
            <View>
              <Text style={styles.parentName}>Priyanka Sharma</Text>
              <Text style={styles.parentLabel}>Parent</Text>
            </View>
          </View>
          <TouchableOpacity hitSlop={globalStyle.hitSlop10} style={styles.pencilIcon}>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={styles.listItemCointainer}>
          <Text style={[styles.parentName, styles.mb16]}>Account Settings</Text>
          <View style={styles.itemContainer}>
            <View style={styles.itemLeftContainer}>
              <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Change password
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listItemCointainer}>
          <Text style={[styles.parentName, styles.mb16]}>Support</Text>
          <View style={styles.combinedBG}>
          <View style={[styles.itemContainer, styles.combinedBGItem]}>
            <View style={styles.itemLeftContainer}>
              <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Frequently asked questions
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={styles.borderBottom}/>
          <View style={[styles.itemContainer, styles.combinedBGItem]}>
            <View style={styles.itemLeftContainer}>
              <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Share feedback
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={styles.borderBottom}/>
          <View style={[styles.itemContainer, styles.combinedBGItem]}>
            <View style={styles.itemLeftContainer}>
              <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              App tour
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        <View style={styles.listItemCointainer}>
          <Text style={[styles.parentName, styles.mb16]}>More</Text>
          <View style={[styles.itemContainer,styles.mb20]}>
            <View style={styles.itemLeftContainer}>
              <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              About us
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={[styles.itemContainer, styles.mb40]}>
            <View style={styles.itemLeftContainer}>
              <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Logout
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          
        </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundView>
  );
}

export default Setting;
