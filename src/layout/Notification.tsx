import React from 'react'
import { AppNotification } from '../api/interfaces'
import { PICT_URL } from '../api/axiosConfig'

import moment from 'moment'
import { Link } from 'react-router-dom'
import { updateNotifStatus } from '../api/actions'

type Props = {
  data: AppNotification
  closeNotif: () => void
}

const Notification = ({ data, closeNotif }: Props) => {
  function generateBGImgUrl(filePath: string) {
    if (filePath.includes('http')) return filePath

    const normalizedFilePath = filePath.replace(/\\/g, '/')

    const cleanFilePath = encodeURI(normalizedFilePath)

    return `${PICT_URL}${cleanFilePath}`
  }

  return (
    <div className='item' style={{ opacity: data.status == 0 ? 1 : 0.5 }}>
      <div
        className='avatar'
        style={{
          backgroundImage: `url(${generateBGImgUrl(data.avatar ?? '')})`,
        }}
      ></div>
      <div className='content'>
        <div className='alert-info'>
          <span>{data.nickname}</span> {data.content}
        </div>
        <div className='alert-date'>{moment(data.date).fromNow()}</div>
      </div>
      {data.status == 0 && <div className='isReaded'></div>}
      <Link
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
        to={data.link}
        onClick={() => {
          closeNotif(), updateNotifStatus(data._id)
        }}
      ></Link>
    </div>
  )
}

export default Notification
