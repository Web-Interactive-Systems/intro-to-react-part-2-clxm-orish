import { Edit, Trash } from 'lucide-react';
import { styled } from '@stitches/react';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';



const Card = styled('div', {
  backgroundColor: 'var(--accent-2)',
  borderRadius: '12px',
  padding: '16px',
  minHeight: '120px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  variants: {
    selected: {
      true: {
        boxShadow: '0 0 0 3px #4CAF50 !important',
      },
      false: {},
    },
  },

  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
  },
});

const TopSection = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '4px',
});

const InfoGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '1rem',
  fontWeight: '500',
});

const ActionGroup = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
  marginTop: '8px',
});

const RoleText = styled('p', {
  margin: 0,
  fontSize: '0.95rem',
  lineHeight: '1.3',
});

const AgentBox = ({ agent, onEdit, onDelete, isSelected }) => {
  return (
    <Card selected={isSelected ? 'true' : 'false'}>
      <TopSection>
        <InfoGroup>
          <span style={{ fontSize: '1.5rem' }}>{agent.emoji}</span>
          <span>{agent.title}</span>
        </InfoGroup>
      </TopSection>
      <RoleText>{agent.role}</RoleText>
      <ActionGroup>
        <Edit onClick={() => onEdit(agent)} className="cursor-pointer hover:text-blue-500" />
        <Trash onClick={() => onDelete(agent.id)} className="cursor-pointer hover:text-red-500" />
      </ActionGroup>
    </Card>
  );
};

export default AgentBox;
