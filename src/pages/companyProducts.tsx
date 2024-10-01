import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyProducts } from "../reducers/companyProductsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { PICT_URL } from "../api/axiosConfig";

const CompanyProducts = () => {
  const dispatch = useDispatch<any>();
  const companyId = localStorage.getItem("userID");
  const company = useSelector((state: any) => state.companyProducts.company);
  const isLoading = useSelector(
    (state: any) => state.companyProducts.isLoading
  );
  const error = useSelector((state: any) => state.companyProducts.error);

  useEffect(() => {
    dispatch(fetchCompanyProducts(companyId));
  }, [dispatch, companyId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!company) {
    return <div>No company data</div>;
  }

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  return (
    <div className="m-4">
      <div className="grid gap-6 md:grid-cols-2 rounded-lg">
        {company.map((product: any) => (
          <div key={product._id} className="participProductItem h-[150px]">
            <div
              className="companyLogo"
              style={{
                backgroundImage: `url(${PICT_URL}/${product.companyLogo})`,
              }}
            ></div>

            <div className="content flex items-center">
              <div className="prodSwipe w-1/3">
                <Swiper spaceBetween={50} slidesPerView={1}>
                  {product.prodPicture.map((file: any) => (
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
                <div className="prodWinner">Remporter par iheb</div>
              </div>
              <div className="prodMyTotal">
                <div className="value">{Math.abs(product.total)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProducts;
