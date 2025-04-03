import React from 'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'
import MoviesList from './MoviesList'
import TheaterList from './TheaterList'

function Admin() {
  const items = [
    {
      key: '1',
      label: 'Movies',
      children: <MoviesList />,
    },
    {
      key: '2',
      label: 'Theaters',
      children: <TheaterList />,
    },
  ];

  return (
    <div>
      <PageTitle title="Admin" />
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default Admin
