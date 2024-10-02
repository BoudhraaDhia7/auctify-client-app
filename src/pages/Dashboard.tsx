import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProductsSoldePerMonth } from "../reducers/totalProductsPricePerMonthSlice";
import { fetchTotalSoldeParticipation } from "../reducers/totalSoldeParticipationPerMonthSlice";
import { fetchTotalAmountByCompany } from "../reducers/totalAmountByCompanySlice";
import { fetchTopParticipant } from "../reducers/topParticipantSlice";
import ApexCharts from "apexcharts";
import { ApexOptions } from "apexcharts";
import TotalCompanies from "./TotalCompanies";
import TotalProds from "./TotalProds";
import TotalProdsBenefits from "./TotalProdsBenefits";
import TotalUsers from "./TotalUsers";
import TotalSolde from "./Solde";
import TotalParticipation from "./TotalParticipation";
import { API_URL } from "../api/axiosConfig";
import LastProducts from "./LastProducts";
type Props = {};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Dashboard = (props: Props) => {
  const dispatch = useDispatch<any>();
  const totSoldePerMonth = useSelector(
    (state: any) => state?.totalProductsSoldePerMonth?.data
  );
  const totalSoldeParticipationPerMonth = useSelector(
    (state: any) => state?.totalSoldeParticipationPerMonth?.data
  );
  const totalAmountByCompany = useSelector(
    (state: any) => state?.totalAmountByCompany?.data
  );

  const topPlayers = useSelector((state: any) => state?.topParticipant?.data);
  //console.log(topPlayers);

  const chartRef = useRef<any>();
  const participationChartRef = useRef<any>();
  const companyChartRef = useRef<any>();

  useEffect(() => {
    dispatch(fetchTotalProductsSoldePerMonth());
    dispatch(fetchTotalSoldeParticipation());
    dispatch(fetchTotalAmountByCompany());
    dispatch(fetchTopParticipant());
  }, []);

  useEffect(() => {
    if (totSoldePerMonth) {
      const monthData = monthNames.map((month) => {
        const foundData = totSoldePerMonth.find(
          (elem: any) => elem.month === month
        );
        return foundData ? foundData.totalPrice : 0;
      });
  
      const options = {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            distributed: true,
            colors: {
              ranges: [
                { from: 0, to: 15000, color: '#445E97' },
                { from: 15000, to: 30000, color: '#708FD2' },
                { from: 30000, to: 45000, color: '#0E3BA6' },
                { from: 45000, color: '#00133D' }
              ]
            }
          }
        },
        xaxis: {
          categories: monthNames,
        },
        series: [
          {
            name: 'Total Price',
            data: monthData,
          },
        ],
      };
  
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
  
      return () => {
        chart.destroy();
      };
    }
  }, [totSoldePerMonth]);
  
  
  useEffect(() => {
    if (totalSoldeParticipationPerMonth) {
      const monthData = monthNames.map((month) => {
        const foundData = totalSoldeParticipationPerMonth.find(
          (elem: any) => elem.month === month
        );
        return foundData ? foundData.totalAmountGiven : 0;
      });
  
      const options = {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            distributed: true,
            colors: {
              ranges: [
                { from: 0, to: 5000, color: '#445E97' },
                { from: 5000, to: 10000, color: '#708FD2' },
                { from: 10000, to: 15000, color: '#0E3BA6' },
                { from: 15000, color: '#00133D' }
              ]
            }
          }
        },
        xaxis: {
          categories: monthNames,
        },
        series: [
          {
            name: 'Total Amount Given',
            data: monthData,
          },
        ],
      };
  
      const chart = new ApexCharts(participationChartRef.current, options);
      chart.render();
  
      return () => {
        chart.destroy();
      };
    }
  }, [totalSoldeParticipationPerMonth]);

  useEffect(() => {
    if (totalAmountByCompany) {
      const companyData = totalAmountByCompany.map((elem: any) => {
        return {
          x: elem.companyName,
          y: elem.totalAmount,
        };
      });
  
      const options = {
        chart: {
          type: 'pie',
          height: 350,
        },
        colors: ['#445E97', '#708FD2', '#0E3BA6', '#00133D'],
        series: companyData.map((data: any) => data.y),
        labels: companyData.map((data: any) => data.x),
        tooltip: {
          y: {
            formatter: function (val : any) {
              return `Total Amount: ${val}dt`;
            },
          },
        },
      };
  
      const chart = new ApexCharts(companyChartRef.current, options);
      chart.render();
  
      return () => {
        chart.destroy();
      };
    }
  }, [totalAmountByCompany]);
  

  const allMonths = Array.from(Array(12).keys()).map(
    (monthIndex) => monthIndex + 1
  );

  return (
    <div className="dashboardContainer">
      <div className="dashboardLine">
        <div className="dashBoardColum dashStatCol">
          <TotalUsers />
          <TotalSolde />
          <TotalParticipation />
        </div>
        <div className="dashBoardColum dashStatCol">
          <TotalCompanies />
          <TotalProds />
        </div>
        <div className="dashBoardColum dashGraphCol">
          <div className="graphTitle">Produits par mois</div>
          <div style={{width: '100%'}} ref={chartRef}></div>
        </div>
      </div>
      <div className="dashboardLine">
        <div className="dashBoardColum dashGraphCol">
          <div className="graphTitle">Participations par mois</div>
          <div style={{width: '100%'}} ref={participationChartRef}></div>
        </div>
        <div className="dashBoardColum dashCircleGraphCol">
          <div className="graphTitle">Participations par Company</div>
          <div style={{width: '100%'}} ref={companyChartRef}></div>
        </div>
      </div>
      <div className="dashboardLine">
        <div className="dashBoardColum dashCircleGraphCol">
          <div className="graphTitle">Top Participants</div>
          <div style={{width: '100%'}}>
          {topPlayers.map((elem: any, i : number) => (

          <div className="topParticip" key={`tp-${i}`}>
            
            
            <div className="partName">
   
            {/* <img
              src={
                elem.playerAvatar.startsWith("http")
                  ? elem.playerAvatar
                  : `${API_URL}/${elem.playerAvatar}`
              }
              alt=""
              width="30"
              height="30"
              className="rounded-full mr-1"
              style={{ marginRight : 10}}
            /> */}
            <div className="partNameLabel">{elem.playerName}</div>
            </div>
            <div className="partValue">{elem.totalAmountGiven}</div>
           
          </div>
          ))}
          </div>
        </div>
        <div className="dashBoardColum dashGraphCol">
          <div className="graphTitle">Nouveaux produits</div>
          <div className="lastProdContainer">
          <LastProducts />
          </div>
        </div>
      </div>
     
    
     
    </div>
  );
};

export default Dashboard;
