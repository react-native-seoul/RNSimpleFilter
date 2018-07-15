import React, {
  PureComponent, 
  createRef,
  RefObject,
  ErrorInfo
} from 'react'
import {
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native'
import ErrorMsg from '../utils/errorMsg'
import List from './list'
import { tableTitle } from '../utils/consoleFuncs'

type filterState = {
  filterBy: string,
  hasError: boolean,
  errorInfo?: ErrorInfo
}

/** 
 * @namespace ParentFilterComponent
 */
export default class FilterContainer extends PureComponent<any, filterState> {
  static getDerivedStateFromProps(nextProps: any, prevState: filterState) {
    console.log('FilterContainer(부모) 컴포넌트 업데이트 시작')
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'static getDerivedStateFromProps',
        prevState: JSON.stringify(prevState), 
        nextState: null, 
        prevProps: undefined, 
        nextProps: JSON.stringify(nextProps), 
        snapshot: undefined
      }
    }, tableTitle)
    return null
  }

  private textInputRef: RefObject<TextInput> = createRef()
  constructor(props: any) {
    super(props)
    this.state = {
      filterBy: '',
      hasError: false,
      errorInfo: undefined
    }
    console.log('FilterContainer(부모) 컴포넌트 시작')
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'constructor',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(props), 
        snapshot: undefined
      }
    }, tableTitle)
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (error) {
      this.setState({ 
        hasError: true,
        errorInfo: info
      }, () => {
        console.log('List(자식)에 대한 에러 발견')
        console.table({
          FilterContainer: {
            'LifeCycle Hook Method': 'componentDidCatch',
            prevState: undefined, 
            nextState: JSON.stringify(this.state), 
            prevProps: undefined, 
            nextProps: JSON.stringify(this.props), 
            snapshot: undefined
          }
        }, tableTitle)
      })
    }    
  }

  componentDidMount() {
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'componentDidMount',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)
    console.log('FilterContainer(부모) 컴포넌트 마운트됨')
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: filterState) {
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'getSnapshotBeforeUpdate',
        prevState: JSON.stringify(prevState), 
        nextState: JSON.stringify(this.state), 
        prevProps: JSON.stringify(prevProps), 
        nextProps: JSON.stringify(this.props), 
        snapshot: null
      }
    }, tableTitle)
    return null
  }

  componentDidUpdate(prevProps: any, prevState: filterState, snapShot: any) {
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'componentDidUpdate',
        prevState: JSON.stringify(prevState), 
        nextState: JSON.stringify(this.state), 
        prevProps: JSON.stringify(prevProps), 
        nextProps: JSON.stringify(this.props), 
        snapshot: JSON.stringify(snapShot)
      }
    }, tableTitle)
    console.log('FilterContainer(부모) 컴포넌트 렌더됨')
  }

  componentWillUnmount() {
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'componentWillUnmount',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)
    console.log('FilterContainer(부모) 컴포넌트 언마운트')
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
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'render',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)
    return (
      <ScrollView contentContainerStyle={styles.container}>        
        <Image 
          style={styles.imageContainer}
          source={require('../assets/RNS.png')}
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
})