import React from "react";

type ModalProps = {
  showModal: boolean;
  onSubmit: (data: any) => void;
  setShowModal: (show: boolean) => void;
  register: any;
  errors: any;
};

const NotesModal = ({
  showModal,
  onSubmit,
  setShowModal,
  register,
  errors,
}: ModalProps) => {
  return (
    <>
      {showModal && (
        <div className="window-overlay">
          <div className="modal-window">
            <div className="modal-header">
              <div className="modal-header-title">Nouvelle note</div>
            </div>
            <div className="modal-header-content">
              <div className="flex flex-col">
                <form onSubmit={onSubmit} style={{ width: '100%'}}>
                  
                  <div className="modal-form-line">
                    <div className="modal-line-label">Titre de la note</div>
                    <div className="midal-line-input">
                    <input
                    {...register("title", { required: true })}
                    placeholder="Titre de la note"
                    />
                    </div>
                    {errors.title && <div className="lodal-form-error">Champs obligatoire</div>}
                  </div>
                  
                  <div className="modal-form-line">
                    <div className="modal-line-label">Contenu de la note</div>
                    <div className="midal-line-input">
                    <textarea
                      {...register("content", { required: true })}
                      placeholder="Contenu de la note"
                    />
                    </div>
                    {errors.content && <div className="lodal-form-error">This field is required</div>}
                  </div>
                  
                  <div className="modal-form-line flexRight">
                    <button type="submit" className="form-submit-button">Create Note</button>
                    <button className="form-close-button" onClick={() => setShowModal(false)}>Close</button>
                  </div>
          
                </form>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesModal;
