import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductInfos } from "../api/interfaces";
import { confirmProduct, getProductById } from "../api/actions";
import { PICT_URL } from "../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

type Props = {};

const ProductInfo: React.FC = () => {
  
  const { id } = useParams();

  const [ prodInfos, setProdInfos ] = useState<ProductInfos[]>([]);
  const [ isLoading, setIsloading ] = useState<boolean>(false);

  const curUser = useSelector(
    (state: any) => state?.currentUser?.user?.currentUser
  );


  const navigate = useNavigate();

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

  const handleProductConfirmation = async () => {
    const response = await confirmProduct(id ?? '');

    if (response) {
      toast.success("Produit confirmé avec succès!");
      if(curUser.role === 1)
        navigate('/displayCompanyProducts');
      else
        navigate('/productsList');
    }
  };
  const renderInfos = () => {
    return(
      <div className="product-info-container">
        <div className="product-info-picture">
          <img src={generateImgUrl(prodInfos[0]?.prodPicture[0]?.filePath ?? '')} />
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
            
            {(prodInfos[0] as any).prodStatus === -1 && curUser.role === 2 && (
              <button onClick={handleProductConfirmation} style={{ backgroundColor: '#28A745', color: 'white', padding: '7px 30px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: 15, fontWeight: 500 }}>
                Confirmer le produit
              </button>
            )}

          </div>
        </div>
        <ToastContainer />
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
