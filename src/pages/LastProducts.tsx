import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastAddedProducts } from "../reducers/lastAddedProducts";
import { PICT_URL } from "../api/axiosConfig";

type Props = {};

const LastProducts = (props: Props) => {
  const dispatch = useDispatch<any>();
  const products = useSelector((state: any) => state?.lastAddedProducts?.data);

  useEffect(() => {
    dispatch(fetchLastAddedProducts());
  }, [dispatch]);

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  return (
    <>
      {products?.map((product: any) => (
        console.log("pppppxxxxzzz", product),
        <div className="lastProductItem" key={product._id}>
          <div className="lastProdInfo">
           { product && <img
              src={generateImgUrl(product.files[0].filePath)}
              alt="Company Logo"
              style={{ width: "100px", height: "100px", objectFit: 'cover', borderRadius: 8, marginRight: 6 }}
            />}
            <div className="lastProdDetails">
              <div className="lastProdTitle">{product.name}</div>
              <div className="lastProdMagasin">Prix Magasin</div>
              <div className="lastProdPrice">{product.price}<span>TND</span></div>
            </div>
            
          </div>
          <div className="lastProdAddedBy">
            <div className="lastProdAddedByText">Ajouté par {product.company.companyName}</div>
            
            <img
              src={generateImgUrl(product.company.logo)}
              alt="Company Logo"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          
         
          <div>
            
          </div>
        </div>
      ))}
    </>
  );
};

export default LastProducts;
