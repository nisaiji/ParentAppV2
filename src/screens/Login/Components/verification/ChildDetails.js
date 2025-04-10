import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import leftArrow from '../../../../assets/images/leftArrow.png';
import add from '../../../../assets/images/add.png';
import verifyed from '../../../../assets/images/verifyed.png';
import {styles} from './styles';
import BackgroundView from '../../../../components/BackgroundView';
import { useTranslation } from 'react-i18next';
import Header from '../../../../components/Header';
import { ROUTE } from '../../../../navigation/constant';
import { useNavigation } from '@react-navigation/native';

export default function ChildDetail() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [childs, setChilds] = useState([])
  const [t] = useTranslation();
  const navigation = useNavigation()

  const verifyChild = () => {
    let temp = [...childs]
    temp.push({child: name, id: temp?.length + 1})
    setChilds(temp)
    setName("")
  }

  const addChild = () => {
    if(name?.length > 0 && childs?.length < 5) {
      verifyChild()
    }else{
      Alert.alert('upto 5 child can be added')
    }
  }

  const onSubmit = () => {
    navigation.navigate(ROUTE.TAB, {screen: ROUTE.SUCCESS_PAGE, params: {
          message: t('passwordSuccess'),
          nextRoute: ROUTE.PARENT_DETAIL
        }})
  }

  return (
    <BackgroundView>
      <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header heading={t('childDetail.heading')} noBack />

      {childs.map((item) => (
        <View style={styles.verifiedContainer} key={item?.id}>
        <Text style={styles.nameText}>{item?.child}</Text>
        <View style={styles.verifiedWrapper}>
          <Text style={styles.verifyedText}>Verified</Text>
          <Image source={verifyed} style={styles.verifiedIcon} />
        </View>
      </View>
      ))}

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
      {childs?.length === 0 && <TouchableOpacity onPress={onSubmit} style={[styles.continueButton, {marginTop: 28}]}>
        <Text style={styles.continueText}>{name?.length ? "Verify" : "Continue"}</Text>
      </TouchableOpacity>}

      {/* Add Child Button */}
      {childs?.length > 0 && <TouchableOpacity disabled={name?.length === 0 } onPress={addChild} style={[styles.addChildButton, {marginBottom: 0}]}>
        <Image source={add} style={styles.addIcon} resizeMode='contain'/>
        <Text style={styles.addChildText}>Add Child</Text>
      </TouchableOpacity>}
    </SafeAreaView>
    </BackgroundView>
  );
}
