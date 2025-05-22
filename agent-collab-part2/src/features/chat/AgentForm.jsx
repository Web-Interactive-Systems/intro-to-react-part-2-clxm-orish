import { useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import EmojiPicker from './EmojiPicker';

const EmojiList = ['😀', '😎', '🤖', '👽', '👩‍💻', '🧙‍♂️', '🧠', '👻', '🦾', '🐉'];

const FormContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px',
});

const Input = styled('input', {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
});

const TextArea = styled('textarea', {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  minHeight: '80px',
});

const Button = styled('button', {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '8px',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: '#45a049',
  }
});

const Slider = styled('input', {
  width: '100%',
  marginTop: '8px',
  appearance: 'none',
  height: '6px',
  borderRadius: '5px',
  background: '#ccc',
  outline: 'none',
  opacity: '0.9',
  transition: 'opacity .2s',

  '&:hover': {
    opacity: '1',
  },

  '&::-webkit-slider-thumb': {
    appearance: 'none',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    background: '#4CAF50',
    cursor: 'pointer',
  }
});

const AgentForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    emoji: '😀',
    title: '',
    role: '',
    response_format: 'text',
    temperature: 0.5,
    desired_response: ''
  });


  // 🧠 Mise à jour si initialData est fourni (édition)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <FormContainer>
      <EmojiPicker EmojiList={EmojiList} onSelect={(emoji) => setFormData({ ...formData, emoji })} ></EmojiPicker>
      <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
      <Input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
      <Input name="response_format" placeholder="Response Format" value={formData.response_format} onChange={handleChange} />
      <TextArea name="desired_response" placeholder="Desired Response" value={formData.desired_response} onChange={handleChange} />

      <label>Temperature: {formData.temperature}</label>
      <Slider
        type="range"
        min="0"
        max="1"
        step="0.01"
        name="temperature"
        value={formData.temperature}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit}>Sauver</Button>
      <Button onClick={onCancel} style={{ backgroundColor: '#d9534f' }}>Annuler</Button>
    </FormContainer>
  );
};

export default AgentForm;
