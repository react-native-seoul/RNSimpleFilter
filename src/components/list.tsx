import React, { Component } from 'react'
import {
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native'
import frameworks from '../../frameworks.json'
import { tableTitle } from '../utils/consoleFuncs'

type frameworkDatum = {
  title: string,
  url: string
}

type ListProps = {
  filterBy: string
}

type ListState = ListProps & {
  filteredData: frameworkDatum[]
}

type SnapShot = { // snapshot 타입을 지정하세요 
  [s: string]: any
}

const filterData = (filterBy: string):frameworkDatum[] => {
  if (filterBy.length > 0 ) {
    return frameworks.filter((item: frameworkDatum) => {
      const cmpTitle = item.title.toLowerCase()
      const cmpFilter = filterBy.toLowerCase()
      return cmpTitle.indexOf(cmpFilter) > -1
    })
  }
  return frameworks
}

type keyExtractor = (item: frameworkDatum) => string

const _keyExtractor: keyExtractor = item => item.title

const _renderItem: ListRenderItem<frameworkDatum> = ({ item }) => (
  <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
    <Text style={styles.itemTextStyle}>
      {item.title}
    </Text>
  </TouchableOpacity>
)

/** 
 * @namespace ChildListComponent
 */
class List extends Component<ListProps, ListState> {
  static getDerivedStateFromProps(nextProps: ListProps, prevState: ListState) {
    const { filterBy } = nextProps
    let returnObj = null;
    console.log('List(자식) 컴포넌트 업데이트 필요유무 체크')
    if (filterBy !== prevState.filterBy) {
      const filteredData = filterData(nextProps.filterBy)
      returnObj = {
        filterBy,
        filteredData
      }      
    }
    console.log(`업데이트 필요${returnObj ? '' : '없음'}`)
    console.table({
      List: {
        'LifeCycle Hook Method': 'static getDerivedStateFromProps',
        prevState: JSON.stringify(prevState), 
        nextState: JSON.stringify(returnObj), 
        prevProps: undefined, 
        nextProps: JSON.stringify(nextProps), 
        snapshot: undefined
      }
    }, tableTitle)
    return returnObj
  }

  constructor(props: ListProps) {
    super(props)
    this.state = {
      filterBy: '',
      filteredData: frameworks
    }
    console.log('List(자식) 컴포넌트 시작')
    console.table({
      List: {
        'LifeCycle Hook Method': 'constructor',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)
  }

  shouldComponentUpdate(nextProps: ListProps, nextState: ListState) {    
    let returnBoolean = true
    if (nextState.filterBy === this.state.filterBy) {
      console.log('List(자식) 컴포넌트 업데이트 하지않음')
      returnBoolean = false
    } else {
      console.log('List(자식) 컴포넌트 업데이트 시작')
    }
    console.table({
      List: {
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
    console.log('List(자식) 컴포넌트 마운트됨')
    console.table({
      List: {
        'LifeCycle Hook Method': 'componentDidMount',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)    
  }

  getSnapshotBeforeUpdate(prevProps: ListProps, prevState: ListState) {
    console.table({
      List: {
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

  componentDidUpdate(prevProps: ListProps, prevState: ListState, snapShot: SnapShot) {
    console.log('List(자식) 컴포넌트 렌더됨')
    console.table({
      List: {
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
    console.log('List(자식) 컴포넌트 언마운트')
    console.table({
      List: {
        'LifeCycle Hook Method': 'componentWillUnmount',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)    
  }

  render() {
    const { filteredData } = this.state
    console.log('List(자식) 컴포넌트 렌더')
    console.table({
      List: {
        'LifeCycle Hook Method': 'render',
        prevState: undefined, 
        nextState: JSON.stringify(this.state), 
        prevProps: undefined, 
        nextProps: JSON.stringify(this.props), 
        snapshot: undefined
      }
    }, tableTitle)
    return (
      <FlatList 
        contentContainerStyle={styles.filterContainer}
        data={filteredData}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    )
  }
}

export default List

const styles = StyleSheet.create({
  filterContainer: {
    alignSelf: 'center'
  },
  itemTextStyle: {
    fontSize: 15,
    color: '#444'
  }
})