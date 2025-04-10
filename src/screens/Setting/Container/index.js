/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundView from '../../../components/BackgroundView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import childDummy from '../../../assets/images/childDummy.png'
import rightArrow from '../../../assets/images/rightArrow.png'
import pencilIcon from '../../../assets/images/pencilIcon.png'
import logoutIcon from '../../../assets/images/logout.png'
import infoIcon from '../../../assets/images/info.png'
import smartPhoneIcon from '../../../assets/images/smartphone.png'
import feedbackIcon from '../../../assets/images/feedback.png'
import faqIcon from '../../../assets/images/faq.png'
import passwordIcon from '../../../assets/images/password.png'
import { globalStyle } from '../../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../../../navigation/constant';
import ConfirmPopup from '../../../components/ConfirmPopup';

function Setting() {
  const navigation = useNavigation()
  const [logoutPopup, setLogoutPopup] = useState(false)

  const onChangePassword = () => {
navigation.navigate(ROUTE.CHANGE_PASSWORD)
  }
  const onEditProfile = () => {
    navigation.navigate(ROUTE.EDIT_PROFILE)
      }
      const onLogout = () => {
        
      }

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
          <TouchableOpacity onPress={onEditProfile} hitSlop={globalStyle.hitSlop10} style={styles.pencilIcon}>
            <Image source={pencilIcon} style={styles.pencilIcon} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View style={styles.listItemCointainer}>
          <Text style={[styles.parentName, styles.mb16]}>Account Settings</Text>
          <View style={styles.itemContainer}>
            <View style={styles.itemLeftContainer}>
              <Image source={passwordIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Change password
              </Text>
            </View>
            <TouchableOpacity onPress={onChangePassword}>
            <Image source={rightArrow} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listItemCointainer}>
          <Text style={[styles.parentName, styles.mb16]}>Support</Text>
          <View style={styles.combinedBG}>
          <View style={[styles.itemContainer, styles.combinedBGItem]}>
            <View style={styles.itemLeftContainer}>
              <Image source={faqIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Frequently asked questions
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={rightArrow} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={styles.borderBottom}/>
          <View style={[styles.itemContainer, styles.combinedBGItem]}>
            <View style={styles.itemLeftContainer}>
              <Image source={feedbackIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Share feedback
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={rightArrow} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={styles.borderBottom}/>
          <View style={[styles.itemContainer, styles.combinedBGItem]}>
            <View style={styles.itemLeftContainer}>
              <Image source={smartPhoneIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              App tour
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={rightArrow} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        <View style={styles.listItemCointainer}>
          <Text style={[styles.parentName, styles.mb16]}>More</Text>
          <View style={[styles.itemContainer,styles.mb20]}>
            <View style={styles.itemLeftContainer}>
              <Image source={infoIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              About us
              </Text>
            </View>
            <TouchableOpacity>
            <Image source={rightArrow} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <View style={[styles.itemContainer, styles.mb40]}>
            <View style={styles.itemLeftContainer}>
              <Image source={logoutIcon} style={styles.pencilIcon} resizeMode='contain'/>
              <Text style={[styles.parentName,styles.itemLabel]}>
              Logout
              </Text>
            </View>
            <TouchableOpacity onPress={() => setLogoutPopup(true)}>
            <Image source={rightArrow} style={styles.pencilIcon} resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          
        </View>
        </ScrollView>
        {/* confirm popup */}
      <ConfirmPopup
        isVisible={logoutPopup}
        onClose={() => setLogoutPopup(false)}
        onConfirm={() => {
          onLogout()
        }}
      />
      </SafeAreaView>
    </BackgroundView>
  );
}

export default Setting;
