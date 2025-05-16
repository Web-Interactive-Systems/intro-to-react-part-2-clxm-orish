import { Edit, Trash } from 'lucide-react';
import { styled } from '@stitches/react';

const Card = styled('div', {
  backgroundColor: 'var(--accent-2)',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',

  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
  }
});

const AgentBox = ({ agent, onEdit, onDelete }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>{agent.emoji}</span>
          <span className="font-semibold">{agent.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Edit onClick={() => onEdit(agent)} className="cursor-pointer hover:text-blue-500" />
          <Trash
            onClick={() => onDelete(agent.id)}  // ✅ Appel de onDelete avec l'id
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
      <p>{agent.role}</p>
    </Card>
  );
};

export default AgentBox;
