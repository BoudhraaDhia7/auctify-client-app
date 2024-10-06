import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { API_URL, PICT_URL } from '../../api/axiosConfig'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
  disconnectSocket,
  initiateSocket,
  onJoinEnchere,
  onMiseSolde,
  onUnJoinEnchere,
} from '../socket/socket'
import {
  Classement,
  MiseSoldeSended,
  UserInfoRecieved,
} from '../../api/interfaces'
import LiveCounter from '../live/LiveCounter'
import LiveMembers from '../live/liveMembers'
import LiveClassment from '../live/liveClassment'
import { getAllMise } from '../../utils/helpers'

interface Product {
  _id: string | null
  prodName: string
  total: number
  companyAdress: string
  companyLogo: string
  prodPrice: number
  winnerName: string
  openDate: string
  participant: number
  prodPicture: {
    productPicture: string
    filePath: string
    fileType: string
    fileSize: number
  }[]
}
type Props = {
  product: string
}

export const AuctionProducts = ({ product }: Props) => {
  const dispatch = useDispatch<any>()
  const setting = useSelector((state: any) => state.settings)
  const [data, setData] = useState<Product[]>([])
  const [members, setMembers] = useState<UserInfoRecieved[]>([])
  const [classement, setClassement] = useState<Classement[]>([])
  //console.log(classement);
  //console.log(members);
  const getProdInfoById = async (product: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/auctions/getAuctionById`, {
        productId: product,
      })
      setData(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getAuctionMembers = async (product: string) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/auctions/getAuctionMembers/${product}`
      )
      setMembers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAuctionClassment = async (product: string) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auctions/getAuctionClassment`,
        {
          productId: product,
        }
      )
      setClassement(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAuctionClassment(product)
    getProdInfoById(product)
    getAuctionMembers(product)
  }, [])

  useEffect(() => {
    initiateSocket()
    onJoinEnchere((err: any, data: UserInfoRecieved) => {
      if (err) return
      if (data.idProduct == product) {
        getAuctionMembers(product)
      }
    })
    onUnJoinEnchere((err: any, idSocket: string) => {
      getAuctionMembers(product)
    })

    onMiseSolde((err: any, data: MiseSoldeSended) => {
      if (err) return
      if (data.idProduct == product) {
        // setIsBet(false);
        getAuctionClassment(product)
        // setIsAuctionEndCounter(false);
        // setTimeout(() => {setIsAuctionEndCounter(true);}, 100);
      }
    })

    return () => disconnectSocket()
  }, [])

  function generateImgUrl(filePath: string) {
    console.log('filePath', filePath)
    if (filePath.includes('http')) return filePath

    // Replace backslashes with forward slashes
    const normalizedFilePath = filePath.replace(/\\/g, '/')

    // Ensure the filePath is properly encoded after normalization
    const cleanFilePath = encodeURI(normalizedFilePath)

    return `${PICT_URL}${cleanFilePath}`
  }

  return (
    <div className='liveContent'>
      <div className='live-members-container'>
        {members && <LiveMembers members={members} />}
      </div>
      <div className='live-auction-infos'>
        <div className='live-prod-infos'>
          <div className='live-prod'>
            <div className='live-prod-title'>
              {data.length > 0 && data[0].prodName}
            </div>
            <div className='live-prod-magasin'>Prix magasin</div>
            <div className='live-prod-price'>
              {data.length > 0 && data[0].prodPrice}{' '}
              <span>{setting.devise}</span>
            </div>
            <div className='live-prod-particip'>
              <div className='live-particip-col'>
                <div className='live-col-title'>Participations</div>
                <div className='live-col-value'>
                  {data.length > 0 && data[0].participant}
                </div>
              </div>
              <div className='live-particip-col'>
                <div className='live-col-title'>Montant Paticip.</div>
                <div className='live-col-value'>
                  {data.length > 0 && data[0].total}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='live-stats-container'>
          <div className='live-prod-particip'>
            <div className='live-particip-col live-particip-col-3'>
              <div className='live-col-title'>Membre Actifs</div>
              <div className='live-col-value'>
                {members.length > 0 && members.length}
              </div>
            </div>
            <div className='live-particip-col live-particip-col-3'>
              <div className='live-col-title'>Montant Enchère</div>
              <div className='live-col-value'>
                {classement.length > 0 && classement[0].totalSolde}
              </div>
            </div>
            <div className='live-particip-col live-particip-col-3'>
              <div className='live-col-title'>Total</div>
              <div className='live-col-value'>
                {classement.length > 0 && getAllMise(classement)}
              </div>
            </div>
          </div>
        </div>

        <div className='live-stats-counter'>
          {data.length > 0 && <LiveCounter openDate={data[0].openDate} />}
        </div>
        {data.length > 0 && (
          <div
            className='live-prod-photo'
            style={{
              backgroundImage: `url(${generateImgUrl(
                data[0].prodPicture[0].filePath
              )})`,
            }}
          ></div>
        )}
      </div>

      <div>{classement && <LiveClassment classment={classement} />}</div>
    </div>
  )
}

export default AuctionProducts
