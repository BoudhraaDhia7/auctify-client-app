import React, { useEffect, useState } from "react";
import { fetchInProgressCompanyProducts } from "../reducers/inProgressCompanyProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PICT_URL } from "../api/axiosConfig";
import { SwiperSlide, Swiper } from "swiper/react";

type Props = {};

const LiveCompany = (props: Props) => {
  const [companyId, setCompanyId] = useState<string | null>(null);

  const dispatch = useDispatch<any>();
  const inProgComProds = useSelector(
    (state: any) => state.inProgressCompanyProducts.products
  );
  const { isLoading, error } = useSelector(
    (state: any) => state.inProgressCompanyProducts
  );
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("userID");
    setCompanyId(storedCompanyId);
  }, []);

  useEffect(() => {
    if (companyId) {
      dispatch(fetchInProgressCompanyProducts(companyId));
    }
  }, [companyId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {"error while fetching data"}</div>;
  }

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  return (
    <div className="w-full h-full">
      <div className="detailsRow">
        <div className="cardDetailsContainer width60">
          <div className="profileContent"></div>
        </div>
        <div className="cardDetailsContainer width40">
          <div className="profileContent">
            <div className="grid gap-6 rounded-lg ">
              {inProgComProds.map((prod: any) => (
                <div key={prod._id} className="participProductItem h-[150px]">
                  <div
                    className="companyLogo"
                    style={{
                      backgroundImage: `url(${PICT_URL}/${prod.companyLogo})`,
                    }}
                  ></div>
                  <div className="content flex items-center">
                    <div className="prodSwipe w-1/3">
                      <Swiper spaceBetween={50} slidesPerView={1}>
                        {prod?.prodPicture.map((file: any) => (
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
                      <div className="prodTitle">{prod.prodName}</div>
                      <div className="priceContainer">
                        <div className="magasin">Prix Magasin</div>
                        <div className="priceContent">
                          <div className="price">{prod.prodPrice}</div>
                          <div className="currency">TND</div>
                        </div>
                      </div>
                      <div className="prodWinner">Remporter par iheb</div>
                    </div>
                    <div className="prodMyTotal">
                      <div className="value">{Math.abs(prod.total)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCompany;
