import React, { PureComponent, createRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  FlatList 
} from 'react-native';

const frameworks = [
  'React', 
  'React-Native', 
  'Proton-Native', 
  'Redux',
  'MobX',
  'React-Router'
]

const _keyExtractor = item => item

const _renderItem = ({ item }) => (
  <Text style={styles.itemTextStyle}>
    {item}
  </Text>
)

// 자식 컴포넌트
const List = ({ filterBy }) => {
  const filteredData = filterBy.length > 0 
    ? frameworks.filter(item => item.indexOf(filterBy) > -1)
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
    filterBy: ''
  }
  textInputRef = createRef()

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
    const { filterBy } = this.state;
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
            <TextInput
              ref={this.textInputRef}
              style={styles.filterStyle}
              placeholder="필터를 입력해주세요."
              onChangeText={this.updateFilter}
              onBlur={this.onBlurClear}
            />
            <List filterBy={filterBy} />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
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
});
