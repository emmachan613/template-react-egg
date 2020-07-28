import React from 'react';
import {
  Table,
  Space,
  Tag,
  Button
} from 'antd'
import authHandler from '@app/components/withAuth.jsx'
import Service from '@app/service/demo.js'

@authHandler
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.getList()
  }

  async getList() {
    const res = await Service.getList()
    if(res) {
      this.setState({list: res  })
    }
  }

  renderColumns() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button>Invite {record.name}</Button>
            <Button>Delete</Button>
          </Space>
        ),
      },
    ];
    return columns
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <Table
          border
          columns={this.renderColumns()}
          dataSource={list}
        />
      </div>
    )
  }
}

export default App