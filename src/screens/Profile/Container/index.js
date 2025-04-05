import React, {useContext, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  FlatList,
  ImageBackground,
  RefreshControl,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
} from 'react-native';
import background from '@src/assets/images/background.png';
import editprofile from '@src/assets/images/editprofile.png';
import Signout from '@src/assets/images/Signout.png';
import help from '@src/assets/images/help.png';
import downarrow from '@src/assets/images/downarrow.png';
import tickIcon from '@src/assets/images/tickIcon.png'; // Import tick icon image
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {AuthContext} from '@src/context/AuthContext';
import Editpic from '@src/assets/images/Editpic.png';
import Path2 from '@src/assets/images/Path2.png';
import {axiosClient} from '../../../services/axiosClient';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../../components/Loader';

export default function ProfileScreen({navigation}) {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    language: 'English',
  });

  const {
    childrenData = [],
    currentChild,
    setCurrentChildIndex,
    fetchChildrenData,
  } = useContext(AuthContext);

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [childModelVisible, setChildModelVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const childRef = useRef();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      showCropGuidelines: true,
    })
      .then(image => {
        const base64Image = image.data;
        setImageUri(image.path);
        uploadImage(base64Image);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Failed to pick image');
        }
      });
  };

  const uploadImage = async base64Image => {
    try {
      const studentId = currentChild._id;
      setLoading(true);
      const response = await axiosClient.put(
        `/student/photo-upload/${studentId}`,
        {
          photo: base64Image,
        },
      );
      ToastAndroid.show(
        response.data.result,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
      await fetchChildrenData();
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.TOP, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSelect = language => {
    setForm({...form, language});
    setLanguageModalVisible(false);
  };

  const handleChildSelect = childIndex => {
    setCurrentChildIndex(childIndex);
    setChildModelVisible(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchChildrenData();
    } catch (e) {
      ToastAndroid.show(e, ToastAndroid.TOP, ToastAndroid.LONG);
    } finally {
      setRefreshing(false);
    }
  };

  const handleOutsidePress = () => {
    setChildModelVisible(false);
  };

  const renderModalContent = content => (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback>{content}</TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <View style={{flex: 1}}>
        {loading && (
          <View style={styles.loading}>
            <Loader />
          </View>
        )}

        <ImageBackground
          source={background}
          resizeMode="stretch"
          style={styles.image}>
          <View style={styles.header}>
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                onPress={() => setChildModelVisible(true)}
                style={styles.pickerTouchable}>
                <Text style={styles.selectedStudent}>
                  {currentChild?.firstname || ''}
                </Text>
                <Image
                  source={downarrow}
                  style={styles.downarrowImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profile}>
            <View style={styles.avatarContainer}>
              <Image
                alt=""
                source={{
                  uri: currentChild?.photo
                    ? `data:image/jpeg;base64,${currentChild?.photo}`
                    : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar}
              />
              <TouchableOpacity
                style={styles.editPicButton}
                onPress={handleImageUpload}>
                <Image alt="" source={Editpic} style={styles.Editpicicon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>
              {currentChild?.classId?.name || ''} -{' '}
              {currentChild?.section?.name || ''}
            </Text>
          </View>
        </ImageBackground>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.section}>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}
                  style={styles.row}>
                  <View style={styles.textWrap}>
                    <View style={[styles.rowIcon]}>
                      <Image source={editprofile} style={styles.Icon} />
                    </View>
                    <Text style={styles.rowLabel}>
                      {t('profileScreen.editInfo')}
                    </Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={Path2}
                    style={styles.buttonIcon1}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={styles.textWrap}>
                    <View style={[styles.rowIcon]}>
                      <Image source={help} style={styles.Icon} />
                    </View>
                    <Text style={styles.rowLabel}>
                      {t('profileScreen.help')}
                    </Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={Path2}
                    style={styles.buttonIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <View style={[styles.rowIcon]}>
                    <Image source={Signout} style={styles.Icon} />
                  </View>
                  <Text style={styles.rowLabel}>
                    {' '}
                    {t('profileScreen.logOut')}
                  </Text>
                  <View style={styles.rowSpacer} />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={languageModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setLanguageModalVisible(false)}>
          {renderModalContent(
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {' '}
                {t('profileScreen.language')}
              </Text>
              <FlatList
                data={languages}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleLanguageSelect(item)}
                    style={styles.languageOption}>
                    <Text style={styles.languageText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>,
          )}
        </Modal>

        <Modal
          visible={childModelVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setChildModelVisible(false)}>
          {renderModalContent(
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {' '}
                {t('profileScreen.selectChild')}
              </Text>
              <View>
                {childrenData.map((child, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChildSelect(index)}>
                    <View style={styles.childOption}>
                      <Text style={styles.languageText}>
                        {child.firstname} {child.lastname}
                      </Text>
                      {currentChild?.firstname === child.firstname && (
                        <Image
                          source={tickIcon} // Replace with your tick icon
                          style={styles.tickIcon}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>,
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
}
