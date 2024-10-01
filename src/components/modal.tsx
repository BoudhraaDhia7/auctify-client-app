import React, { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  children: any;
  onClose: () => void;
};
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="window-overlay">
          
            {children}
            
          </div>
        
      )}
    </>
  );
};

export default Modal;
