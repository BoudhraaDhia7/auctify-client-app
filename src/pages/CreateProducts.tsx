import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProductsApi } from "../reducers/api";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddProduct } from "../reducers/globalSlice";
import { addDays } from "../utils/helpers";
import { fetchProducts } from "../reducers/productsSlice";

interface FormValues {
  name: string;
  price: number;
  description: string;
  company: string;
  files: FileList;
  benefice : number;
}

interface Props {
  isModalOpen: boolean;
}


export const CreateProduct = ( { isModalOpen } : Props ) => {

  const dispatch = useDispatch<any>();
  const global = useSelector((state: any) => state.global);

  const coId = localStorage.getItem("userID");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [isSuccess, setIsSuccess] = useState(false);
 

  const onSubmit = async (formData: FormValues) => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("price", formData.price.toString());
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("company", formData.company);
    formDataToSubmit.append("benefit", formData.benefice.toString());
    formDataToSubmit.append("openDate", addDays(15).toString());

    for (let i = 0; i < formData.files.length; i++) {
      formDataToSubmit.append("files", formData.files[i]);
    }
    try {
      await createProductsApi(formDataToSubmit);
      setIsSuccess(true);
      toast.success("Product created successfully!");
      reset();
      closeModal();
      if (coId) {dispatch(fetchProducts(coId))}
    } catch (error) {
      toast.error("Error creating product");
    }
  };

  const openModal = () => {
    dispatch(setIsAddProduct(true));
  };

  const closeModal = () => {
    dispatch(setIsAddProduct(false));
  };

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="modal-window">
        <div className="modal-header">
          <div className="modal-header-title">Nouveau produit</div>
        </div>
        <div className="modal-header-content">
              <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-form-line">
            <div className="modal-line-label">Produit</div>
            <div className="midal-line-input">
            <input type="text" {...register("name", { required: true })} />
            </div>
            {errors.name && <div className="lodal-form-error">Champs obligatoire</div>}
          </div>

          <div className="modal-2-cols">
            <div className="modal-form-line">
              <div className="modal-line-label">Prix</div>
              <div className="midal-line-input">
              <input type="number" {...register("price", { required: true })} />
              </div>
              {errors.price && <div className="lodal-form-error">Champs obligatoire</div>}
            </div>
            <div className="modal-form-line">
              <div className="modal-line-label">Coefficient [bénefice]</div>
              <div className="midal-line-input">
              <input type="number" {...register("benefice", { required: true })} />
              </div>
              {errors.benefice && <div className="lodal-form-error">Champs obligatoire</div>}
            </div>
          </div>


          <div className="modal-form-line">
          <div className="modal-line-label">Description</div>
          <div className="midal-line-input">
            <textarea
              {...register("description", { required: true })}
            />
            </div>
            {errors.description && <div className="lodal-form-error">Champs obligatoire</div>}
          </div>
          <div>
            <input
              type="text"
              {...register("company")}
              defaultValue={localStorage.getItem("userID") ?? ""}
              hidden
            />
          </div>
          <div className="modal-form-line modal-form-line-row">
            <div className="modal-line-label">Photos</div>
            <div className="midal-line-input midal-line-input-flex">
            <input style={{ height: 30, border: 'none' }}
              type="file"
              {...register("files", { required: true })}
              multiple
            />
            </div>
          </div>
          <div className="modal-form-line flexRight">
            <button type="submit" className="form-submit-button">AJOUTER</button>
            <button
              onClick={closeModal}
              className="form-close-button" 
            >
              Close
            </button>
          </div>
          
        </form>
        </div>
        </div>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default CreateProduct;
