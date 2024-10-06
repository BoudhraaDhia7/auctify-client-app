import React, { useState, useEffect } from 'react'
import { toUtcDate } from '../../utils/helpers'
import { Classement, UserInfoRecieved } from '../../api/interfaces'
import { PICT_URL } from '../../api/axiosConfig'

type Props = {
  classment: Classement[]
}

export const LiveClassment = ({ classment }: Props) => {
  function generateBGImgUrl(filePath: string) {
    console.log('filePath', filePath)
    if (filePath.includes('http')) return filePath

    // Replace backslashes with forward slashes
    const normalizedFilePath = filePath.replace(/\\/g, '/')

    // Ensure the filePath is properly encoded after normalization
    const cleanFilePath = encodeURI(normalizedFilePath)

    return `${PICT_URL}${cleanFilePath}`
  }

  return (
    <div className='live-Classment '>
      {classment.map((c, i) => (
        <div className='live-Classment-item' key={`cl-${i}`}>
          <div className='rankContainer'>
            <div className='rank'>{i + 1}</div>
            <div
              className='avatar'
              style={{
                backgroundImage: `url(${generateBGImgUrl(c.betAvatar)})`,
              }}
            ></div>
            <div className='avatar-name'>{c.betUserName}</div>
          </div>
          <div className='solde'>{c.totalSolde}</div>
        </div>
      ))}
    </div>
  )
}

export default LiveClassment
