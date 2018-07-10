import React, { 
  PureComponent, 
  createRef,
  SFC,
  RefObject,
  ErrorInfo
 } from 'react'
import { 
  Linking,
  StyleSheet, 
  Text, 
  TextInput, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  FlatList,
  TouchableOpacity,
  ListRenderItem
} from 'react-native'
import frameworks from './frameworks.json'
import ErrorMsg from './errorMsg'

type frameworkDatum = {
  title: string,
  url: string
}

type keyExtractor = (item: frameworkDatum) => string

type State = {
  filterBy: string,
  hasError: boolean,
  errorInfo?: ErrorInfo
}

const _keyExtractor: keyExtractor = item => item.title

const _renderItem: ListRenderItem<frameworkDatum> = ({ item }) => (
  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
    <Text style={styles.itemTextStyle}>
      {item.title}
    </Text>
  </TouchableOpacity>
)

/** 
 * @member 자식 컴포넌트 
 */
const List: SFC<{ filterBy: State['filterBy'] }> = ({ filterBy }) => {
  const filteredData: frameworkDatum[] = filterBy.length > 0 
    ? frameworks.filter((item: frameworkDatum) => {
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

/** 
 * @class 부모 컴포넌트 
 */
export default class App extends PureComponent<null, State> {
  state = {
    filterBy: '',
    hasError: false,
    errorInfo: undefined
  }
  textInputRef: RefObject<TextInput> = createRef()

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (error) {
      this.setState({ 
        hasError: true,
        errorInfo: info
      })
    }    
  }

  updateFilter = (text: string) => {
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
    const { filterBy, hasError, errorInfo } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>        
          <Image 
            style={styles.imageContainer}
            source={require('./assets/RNS.png')}
          />
          <Text style={styles.title}>리액트 프레임워크/패키지 필터</Text>
          {hasError ? (
            <ErrorMsg info={errorInfo} />
          ) : (
            <KeyboardAvoidingView 
              behavior="padding" 
              enabled
            >
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
            </KeyboardAvoidingView>
          )}                      
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
  }
})
