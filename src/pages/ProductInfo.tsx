import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalSolde } from "../reducers/totalSoldeSlice";
import Card from "../components/card";
import { useParams } from "react-router-dom";
import {  ProductInfos } from "../api/interfaces";
import { getProductById } from "../api/actions";
import { PICT_URL } from "../api/axiosConfig";
type Props = {};

const ProductInfo: React.FC = () => {
  
  const { id } = useParams();

  const [ prodInfos, setProdInfos ] = useState<ProductInfos[]>([]);
  const [ isLoading, setIsloading ] = useState<boolean>(false);

  const getProdInfos = async() => {
    setIsloading(false);
    if (id) {
      const d = await getProductById(id);
      if (d) setProdInfos(d);
      setIsloading(true);
    }
    
  }

  useEffect(() => {
    getProdInfos();
  }, [id])

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  const renderInfos = () => {
    return(
      <div className="product-info-container">
        <div className="product-info-picture">
          <img src={generateImgUrl(prodInfos[0].prodPicture[0].filePath)} />
        </div>
        <div className="product-info-content">
          <div className="prodInfos">
            <div className="prodTitle" style={{ fontSize: 22, fontWeight: 800, marginBottom: 10}}>{ prodInfos[0].prodName}</div>
            <div className="priceContainer">
              <div className="magasin">Prix Magasin</div>
              <div className="priceContent">
                <div className="price" style={{ fontSize: 20, fontWeight: 800}}>{ prodInfos[0].prodPrice}</div>
                <div className="currency">TND</div>
              </div>
            </div>
            <div className="priceContainer">
              <div className="magasin">Participations</div>
              <div className="priceContent">
                <div className="price" style={{ fontSize: 20, fontWeight: 800}}>{ prodInfos[0].total}</div>
                <div className="currency">Solde</div>
              </div>
            </div>
            <div className="priceContainer">
              <div className="magasin">Coéfficient</div>
              <div className="priceContent">
                <div className="price" style={{ fontSize: 20, fontWeight: 800}}>{ prodInfos[0].prodBenefit}</div>
                <div className="currency">fois</div>
              </div>
            </div>
            <div className="product-info-dexcription" dangerouslySetInnerHTML={{ __html: prodInfos[0].prodDescription }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-info-container-full">
      { isLoading && renderInfos()}
    </div>
  );
};

export default ProductInfo;
