
import React from 'react'
import { Spin } from 'antd'

const AuthContext = React.createContext();
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function authHandler(C) {
  class AuthHOC extends React.Component {
    static contextType = AuthContext;
    constructor(props, context) {
        super(props, context);
        this.state = {
            component: null,
            loading: false
        };
    }
    async componentDidMount() {
      try {
        this.setState({ loading: true })
        const result = await this.getUserInfo()
        if(result) {
          this.setState({
            component: C,
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.setState({ loading: false })
      }
    }

    getUserInfo = () => {
      return new Promise((resolve, reject) => {
        resolve({
          name: 'robot',
          id: 1
        })
      })
    }

    render() {
      const { loading, component } = this.state
      return loading ? <Spin tip="Loading..."/> : component ? <C {...this.props}/> : <div>403</div>
    }
  }
  AuthHOC.displayName = `AuthHOC_(${getDisplayName(C)})`;
  return AuthHOC
}