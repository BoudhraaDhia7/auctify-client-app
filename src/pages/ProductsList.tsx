import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducers/productsSlice";
import { fetchInProgressProducts } from "../reducers/inProgressSlice";
import { fetchEndedProducts } from "../reducers/endedProductsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { PICT_URL } from "../api/axiosConfig";
import CreateProduct from "./CreateProducts";
import { Link } from "react-router-dom";

type Props = {};

interface Product {
  _id: string;
  prodName: string;
  total: number;
  companyAdress: string;
  companyLogo: string;
  prodPrice: number;
  winnerName: string;

  prodPicture: {
    productPicture: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  }[];
}

const ProductsList = (props: Props) => {
  const dispatch = useDispatch<any>();
  const companyProfile = useSelector(
    (state: any) => state?.currentUser?.user?.currentUser
  );
  const global = useSelector((state: any) => state.global);
  const products = useSelector((state: any) => state.product.products);
  const inProgress = useSelector(
    (state: any) => state.inProgressProducts.products
  );
  const ended = useSelector((state: any) => state.endedProducts.products);

  const [displayType, setDisplayType] = useState("prochaine");
  const [selectedButton, setSelectedButton] = useState("prochaine");
  
  const userId = localStorage.getItem("userID");
  const roleId = localStorage.getItem("roleID");
  



  useEffect(() => {  
    if (userId && roleId) {
      dispatch(fetchProducts(roleId == "1" ?  userId : "--"));
      dispatch(fetchInProgressProducts(roleId == "1" ?  userId : "--"));
      dispatch(fetchEndedProducts(roleId == "1" ?  userId : "--"));
    }
  }, [dispatch, userId, roleId]);

  const handleDisplayType = (type: string) => {
    setDisplayType(type);
    setSelectedButton(type);
  };

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath?.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  return (
    <div className="dashboardContainer">
      <div className="selectProdList">
        <div className="switchProdList">
          <div 
            className="switchItem switchBorderLeft"
            style={{
              backgroundColor: selectedButton === "prochaine" ? "#445e97" : "#FFF",
              color: selectedButton === "prochaine" ? "#FFF" : "#333",
            }}
            onClick={() => handleDisplayType("prochaine")}
            >Prochaines</div>
          <div 
            className="switchItem"
            style={{
              backgroundColor: selectedButton === "in-progress" ? "#445e97" : "#FFF",
              color: selectedButton === "in-progress" ? "#FFF" : "#333",
            }}
            onClick={() => handleDisplayType("in-progress")}
            >En cours</div>
          <div 
          className="switchItem switchBorderRight"
          style={{
            backgroundColor: selectedButton === "ended" ? "#445e97" : "#FFF",
            color: selectedButton === "ended" ? "#FFF" : "#333",
          }}
          onClick={() => handleDisplayType("ended")}
          >Terminés</div>
        </div>
      </div>

      {displayType === "prochaine" && (
        <div className="grid gap-6 md:grid-cols-3 rounded-lg ">
          {products?.map((product: Product) => (
            <div key={product._id} className="participProductItem h-[150px]  ">
              <div
                className="companyLogo"
                style={{
                  backgroundImage: `url(${PICT_URL}/${product.companyLogo})`,
                }}
              ></div>
              <div className="content flex items-center">
                <div className="prodSwipe w-1/3">
                  <Swiper spaceBetween={50} slidesPerView={1}>
                    {product?.prodPicture.map((file: any) => (
                      (console.log("file", file)),
                      <SwiperSlide key={file.filePath}>
                        <img
                          className="rounded-lg"
                          src={generateImgUrl(file.filePath)} 
                          alt={file.productPicture}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="prodInfos w-1/3">
                  <div className="prodTitle">{product.prodName}</div>
                  <div className="priceContainer">
                    <div className="magasin">Prix Magasin</div>
                    <div className="priceContent">
                      <div className="price">{product.prodPrice}</div>
                      <div className="currency">TND</div>
                    </div>
                  </div>
                  <Link style={{ width: '100%'}} to={`/productinfo/${product._id}`}>
                  <div className="prodWinner">Voir détails</div></Link>
                </div>
                <div className="prodMyTotal">
                  <div className="value">{Math.abs(product.total)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {displayType === "in-progress" && (
        <div className="grid gap-6 md:grid-cols-3 rounded-lg ">
          {inProgress?.map((product: Product) => (
            <div key={product._id} className="participProductItem h-[150px]  ">
              <div
                className="companyLogo"
                style={{
                  backgroundImage: `url(${PICT_URL}/${product.companyLogo})`,
                }}
              ></div>
              <div className="content flex items-center">
                <div className="prodSwipe w-1/3">
                  <Swiper spaceBetween={50} slidesPerView={1}>
                    {product?.prodPicture.map((file: any) => (
                      <SwiperSlide key={file.filePath}>
                        <img
                          className="rounded-lg"
                          src={`${PICT_URL}/${file.filePath}`}
                          alt={file.productPicture}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="prodInfos w-1/3">
                  <div className="prodTitle">{product.prodName}</div>
                  <div className="priceContainer">
                    <div className="magasin">Prix Magasin</div>
                    <div className="priceContent">
                      <div className="price">{product.prodPrice}</div>
                      <div className="currency">TND</div>
                    </div>
                  </div>
                  <Link style={{ width: '100%'}} to={`/productinfo/${product._id}`}>
                  <div className="prodWinner">Voir détails</div></Link>
                </div>
                <div className="prodMyTotal">
                  <div className="value">{Math.abs(product.total)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {displayType === "ended" && (
        <div className="grid gap-6 md:grid-cols-3 rounded-lg ">
          {ended?.map((product: Product) => (
            <div key={product._id} className="participProductItem h-[150px]  ">
              <div
                className="companyLogo"
                style={{
                  backgroundImage: `url(${PICT_URL}/${product.companyLogo})`,
                }}
              ></div>
              <div className="content flex items-center">
                <div className="prodSwipe w-1/3">
                  <Swiper spaceBetween={50} slidesPerView={1}>
                    {product?.prodPicture.map((file: any) => (
                      <SwiperSlide key={file.filePath}>
                        <img
                          className="rounded-lg"
                          src={`${PICT_URL}/${file.filePath}`}
                          alt={file.productPicture}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="prodInfos w-1/3">
                  <div className="prodTitle">{product.prodName}</div>
                  <div className="priceContainer">
                    <div className="magasin">Prix Magasin</div>
                    <div className="priceContent">
                      <div className="price">{product.prodPrice}</div>
                      <div className="currency">TND</div>
                    </div>
                  </div>
                  <Link style={{ width: '100%'}} to={`/productinfo/${product._id}`}>
                    <div className="prodWinner">
                      Remporter par {product.winnerName}
                    </div>
                  </Link>
                </div>
                <div className="prodMyTotal">
                  <div className="value">{Math.abs(product.total)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="prod-modal">
        <CreateProduct isModalOpen={global.isAddProduct}  />
      </div>
      

    </div>
  );
};

export default ProductsList;
