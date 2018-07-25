import React, { SFC, ErrorInfo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const ErrorMsg: SFC<{ info?: ErrorInfo }> = ({ info }) => (
  <View style={styles.errorMsgContainer}>
    <View style={styles.errorTitleContainer}>
      <MaterialIcons 
        name="error" 
        size={32} 
        color="#C70039" 
      />
      <Text style={styles.errorTitleText}>
        오류 발생! 새로고침을 해주세요.
      </Text>
    </View>
    {info && (
      <Text style={styles.errorContents}>
        {info}
      </Text>
    )}
  </View>
)

export default ErrorMsg

const styles = StyleSheet.create({
  errorMsgContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 110
  },
  errorTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  errorTitleText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666'
  },
  errorContents: {
    color: '#4d4d4d',
    fontSize: 13
  }
})