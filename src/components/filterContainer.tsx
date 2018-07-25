import React, {
  Component, 
  createRef,
  RefObject,
} from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  StyleSheet
} from 'react-native'
import List from './list'
import { tableTitle } from '../utils/consoleFuncs'
import ErrorBoundary from '../utils/errorBoundary';

type filterState = {
  filterBy: string,
}

/** 
 * @namespace ParentFilterComponent
 */
export default class FilterContainer extends Component<any, filterState> {
  static getDerivedStateFromProps(nextProps: any, prevState: filterState) {
    console.log('FilterContainer(부모) 컴포넌트 업데이트 필요유무 체크')
    console.log('업데이트 필요없음')
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

  shouldComponentUpdate(nextProps: any, nextState: filterState) {
    let returnBoolean = true    
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      console.log('FilterContainer(부모) 컴포넌트 업데이트 하지않음 ')
      returnBoolean = false
    } else {
      console.log('FilterContainer(부모) 컴포넌트 업데이트 시작')
    } 
    console.table({
      FilterContainer: {
        'LifeCycle Hook Method': 'shouldComponentUpdate',
        prevState: JSON.stringify(this.state), 
        nextState: JSON.stringify(nextState), 
        prevProps: JSON.stringify(this.props),
        nextProps: JSON.stringify(nextProps), 
        snapshot: undefined
      }
    }, tableTitle)
    return returnBoolean   
  }

  componentDidMount() {
    console.log('FilterContainer(부모) 컴포넌트 마운트됨')
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
    console.log('FilterContainer(부모) 컴포넌트 렌더됨')
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
  }

  componentWillUnmount() {
    console.log('FilterContainer(부모) 컴포넌트 언마운트')
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
    const { filterBy } = this.state;
    console.log('FilterContainer(부모) 컴포넌트 렌더')
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
        <View style={styles.topPart}>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.imageLogo}
              source={require('../../assets/RNS.png')}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>리액트 프레임워크/패키지 필터</Text>
          <TextInput
            ref={this.textInputRef}
            style={styles.filterStyle}
            placeholder="필터를 입력해주세요."
            onChangeText={this.updateFilter}
            onBlur={this.onBlurClear}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.bottomPart}>
          <List filterBy={filterBy} />
        </View>         
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
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: '90%',
    height: 60, 
    alignSelf: 'center',
  },
  imageLogo: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#5E9EF1',
    textAlign: 'center'
  },
  filterStyle: {
    width: '75%',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 30,
    height: 40,
    borderWidth: 1,
    borderColor: '#cbcbcb',
    borderRadius: 5
  },
  topPart: {
    flex: 3,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  bottomPart: {
    flex: 4,
    alignSelf: 'stretch'
  }
})