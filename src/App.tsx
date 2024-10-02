import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import UsersList from "../src/pages/UsersList";
import UsersInfos from "../src/pages/UsersInfos";
import CompaniesList from "../src/pages/CompaniesList";
import ProductList from "../src/pages/ProductsList";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminPrivateRoute from "./privateRoutes/AdminPrivateRoutes";
import CompanyPrivateRoute from "./privateRoutes/CompanyRoutes";
import CompanyProducts from "./pages/companyProducts";
import CreateProducts from "./pages/CreateProducts";
import CompanyInfos from "./pages/CompanyInfos";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import Auctions from "./pages/Auctions";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Parametres from "./pages/Parametres";
import Live from "./pages/Live";
import Statistics from "./pages/Statistics";
import Dashboard from "./pages/Dashboard";
import ProductInfo from "./pages/ProductInfo";
import Register from "./pages/Register";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} index />
          <Route path="/register" element={<Register />} index />
          <Route path="/reset-password" element={<ResetPassword />} index />
          <Route path="/forgotPassword" element={<ForgotPassword />} index />
        
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route
              path="/usersList"
              element={
                <AdminPrivateRoute>
                  <UsersList />
                </AdminPrivateRoute>
              }
              index
            />
            <Route
              path="/productinfo/:id"
              element={
                <PrivateRoute>
                  <ProductInfo />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/companiesList"
              element={
                <AdminPrivateRoute>
                  <CompaniesList />
                </AdminPrivateRoute>
              }
              index
            />
            <Route
              path="/productsList"
              element={
                <AdminPrivateRoute>
                  <ProductList />
                </AdminPrivateRoute>
              }
              index
            />
            <Route
              path="/displayUserInfos/:id"
              element={
                <AdminPrivateRoute>
                  <UsersInfos />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/displayCompanyInfos/:id"
              element={
                <AdminPrivateRoute>
                  <CompanyInfos />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/displayCompanyProducts"
              element={
                <CompanyPrivateRoute>
                  <ProductList />
                </CompanyPrivateRoute>
              }
            />
            <Route
              path="/parametres/:userId"
              element={
                <PrivateRoute>
                  <Parametres />
                </PrivateRoute>
              }
            ></Route>
            
            
            <Route path="/profile/:id" element={<Profile />} />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            <Route path="test" element={<Auctions />} />
            <Route path="live" element={<Live />} />
            <Route path="liveCompany" element={<Live />} />
            <Route path="Statistiques" element={<Statistics />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
