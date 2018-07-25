import React, { PureComponent, ErrorInfo } from 'react'
import ErrorMsg from '../utils/errorMsg'
import { tableTitle } from '../utils/consoleFuncs'

type appState = {
  hasError: boolean,
  errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends PureComponent<any, appState> {
  state = { 
    hasError: false,
    errorInfo: undefined
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
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

  render() {
    const { hasError, errorInfo } = this.state
    if (hasError) {
      return <ErrorMsg info={errorInfo} />
    }  
    return this.props.children;
  }
}