import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchPendingProducts } from '../reducers/productsSlice'
import { fetchInProgressProducts } from '../reducers/inProgressSlice'
import { fetchEndedProducts } from '../reducers/endedProductsSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PICT_URL } from '../api/axiosConfig'
import CreateProduct from './CreateProducts'
import { Link } from 'react-router-dom'

type Props = {}

interface Product {
  _id: string
  prodName: string
  total: number
  companyAdress: string
  companyLogo: string
  prodPrice: number
  winnerName: string

  prodPicture: {
    productPicture: string
    filePath: string
    fileType: string
    fileSize: number
  }[]
}

const ProductsList = (props: Props) => {
  const dispatch = useDispatch<any>()
  const companyProfile = useSelector(
    (state: any) => state?.currentUser?.user?.currentUser
  )
  const global = useSelector((state: any) => state.global)
  const products = useSelector((state: any) => state.product.products)
  const inProgress = useSelector(
    (state: any) => state.inProgressProducts.products
  )
  const ended = useSelector((state: any) => state.endedProducts.products)
  const pending = useSelector((state: any) => state.product.pending);

  const [displayType, setDisplayType] = useState('en-attente')
  const [selectedButton, setSelectedButton] = useState('en-attente')

  const userId = localStorage.getItem('userID')
  const roleId = localStorage.getItem('roleID')

  useEffect(() => {
    if (userId && roleId) {
      dispatch(fetchPendingProducts(roleId == '1' ? userId : '--'))
      dispatch(fetchProducts(roleId == '1' ? userId : '--'))
      dispatch(fetchInProgressProducts(roleId == '1' ? userId : '--'))
      dispatch(fetchEndedProducts(roleId == '1' ? userId : '--'))
    }
  }, [dispatch, userId, roleId])

  const handleDisplayType = (type: string) => {
    setDisplayType(type)
    setSelectedButton(type)
  }

  function generateImgUrl(filePath: string) {

    if (filePath?.includes('http')) return filePath
    return `${PICT_URL}${filePath}`
  }
  function generateBGImgUrl(filePath: string) {

    if (filePath.includes('http')) return filePath

    // Replace backslashes with forward slashes
    const normalizedFilePath = filePath.replace(/\\/g, '/')

    // Ensure the filePath is properly encoded after normalization
    const cleanFilePath = encodeURI(normalizedFilePath)

    return `${PICT_URL}${cleanFilePath}`
  }

  return (
    <div className='dashboardContainer'>
      <div className='selectProdList'>
        <div className='switchProdList'>
          <div
            className='switchItem switchBorderLeft'
            style={{
              backgroundColor:
                selectedButton === 'en-attente' ? '#445e97' : '#FFF',
              color: selectedButton === 'en-attente' ? '#FFF' : '#333',
            }}
            onClick={() => handleDisplayType('en-attente')}
          >
            En attente
          </div>

          <div
            className='switchItem'
            style={{
              backgroundColor:
                selectedButton === 'prochaine' ? '#445e97' : '#FFF',
              color: selectedButton === 'prochaine' ? '#FFF' : '#333',
            }}
            onClick={() => handleDisplayType('prochaine')}
          >
            Prochaines
          </div>
          <div
            className='switchItem'
            style={{
              backgroundColor:
                selectedButton === 'in-progress' ? '#445e97' : '#FFF',
              color: selectedButton === 'in-progress' ? '#FFF' : '#333',
            }}
            onClick={() => handleDisplayType('in-progress')}
          >
            En cours
          </div>
          <div
            className='switchItem switchBorderRight'
            style={{
              backgroundColor: selectedButton === 'ended' ? '#445e97' : '#FFF',
              color: selectedButton === 'ended' ? '#FFF' : '#333',
            }}
            onClick={() => handleDisplayType('ended')}
          >
            Terminés
          </div>
        </div>
      </div>

      {displayType === 'en-attente' && (
        <div className='grid gap-6 md:grid-cols-3 rounded-lg '>
          {pending?.length > 0 ? (
            pending.map((product: Product) => (
              <div
                key={product._id}
                className='participProductItem bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 ease-in-out h-[200px]'
              >
                <div
                  className='companyLogo bg-cover bg-center w-[60px] h-[60px] rounded-full mb-2'
                  style={{
                    backgroundImage: `url(${generateBGImgUrl(
                      product.companyLogo
                    )})`,
                  }}
                ></div>
                <div className='content flex items-center'>
                  <div className='prodSwipe w-1/3'>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                      {product?.prodPicture.map((file: any) => (
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
                  <div className='prodInfos w-2/3 px-4'>
                    <div className='prodTitle font-semibold text-lg mb-2'>
                      {product.prodName}
                    </div>
                    <div className='priceContainer'>
                      <div className='magasin text-sm text-gray-600'>
                        Prix Magasin
                      </div>
                      <div className='priceContent flex items-baseline'>
                        <div className='price text-xl font-bold'>
                          {product.prodPrice}
                        </div>
                        <div className='currency ml-1 text-sm'>TND</div>
                      </div>
                    </div>
                    <Link
                      style={{ width: '100%' }}
                      to={`/productinfo/${product._id}`}
                      className='text-blue-500 hover:underline mt-2 block'
                    >
                      <div className='prodWinner'>Voir détails</div>
                    </Link>
                  </div>
                  <div className='prodMyTotal'>
                    <div className='value font-semibold text-lg'>
                      {Math.abs(product.total)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data-message flex items-center justify-center h-screen w-screen mb-20'>
                <p
                className='text-center text-lg font-semibold text-gray-500'
                style={{ marginBottom: '280px', marginRight: '180px' }}
                >
                Aucun produit en attente de confirmation. Revenez plus tard pour{' '}
                <br />
                voir les nouveaux produits en attente.
                </p>
            </div>
          )}
        </div>
      )}

      {displayType === 'prochaine' && (
        <div className='grid gap-6 md:grid-cols-3 rounded-lg '>
          {products?.length > 0 ? (
            products.map((product: Product) => (
              <div
                key={product._id}
                className='participProductItem bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 ease-in-out h-[200px]'
              >
                <div
                  className='companyLogo bg-cover bg-center w-[60px] h-[60px] rounded-full mb-2'
                  style={{
                    backgroundImage: `url(${generateBGImgUrl(
                      product.companyLogo
                    )})`,
                  }}
                ></div>
                <div className='content flex items-center'>
                  <div className='prodSwipe w-1/3'>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                      {product?.prodPicture.map((file: any) => (
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
                  <div className='prodInfos w-2/3 px-4'>
                    <div className='prodTitle font-semibold text-lg mb-2'>
                      {product.prodName}
                    </div>
                    <div className='priceContainer'>
                      <div className='magasin text-sm text-gray-600'>
                        Prix Magasin
                      </div>
                      <div className='priceContent flex items-baseline'>
                        <div className='price text-xl font-bold'>
                          {product.prodPrice}
                        </div>
                        <div className='currency ml-1 text-sm'>TND</div>
                      </div>
                    </div>
                    <Link
                      style={{ width: '100%' }}
                      to={`/productinfo/${product._id}`}
                      className='text-blue-500 hover:underline mt-2 block'
                    >
                      <div className='prodWinner'>Voir détails</div>
                    </Link>
                  </div>
                  <div className='prodMyTotal'>
                    <div className='value font-semibold text-lg'>
                      {Math.abs(product.total)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data-message flex items-center justify-center h-screen w-screen mb-20'>
              <p
                className='text-center text-lg font-semibold text-gray-500'
                style={{ marginBottom: '280px', marginRight: '180px' }}
              >
                Aucune enchère prochaine disponible. Revenez plus tard pour{' '}
                <br />
                découvrir les nouvelles enchères.
              </p>
            </div>
          )}
        </div>
      )}

      {displayType === 'in-progress' && (
        <div className='grid gap-6 md:grid-cols-3 rounded-lg '>
          {inProgress?.length > 0 ? (
            inProgress.map((product: Product) => (
              <div key={product._id} className='participProductItem h-[150px]'>
                <div
                  className='companyLogo'
                  style={{
                    backgroundImage: `url(${generateBGImgUrl(
                      product.companyLogo
                    )})`,
                  }}
                ></div>
                <div className='content flex items-center'>
                  <div className='prodSwipe w-1/3'>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                      {product?.prodPicture.map((file: any) => (
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
                  <div className='prodInfos w-1/3'>
                    <div className='prodTitle'>{product.prodName}</div>
                    <div className='priceContainer'>
                      <div className='magasin'>Prix Magasin</div>
                      <div className='priceContent'>
                        <div className='price'>{product.prodPrice}</div>
                        <div className='currency'>TND</div>
                      </div>
                    </div>
                    <Link
                      style={{ width: '100%' }}
                      to={`/productinfo/${product._id}`}
                    >
                      <div className='prodWinner'>Voir détails</div>
                    </Link>
                  </div>
                  <div className='prodMyTotal'>
                    <div className='value'>{Math.abs(product.total)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data-message flex items-center justify-center h-screen w-screen mb-20'>
              <p
                className='text-center text-lg font-semibold text-gray-500'
                style={{ marginBottom: '280px', marginRight: '180px' }}
              >
                Il n'y a actuellement aucune enchère en cours. <br />
                Consultez cette section plus tard pour voir les ventes en
                direct.
              </p>
            </div>
          )}
        </div>
      )}
      {displayType === 'ended' && (
        <div className='grid gap-6 md:grid-cols-3 rounded-lg '>
          {ended?.length > 0 ? (
            ended.map((product: Product) => (
              <div key={product._id} className='participProductItem h-[150px]'>
                <div
                  className='companyLogo'
                  style={{
                    backgroundImage: `url(${generateBGImgUrl(
                      product.companyLogo
                    )})`,
                  }}
                ></div>
                <div className='content flex items-center'>
                  <div className='prodSwipe w-1/3'>
                    <Swiper spaceBetween={50} slidesPerView={1}>
                      {product?.prodPicture.map((file: any) => (
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
                  <div className='prodInfos w-1/3'>
                    <div className='prodTitle'>{product.prodName}</div>
                    <div className='priceContainer'>
                      <div className='magasin'>Prix Magasin</div>
                      <div className='priceContent'>
                        <div className='price'>{product.prodPrice}</div>
                        <div className='currency'>TND</div>
                      </div>
                    </div>
                    <Link
                      style={{ width: '100%' }}
                      to={`/productinfo/${product._id}`}
                    >
                      <div className='prodWinner'>
                        Remporter par {product.winnerName}
                      </div>
                    </Link>
                  </div>
                  <div className='prodMyTotal'>
                    <div className='value'>{Math.abs(product.total)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data-message flex items-center justify-center h-screen w-screen mb-20'>
              <p
                className='text-center text-lg font-semibold text-gray-500'
                style={{ marginBottom: '280px', marginRight: '180px' }}
              >
                Il n'y a aucune enchère terminée pour le moment. <br />
                Consultez plus tard pour voir les résultats des ventes passées.
              </p>
            </div>
          )}
        </div>
      )}

      <div className='prod-modal'>
        <CreateProduct isModalOpen={global.isAddProduct} />
      </div>
    </div>
  )
}

export default ProductsList
