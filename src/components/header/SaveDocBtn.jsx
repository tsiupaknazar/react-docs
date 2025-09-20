import { Save } from 'lucide-react';

const SaveDocBtn = ({ handleSave }) => {
  return (
    <button onClick={(handleSave)} className='mr-2'>
      <Save className='text-primary' size="30px" />
    </button>
  );
};

export default SaveDocBtn;
