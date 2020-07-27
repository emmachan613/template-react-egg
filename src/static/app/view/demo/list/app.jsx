import React from 'react';
import authHandler from '@app/components/withAuth.jsx'

@authHandler
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>123</div>
    )
  }
}

export default App