import React, { PureComponent } from 'react'
import {
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native'
import frameworks from '../frameworks.json'
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
class List extends PureComponent<ListProps, ListState> {
  static getDerivedStateFromProps(nextProps: ListProps, prevState: ListState) {
    const { filterBy } = nextProps
    if (filterBy !== prevState.filterBy) {
      const filteredData = filterData(nextProps.filterBy)
      console.log('List(자식) 컴포넌트 업데이트 시작')
      console.table({
        List: {
          'LifeCycle Hook Method': 'static getDerivedStateFromProps',
          prevState: JSON.stringify(prevState), 
          nextState: undefined, 
          prevProps: undefined, 
          nextProps: JSON.stringify(nextProps), 
          snapshot: undefined
        }
      }, tableTitle)
      return {
        filterBy,
        filteredData
      }
    }
    return null
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

  componentDidMount() {
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
    console.log('List(자식) 컴포넌트 마운트됨')
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: filterState) {
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

  componentDidUpdate(prevProps: any, prevState: filterState, snapShot: any) {
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
    console.log('List(자식) 컴포넌트 렌더됨')
  }

  componentWillUnmount() {
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
    console.log('List(자식) 컴포넌트 언마운트')
  }

  render() {
    const { filteredData } = this.state
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