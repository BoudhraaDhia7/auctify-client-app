import React, { useState } from "react";
import { fetchUserInfo } from "../reducers/currentUserSLice";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, PICT_URL } from "../api/axiosConfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/modal";
import { formatDate } from "../utils/helpers";


type Props = {};

const Profile = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const companyProfile = useSelector(
    (state: any) => state?.currentUser?.user?.currentUser
  );
  //console.log(companyProfile);
  const [newAddress, setNewAddress] = useState(companyProfile?.address || "");
  const [newVille, setNewVille] = useState(companyProfile?.city || "");
  const [newPhone, setNewPhone] = useState(companyProfile?.phone || "");
  const [newCompanyName, setNewCompanyName] = useState(
    companyProfile?.companyName || ""
  );
  const [newPays, setNewPays] = useState(companyProfile?.country || "");
  const [newResponsable, setNewResponsable] = useState(
    companyProfile?.responsable || ""
  );
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] =
    useState(false);
  //update password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errorp, setErrorp] = useState("");
  const [successp, setSuccessp] = useState("");
  //update email
  const [newEmail, setNewEmail] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isUpdateEmailModalOpen, setIsUpdateEmailModalOpen] = useState(false);

  const [editing, setEditing] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value);
  };
  const handleVilleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVille(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(e.target.value);
  };
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompanyName(e.target.value);
  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPays(e.target.value);
  };
  const handleResponsableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewResponsable(e.target.value);
  };
  const handleProfileUpdate = async () => {
    try {
      if (editing) {
        const updatedProfile = {
          ...companyProfile,
          address: newAddress !== "" ? newAddress : companyProfile.address,
          city: newVille !== "" ? newVille : companyProfile.city,
          phone: newPhone !== "" ? newPhone : companyProfile.phone,
          companyName:
            newCompanyName !== "" ? newCompanyName : companyProfile.companyName,
          country: newPays !== "" ? newPays : companyProfile.country,
          responsable:
            newResponsable !== "" ? newResponsable : companyProfile.responsable,
        };

        const response = await axios.patch(
          `${API_URL}/company/updateProfileCompany/${companyProfile.id}`,
          updatedProfile
        );
        console.log(response.data.data);
        if (id) {dispatch(fetchUserInfo(id));}
        toast.success("Profile updated successfully!");
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/company/updatePassword/${companyProfile.id}`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        }
      );

      toast.success("Password updated successfully!"); // Display success message
      setError("");
      closeUpdatePasswordModal();
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred.");
      setSuccess("");
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/company/updateEmailCompany/${companyProfile.id}`,
        {
          newEmail,
          confirmationPassword,
        }
      );
      toast.success("Mise à jour de l'email effectuée avec succès");
      setErrorp("");
      setNewEmail("");
      setConfirmationPassword("");
    } catch (error: any) {
      console.error(error);
      setErrorp(error.response?.data?.message || "An error occurred.");
      setSuccessp("");
    }
  };

  const handleUpdateEmailClick = () => {
    setIsUpdateEmailModalOpen(true);
  };

  const closeUpdateEmailModal = () => {
    setIsUpdateEmailModalOpen(false);
  };

  const handleClick = () => {
    setEditing(!editing);
  };

  const handleUpdatePasswordClick = () => {
    setIsUpdatePasswordModalOpen(true);
  };

  const closeUpdatePasswordModal = () => {
    setIsUpdatePasswordModalOpen(false);
  };

  return (
    <div className="w-full h-full">
      <div className="detailsRow">
        <div className="cardDetailsContainer width60">
          <div className="profileContent">
            <div className="profileAvatar">
              <div className="avatar">
                <img
                  src={`${PICT_URL}/${companyProfile?.logo}`}
                  alt=""
                  className="rounded-full"
                />
              </div>

              <div className="avatarName">{companyProfile?.userName}</div>
              <div className="profileInfos">
                <div className="profileRow ProfileDate">{formatDate(companyProfile?.created_at)}</div>

                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">company</div>
                    {!editing ? (
                      <div className="value">{companyProfile?.companyName}</div>
                    ) : (
                      <div style={{ width: '100%'}}>
                        <input className="param-profile-input"
                          value={newCompanyName}
                          onChange={handleCompanyNameChange}
                        />
                      </div>
                    )}
                  </div>

                  <div className="profileGridItem">
                    <div className="label">mat</div>
                    <div className="value">
                      {companyProfile?.matricule_fiscale}
                    </div>
                  </div>
                </div>
                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">phone</div>
                    {!editing ? (
                      <div className="value">{companyProfile?.phone}</div>
                    ) : (
                      <div style={{ width: '100%'}}>
                        <input className="param-profile-input" value={newPhone} onChange={handlePhoneChange} />
                      </div>
                    )}
                  </div>
                  <div className="profileGridItem">
                    <div className="label">resp</div>
                    {!editing ? (
                      <div className="value">{companyProfile?.responsable}</div>
                    ) : (
                      <div style={{ width: '100%'}}>
                        <input className="param-profile-input"
                          value={newResponsable}
                          onChange={handleResponsableChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="profileRow">
                  <div className="profileGridItem">
                    <div className="label">Adresse</div>
                    {!editing ? (
                      <div className="value">{companyProfile?.address}</div>
                    ) : (
                      <div style={{ width: '100%'}}>
                        <input className="param-profile-input"
                          value={newAddress}
                          onChange={handleAddressChange}
                        />
                      </div>
                    )}
              
                  </div>
                </div>
                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">Ville</div>
                    {!editing ? (
                      <div className="value">{companyProfile?.city}</div>
                    ) : (
                      <div style={{ width: '100%'}}>
                        <input className="param-profile-input" value={newVille} onChange={handleVilleChange} />
                      </div>
                    )}
                  </div>
                  <div className="profileGridItem">
                    <div className="label">Pays</div>
                    {!editing ? (
                      <div className="value">{companyProfile?.country}</div>
                    ) : (
                      <div style={{ width: '100%'}}>
                        <input className="param-profile-input" value={newPays} onChange={handleCountryChange} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="profileRow flex ">
                    <div className="px-2 py-1">
                      {companyProfile?.status == "1" ? (
                        <div className="h-2.5 w-2.5 rounded-full  bg-green-500 "></div>
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full  bg-red-700 "></div>
                      )}
                    </div>
                    <div className="ProfileDate">Utilisateur</div>
                    <div className="ml-1 ProfileDate">
                      {companyProfile?.status == "1" ? (
                        <div className="ProfileDate">actif</div>
                      ) : (
                        <div className="ProfileDate">inactif</div>
                      )}
                    </div>
                  </div>
                  <div className=".modal-form-line-row">
                    {!editing ? (
                      <>
                        <button className="form-submit-button" onClick={handleClick}>
                          {" "}
                          Update your Profile
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="form-submit-button" onClick={handleProfileUpdate}>
                          save informations
                        </button>
                        <button className="form-close-button" onClick={handleClick}>cancel</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardDetailsContainer width40">
          <div className="header">Paramètres du compte</div>
          <div className="content">
            <div className="param-title">Changement du mot de passe</div>
            <div className="param-content">
            <form style={{width: '100%'}} onSubmit={handlePasswordUpdate}>

                <div className="modal-form-line">
                  <div className="modal-line-label">Ancien mot de passe</div>
                  <div className="midal-line-input">
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  </div>  
                </div>

                <div className="modal-form-line">
                  <div className="modal-line-label">Nouveau mot de passe</div>
                  <div className="midal-line-input">
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>  
                </div>

                <div className="modal-form-line">
                  <div className="modal-line-label">Confirme mot de passe</div>
                  <div className="midal-line-input">
                    <input
                      type="password"
                      id="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>  
                </div>
              
                <div className="modal-form-line">
                  <button type="submit" className="form-submit-button">Mettre à jour</button>
                </div>
                <div className="modal-form-line">
                  {error && <div className="lodal-form-error">{error}</div>}
                  {success && <div className="lodal-form-error">{success}</div>}
                </div>
            </form>
            </div>
            <div className="param-title">Changement d'email</div>
            <div className="param-content">
              <form style={{width: '100%'}} onSubmit={handleEmailUpdate}>
                <div className="modal-form-line">
                  <div className="modal-line-label">New Email</div>
                  <div className="midal-line-input">
                    <input
                      type="email"
                      id="newEmail"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  
                </div>

                <div className="modal-form-line">
                  <div className="modal-line-label">Mot de passe</div>
                  <div className="midal-line-input">
                    <input
                      type="email"
                      id="newEmail"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  
                </div>
                <div className="modal-form-line">
                  <button type="submit" className="form-submit-button">Mettre à jour</button>
                </div>
                <div className="modal-form-line">
                  {errorp && <div className="lodal-form-error">{errorp}</div>}
                  {successp && <div className="lodal-form-error">{successp}</div>}
                </div>
                
              </form>
            </div>
           
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
