import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCompanies } from "../reducers/companiesListSlice";
import { API_URL, PICT_URL } from "../api/axiosConfig";
import TotalCompanies from "./TotalCompanies";
import TotalProds from "./TotalProds";
import TotalProdsBenefits from "./TotalProdsBenefits";
import { resetGlobalSearch } from "../reducers/globalSlice";

type Props = {};

const CompaniesList = (props: Props) => {
  const dispatch = useDispatch<any>();
  const company = useSelector((state: any) => state.company.companies);
  const global = useSelector((state: any) => state.global);
  const filteredCompanies = company.filter((user: any) => user.role == 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/searchCompaniesByName`,
        {
          companyName: global.globalSearch,
        }
      );
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setSearchResults(response.data);
        setNoResults(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (global.globalSearch.trim() === "") {
      setSearchResults([]);
      return;
    }
    handleSearch();
  }, [global.globalSearch]);

  useEffect(() => {
    dispatch(resetGlobalSearch())
  }, [])
  
  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }
  const companiesList = () => (
    <div className="flex flex-col w-full">
      {noResults ? (
        <div className="text-center mt-4">No data found.</div>
      ) : (
        <div className="w-full grid grid-cols-6 gap-1 userGrid rounded h-12">
          <div className="uppercase p-3 mt-2">nom</div>
          <div className="uppercase py-3 px-5 mt-2 w-[200px]">email</div>
          <div className="uppercase py-3 px-5 mt-2">telephone</div>
          <div className="uppercase py-3 px-5 mt-2">ville</div>
          <div className="uppercase py-3 px-5 mt-2">responsable</div>
          <div className="uppercase text-end p-3 mt-2">états</div>
        </div>
      )}
      {!noResults && (
        <div className="">
          {(searchResults.length > 0 ? searchResults : filteredCompanies).map(
            (user: any) => (
              <div className="w-full grid grid-cols-6 gap-4 tabRow px-2" key={`co-${user._id}`}>
                <div className="uppercase text-end flex">
                  <div>
                    <img
                      src={generateImgUrl(user.logo)}
                      alt=""
                      width="30"
                      height="30"
                      className="rounded-full mr-1"
                    />
                  </div>
                  <div className="m-2">{user.companyName}</div>
                </div>

                <div className="w-[200px] overflow-hidden">{user.email}</div>
                <div className="">{user.phone}</div>
                <div className="">{user.city}</div>
                <div className="">{user.responsable}</div>
                <div className=" text-end p-4 flex col-span-1 justify-end items-center">
                  <Link to={{ pathname: `/displayCompanyInfos/${user._id}` }}>
                    <button className="text-white py-1 px-6 rounded-xl mr-3" style={{background : "#445E97"}}>
                      VOIRE FICHE
                    </button>
                  </Link>
                  {user?.status == 1 ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  ) : user?.status == 3 ? (
                    <div className="h-2.5 w-2.5 rounded-full  bg-red-700"></div>
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-500"></div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="sectionContainer">
      <div className="listContainer">{companiesList()}</div>
      <div className="widgetContainer">
        <div className="w-full">
          <TotalCompanies />
        </div>
        <div className="w-full">
          <TotalProds />
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
