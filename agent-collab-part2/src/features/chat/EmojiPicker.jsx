import { useState } from 'react';
import { styled } from '@stitches/react';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const StyledTabsTrigger = styled(TabsTrigger, {
  all: 'unset',
  fontSize: '1.5rem',
  padding: '2px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background 0.2s ease',

  '&:hover': {
    backgroundColor: 'var(--accent-4)',
  },

  '&[data-state="active"]': {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
});

const PickerButton = styled('button', {
  all: 'unset',
  fontSize: '1.5rem',
  padding: '4px 8px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  cursor: 'pointer',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: 'var(--accent-3)',
  },
});

const PickerContainer = styled('div', {
  position: 'relative',
});

const Popover = styled('div', {
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: '8px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '8px',
  zIndex: 10,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

const EmojiPicker = ({ EmojiList, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(EmojiList[0]);

  const handleSelect = (emoji) => {
    setSelected(emoji);
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <PickerContainer>
      <PickerButton onClick={() => setIsOpen((prev) => !prev)}>
        {selected}
      </PickerButton>
      {isOpen && (
        <Popover>
          <Tabs defaultValue={selected} onValueChange={handleSelect}>
            <TabsList style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {EmojiList.map((emoji) => (
                <StyledTabsTrigger key={emoji} value={emoji}>
                  {emoji}
                </StyledTabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Popover>
      )}
    </PickerContainer>
  );
};

export default EmojiPicker;
