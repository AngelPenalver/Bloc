import React from 'react';
import Modal from '@mui/material/Modal';
import CircularIndeterminate from './loading';


interface TransitionsModalProps {
  loading: boolean;
}
const TransitionsModal: React.FC<TransitionsModalProps>=({loading}) => {
  
  return (
    <div>
      <Modal
        open={loading}

      >      
            <CircularIndeterminate/>
             </Modal>
    </div>
  );
}
export default TransitionsModal;