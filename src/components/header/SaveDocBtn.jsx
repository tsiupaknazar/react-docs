import { Save } from 'lucide-react';

import PropTypes from "prop-types";

const SaveDocBtn = ({ handleSave }) => {
  return (
    <button onClick={handleSave} className='mr-2'>
      <Save className='text-primary' size="30px" />
    </button>
  );
};

export default SaveDocBtn;

SaveDocBtn.propTypes = {
  handleSave: PropTypes.func.isRequired,
}
