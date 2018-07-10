import React, { PureComponent, Fragment, createRef } from 'react'
import { 
  Linking,
  StyleSheet, 
  View,
  Text, 
  TextInput, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  FlatList,
  TouchableOpacity 
} from 'react-native'

const frameworks = [
  {
    title: 'React',
    url: 'https://reactjs.org/'
  },
  {
    title: 'React-Native',
    url: 'https://facebook.github.io/react-native/'
  },
  {
    title: 'Proton-Native',
    url: 'https://proton-native.js.org/'
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/'
  },
  {
    title: 'MobX',
    url: 'https://mobx.js.org/index.html'
  },
  {
    title: 'React-Router',
    url: 'https://reacttraining.com/react-router/'
  }  
]

const _keyExtractor = item => item.title

const _renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
    <Text style={styles.itemTextStyle}>
      {item.title}
    </Text>
  </TouchableOpacity>
)

// 자식 컴포넌트
const List = ({ filterBy }) => {
  const filteredData = filterBy.length > 0 
    ? frameworks.filter(item => {
        const cmpTitle = item.title.toLowerCase()
        const cmpFilter = filterBy.toLowerCase()
        return cmpTitle.indexOf(cmpFilter) > -1
      })
    : frameworks
  return (
    <FlatList 
      contentContainerStyle={styles.filterContainer}
      data={filteredData}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
    />
  )
}

//부모 컴포넌트
export default class App extends PureComponent {
  state = {
    filterBy: '',
    hasError: false
  }
  textInputRef = createRef()

  componentDidCatch(error) {
    if (error) {
      this.setState({ hasError: true })
    }    
  }

  updateFilter = text => {
    let returnedText = '';
    if (text.trim() !== '') {
      returnedText = text
    }
    if (this.textInputRef.current) {
      this.textInputRef.current.setNativeProps({ text: returnedText })
    }
    this.setState({ filterBy: returnedText })
  }

  onBlurClear = () => {    
    this.setState({ filterBy: '' }, () => {
      if (this.textInputRef.current) {
        this.textInputRef.current.clear()
      }
    })      
  }

  render() {
    const { filterBy, hasError } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView 
            style={styles.container} 
            behavior="padding" 
            enabled
          >
            <Image 
              style={styles.imageContainer}
              source={require('./assets/RNS.png')}
            />
            <Text style={styles.title}>리액트 프레임워크/패키지 필터</Text>
            {hasError ? (
              <View style={styles.errorMsg}>
                오류 발생! 새로고침을 해주세요.
              </View>
            ) : (
              <Fragment> 
                <TextInput
                  ref={this.textInputRef}
                  style={styles.filterStyle}
                  placeholder="필터를 입력해주세요."
                  onChangeText={this.updateFilter}
                  onBlur={this.onBlurClear}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <List filterBy={filterBy} />
              </Fragment>
            )}            
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    alignSelf: 'center'    
  },
  imageContainer: {
    alignSelf: 'center',
    resizeMode: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#5E9EF1'
  },
  filterStyle: {
    minWidth: '75%',
    textAlign: 'center',
    marginVertical: 30,
    height: 40,
    borderWidth: 1,
    borderColor: '#cbcbcb',
    borderRadius: 5
  },
  itemTextStyle: {
    fontSize: 15,
    color: '#444'
  },
  errorMsg: {
    flex: 1,
    justifyContent: 'center'
  }
})
