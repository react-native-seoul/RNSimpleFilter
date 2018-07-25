import React, { Component, ErrorInfo } from 'react'
import { SafeAreaView } from 'react-native'
import FilterContainer from './filterContainer'

/** 
 * @namespace MainApp 
 */
export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FilterContainer />
      </SafeAreaView>
    )
  }
}
