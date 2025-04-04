import React from 'react'
import PageTitle from '../../components/PageTitle'
import {Tabs} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import TheatresList from './TheatresList'
import Bookings from './Bookings'

function Profile() {
  const items = [
    {
      key: '1',
      label: 'Bookings',
      children: <Bookings />,
    },
    {
      key: '2',
      label: 'Theaters',
      children: <TheatresList />,
    },
  ]
  return (
    <div>
      <PageTitle title="Profile" />
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default Profile
