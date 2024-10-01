import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../reducers/companiesListSlice";
import { fetchUsers } from "../reducers/usersListSlice";
import { API_URL, PICT_URL } from "../api/axiosConfig";
import { fetchAllProds } from "../reducers/getAllProdsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { rapport } from "../api/rapport";
import axios from "axios";
import Rapport from "../components/Rapport";

type Props = {};

const Statistics = (props: Props) => {
  const dispatch = useDispatch<any>();
  const company = useSelector((state: any) => state.company.companies);
  const user = useSelector((state: any) => state.user.users);
  const products = useSelector((state: any) => state.getAllProds.data);

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchUsers());
    dispatch(fetchAllProds());
  }, [dispatch]);

  const currentDate = new Date();
  const formattedCurrentDay = currentDate.toISOString().split("T")[0];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1 + 1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );

  const [responseData, setResponseData] = useState<any>(null);
  const formattedFirstDay = firstDayOfMonth.toISOString().split("T")[0];
  const formattedLastDay = lastDayOfMonth.toISOString().split("T")[0];

  const [ selectedRapport, setSelectedRapport ] = useState<number>(0);

  const [startDate, setStartDate] = useState(formattedFirstDay);
  const [endDate, setEndDate] = useState(formattedLastDay);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>("");

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = new Date(event.target.value);
    setStartDate(event.target.value);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedNextDay = nextDay.toISOString().split("T")[0];
    setEndDate(formattedNextDay);
  };

  const handleTodayClick = () => {
    const formattedCurrentDay = currentDate.toISOString().split("T")[0];

    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedNextDay = nextDay.toISOString().split("T")[0];

    setStartDate(formattedCurrentDay);
    setEndDate(formattedNextDay);
  };

  const handlePreviousDayClick = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const formattedPreviousDay = previousDay.toISOString().split("T")[0];

    const nextDay = new Date(previousDay);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedNextDay = nextDay.toISOString().split("T")[0];

    setStartDate(formattedPreviousDay);
    setEndDate(formattedNextDay);
  };

  const handleThisWeekClick = () => {
    const currentDay = currentDate.getDay();
    const diff =
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(diff);
    const formattedStartOfWeek = startOfWeek.toISOString().split("T")[0];

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(diff + 6);
    const formattedEndOfWeek = endOfWeek.toISOString().split("T")[0];

    setStartDate(formattedStartOfWeek);
    setEndDate(formattedEndOfWeek);
  };

  const handleThisMonthClick = (m : number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() - m;

    const startOfMonth = new Date(year, month, 1 + 1);
    const formattedStartOfMonth = startOfMonth.toISOString().split("T")[0];

    const nextMonth = month + 1;
    const endOfMonth = new Date(year, nextMonth, 0 + 1);
    const formattedEndOfMonth = endOfMonth.toISOString().split("T")[0];

    setStartDate(formattedStartOfMonth);
    setEndDate(formattedEndOfMonth);
  };

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleButtonClickRap = (titleRapport: string) => {
    setSelectedButton(titleRapport);
    const selectedRapport = rapport.find(
      (item) => item.titleRapport === titleRapport
    );
    if (selectedRapport) {
      const selectedItems = selectedRapport.selector ?? [];
      setSelectedItems(selectedItems);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  useEffect(() => {
    //console.log(selectedUser);
    //console.log(startDate);
    //console.log(endDate);
  }, [selectedUser, startDate, endDate]);

  const fetchParticipationCount = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/getParticipationCount`,
        {
          userId: selectedUser,
          dateDebut: startDate,
          dateFin: endDate,
        }
      );
      //setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getProductsTotalPrice = async () => {
    try {
      // Implement your logic here
    } catch (error) {
      console.error(error);
    }
  };

  const getUserByProducts = async () => {
    try {
      // Implement your logic here
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendButtonClick = () => {
    if (selectedButton === "Participation Count") {
      fetchParticipationCount();
      console.log("fetchParticipationCount");
    } else if (selectedButton === "Products Total Price") {
      getProductsTotalPrice();
      console.log("getProductsTotalPrice");
    }
  };

  function generateImgUrl(filePath: string) {
    console.log("filePath", filePath);
    if(filePath.includes("http")) return filePath;
    return `${PICT_URL}${filePath}`;
  }

  const renderSelectedOptions = () => {
    return (
      <div>
        {selectedItems.map((option, optionIndex) => (
          <div key={optionIndex}>
            {option.selected === "var1" && (
              <div>
                <h4>User List</h4>
                <select onChange={handleChange} value={selectedUser}>
                  {user.map((name: any, nameIndex: number) => (
                    <>
                      <option key={nameIndex} value={name._id}>
                        {name.userName}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            )}
            {option.selected === "var2" && (
              <div>
                <h4>Company List</h4>
                <ul>
                  {company.map((name: any, nameIndex: number) => (
                    <li key={nameIndex}>{name.companyName}</li>
                  ))}
                </ul>
              </div>
            )}
            {option.selected === "var3" && (
              <div>
                <h4>Product List</h4>
                {products.map((prod: any, index: number) => (
                  <div
                    className="flex flex-row gap-x-3 items-center"
                    key={index}
                  >
                    <div className="prodSwipe w-1/3">
                      <Swiper spaceBetween={50} slidesPerView={1}>
                        {prod?.files.map((file: any) => (
                          <SwiperSlide key={file.filePath}>
                            <img
                              className="rounded-lg"
                              src={generateImgUrl(file.filePath)} 
                              style={{ width: "100px", height: "100px" }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="text-center uppercase">{prod.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
     
        <div className="stats-date">
          <div className="stats-date-select">
            <button className="stats-date-select-item"  onClick={() => handleThisMonthClick(1)}>Mois précedent</button>
            <button className="stats-date-select-item"  onClick={() => handleThisWeekClick()}>Cette semaine</button>
            <button className="stats-date-select-item"  onClick={() => handleThisMonthClick(0)}>Ce mois</button>
          </div>
          <div>
            <input
              type="date"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                width: "200px",
                marginRight: 10,
                height: 40
              }}
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                width: "200px",
                height: 40
              }}
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>
      <div className="rapport-container">
        <div className="list-rapports">
          <div className="rapport-item" onClick={() => setSelectedRapport(0)}>Rapport Utilisateurs</div>
          <div className="rapport-item" onClick={() => setSelectedRapport(0)}>Rapport Partenaires</div>
          <div className="rapport-item" onClick={() => setSelectedRapport(0)}>Rapport Enchères</div>
        </div>
        <div className="rapport-result">
          <Rapport rapportType={selectedRapport} dd={startDate} df={endDate} />
        </div>
      </div>
     
      <div className={`modal ${isModalOpen ? "block" : "hidden"}`}>
        {renderSelectedOptions()}
        <button onClick={handleButtonClick}>Close</button>
        <button onClick={handleSendButtonClick}>send</button>
      </div>
    </div>
  );
};

export default Statistics;
