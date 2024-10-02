import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { companyInfos } from "../api/interfaces";
import axios from "axios";
import { API_URL, PICT_URL } from "../api/axiosConfig";
import CardHeader from "../components/cardHeader";
import { fetchCompanyProducts } from "../reducers/companyProductsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProdsByCompany } from "../reducers/totalProdsByCompanyIdSlice";
import { fetchParticipationDetails } from "../reducers/participationDetailsSlice";
import { fetchProductsParticipationByCompanyId } from "../reducers/productsParticipationByCompanyIdSlice";
import { toast, ToastContainer } from "react-toastify";
type Props = {};

const CompanyInfos = (props: Props) => {
  const { id } = useParams();
  const [companyInfos, setCompanyInfo] = useState<companyInfos | undefined>();
  const dispatch = useDispatch<any>();
  const company = useSelector((state: any) => state?.companyProducts?.company);

  const prodsByCompanyId = useSelector(
    (state: any) => state.totalProdsByCompanyId.company
  );
  const productsParticipationByCompanyId = useSelector(
    (state: any) => state?.productsParticipationByCompanyId?.company
  );
  console.log(productsParticipationByCompanyId);
  const tot = useSelector(
    (state: any) => state?.participationDetails?.company?.result[0]
  );
  // console.log(productsParticipationByCompanyId);

  useEffect(() => {
    Promise.all([axios.get(`${API_URL}/admin/getInfosByCompanyId/${id}`)])
      .then(([infosResponse]) => {
        setCompanyInfo(infosResponse.data);
      })
      .catch((error) => console.log(error));
    dispatch(fetchCompanyProducts(id));
    dispatch(fetchProductsParticipationByCompanyId(id));
    dispatch(fetchTotalProdsByCompany(id));
    dispatch(fetchParticipationDetails(id));
  }, [dispatch, id]);

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `inscrit le ${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } a ${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
  };
  const exp = tot?.totalSoldeParticipationByCompany - tot?.totalPrice;
  const str = exp.toString();

  const handleRestrict = async () => {
    try {
      const rest = await axios.patch(
        `${API_URL}/company/restrictCompany/${id}`
      );
      toast.success("Company restricted successfully");
      setCompanyInfo((prevCompanyInfos: any) => ({
        ...prevCompanyInfos,
        status: "3",
      }));
    } catch (error) {
      console.log("Failed to restrict company", error);
    }
  };

  const handleUnrestrict = async () => {
    try {
      const rest = await axios.patch(
        `${API_URL}/company/unRestrictCompany/${id}`
      );
      toast.success("Company unrestricted  successfully");
      setCompanyInfo((prevCompanyInfos: any) => ({
        ...prevCompanyInfos,
        status: "1",
      }));
    } catch (error) {
      console.log("Failed to unrestrict company", error);
    }
  };

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  return (
    <div className="w-full h-full">
      <div className="detailsRow">
        <div className="cardDetailsContainer width60">
          <div className="profileContent">
            <div className="profileAvatar">
              <div className="avatar">
                <img
                  src={`${PICT_URL}/${companyInfos?.logo}`}
                  alt=""
                  className="rounded-full"
                />
              </div>
              {/* <div className="avatarName">
                {companyInfos?.firstName + " " + userInfos?.lastName}
              </div> */}
              <div className="avatarName">{companyInfos?.userName}</div>
              <div className="profileInfos">
                <div className="profileRow ProfileDate">
                  {formatDate(companyInfos?.created_at)}
                </div>

                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">email</div>
                    <div className="value">{companyInfos?.email}</div>
                  </div>
                  <div className="profileGridItem">
                    <div className="label">Mobile</div>
                    <div className="value">{companyInfos?.phone}</div>
                  </div>
                </div>
                <div className="profileRow">
                  <div className="profileGridItem">
                    <div className="label">Adresse</div>
                    <div className="value">{companyInfos?.address}</div>
                  </div>
                </div>
                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">Ville</div>
                    <div className="value">{companyInfos?.city}</div>
                  </div>
                  <div className="profileGridItem">
                    <div className="label">Pays</div>
                    <div className="value">Tunisie</div>
                  </div>
                </div>
                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">Responsable</div>
                    <div className="value">{companyInfos?.responsable}</div>
                  </div>
                  <div className="profileGridItem">
                    <div className="label">Registre de commerce</div>
                    <div className="value">{companyInfos?.matricule_fiscale}</div>
                  </div>
                </div>
             
                <div className="">
                  <div className="profileRow flex ">
                    <div className="px-2 py-1">
                      {companyInfos?.status == 1 ? (
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      ) : companyInfos?.status == 3 ? (
                        <div className="h-2.5 w-2.5 rounded-full  bg-red-700"></div>
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-500"></div>
                      )}
                    </div>
                    <div className="ProfileDate">Utilisateur</div>
                    <div className="ml-1 ProfileDate">
                      {companyInfos?.status == 1 ? (
                        <div className="ProfileDate">actif</div>
                      ) : companyInfos?.status == 3 ? (
                        <div className="ProfileDate">bloqué</div>
                      ) : (
                        <div className="ProfileDate">inactif</div>
                      )}
                    </div>
                  </div>
              
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardDetailsContainer width40">
          <div className="header">produits</div>
          <div className="content">
            <CardHeader
              label1="TOTAL"
              label2="ENCOURS"
              label3="TERMINER"
              value1={prodsByCompanyId && prodsByCompanyId[0]?.totalProducts}
              value2={
                prodsByCompanyId && prodsByCompanyId[0]?.totalInProgressProducts
              }
              value3={
                prodsByCompanyId && prodsByCompanyId[0]?.totalEndedProducts
              }
            />
          
          <div className="comp-prod-container">
            {company &&
              company?.map((product: any) => (
                <div
                  key={product._id}
                  className="participProductItem"
                >
                  <div className="content flex items-center">
                    <div className="prodSwipe w-1/3">
                      <Swiper spaceBetween={50} slidesPerView={1}>
                        {product?.prodPicture.map((file: any) => (
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
                        <div className="prodWinner">Voir détails</div>
                      </Link>
                    </div>
                    <div className="prodMyTotal">
                      <div className="value">{Math.abs(product.total)}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          </div>
        </div>
      </div>
      <div className="detailsRow">
        <div className="cardDetailsContainer width40">
          <div className="content">
            <div className="notebtn m-2">Nouvelle Note</div>
          </div>
        </div>
        <div className="cardDetailsContainer width60">
          <div className="header">Participations</div>

          <div className="content">
            <CardHeader
              label1="TOTAL"
              label2="TOTAL solde PAR"
              label3="BENEFITS"
              value1={tot?.totalPrice}
              value2={tot?.totalSoldeParticipationByCompany}
              value3={str}
            />
            <div style={{paddingTop: 10, paddingBottom: 10}}>
            {productsParticipationByCompanyId &&
              productsParticipationByCompanyId?.map((player: any) => (
                <div className="topParticip">
                  <div className="partName">
                  <img
                    src={
                      player?._id.avatar.startsWith("http")
                        ? player?._id.avatar
                        : `${API_URL}/${player?._id?.avatar}`
                    }
                    alt=""
                    width="30"
                    height="30"
                    className="rounded-full mr-1 "
                  />
                  <div className="partNameLabel">{player?._id.userName}</div>
                  </div>
                  <div className="partValue">{player?.totalAmountSent}</div>
                </div>
              ))}
          </div>
          </div>
          
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CompanyInfos;
{
  /**  {productsParticipationByCompanyId &&
              productsParticipationByCompanyId?.map((player: any) => (
                <>
                  <div>{player?.participation?.player?.userName}</div>
                  <img
                    src={
                      player?.participation?.player?.avatar.startsWith("http")
                        ? player?.participation?.player?.avatar
                        : `${API_URL}/${player?.participation?.player?.avatar}`
                    }
                    alt=""
                    width="30"
                    height="30"
                    className="rounded-full mr-1 "
                  />
                  <div>{player?.totalAmountSent}</div>
                </>
              ))}*/
}
