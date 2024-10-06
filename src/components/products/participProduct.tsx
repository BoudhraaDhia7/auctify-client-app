import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { PartcipatedProduct } from '../../api/interfaces'
import { PICT_URL } from '../../api/axiosConfig'
import { Link } from 'react-router-dom'

type Props = {
  participation: PartcipatedProduct
}

function generateImgUrl(filePath: string) {
  console.log('filePath', filePath)
  if (filePath.includes('http')) return filePath
  return `${PICT_URL}${filePath}`
}

function generateBGImgUrl(filePath: string) {
  console.log('filePath', filePath)
  if (filePath.includes('http')) return filePath

  // Replace backslashes with forward slashes
  const normalizedFilePath = filePath.replace(/\\/g, '/')

  // Ensure the filePath is properly encoded after normalization
  const cleanFilePath = encodeURI(normalizedFilePath)

  return `${PICT_URL}${cleanFilePath}`
}

const ParticipProducts = ({ participation }: Props) => {
  return (
    <div key={participation._id} className='participProductItem'>
      <div
        className='companyLogo'
        style={{
          backgroundImage: `url(${generateBGImgUrl(
            participation.companyLogo
          )})`,
        }}
      ></div>
      <div className='content'>
        <div className='prodSwipe'>
          <Swiper spaceBetween={50} slidesPerView={1}>
            {participation?.prodPicture.map(file => (
              <SwiperSlide key={file.filePath}>
                <img
                  className='rounded-lg'
                  src={generateImgUrl(file.filePath)}
                  alt={file.productPicture}
                  style={{ width: '100px', height: '100px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='prodInfos'>
          <div className='prodTitle'>{participation.prodName}</div>
          <div className='priceContainer'>
            <div className='magasin'>Prix Magasin</div>
            <div className='priceContent'>
              <div className='price'>{participation.prodPrice}</div>
              <div className='currency'>TND</div>
            </div>
          </div>
          <Link
            style={{ width: '100%' }}
            to={`/productinfo/${participation._id}`}
          >
            <div className='prodWinner'>Voir détails</div>
          </Link>
        </div>
        <div className='prodMyTotal'>
          <div className='value'>{Math.abs(participation.myTotal)}</div>
          <div className='currency'>D</div>
        </div>
      </div>
    </div>
  )
}

export default ParticipProducts
