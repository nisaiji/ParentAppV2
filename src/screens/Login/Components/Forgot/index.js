import React from 'react';
import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import {styles} from './styles';

export default function ForgotPassword() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.logoTitle}>LOGO</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>To Update Password,</Text>
          <Text style={styles.instruction}>
            Please contact the admin of the school.
          </Text>
          <Text style={styles.label}>Phone, email or username</Text>
          <TextInput
            style={styles.input}
            placeholder="Email / Phone / Username"
            placeholderTextColor={'black'}
          />
          <Text style={styles.label}>Please enter your message here</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Your message"
            multiline
          />
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Send Message</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
