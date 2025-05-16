import { useStore } from '@nanostores/react';
import { addAgent, $agentsStore, SupprAgent } from '@/store/agents';
import AgentBox from '@/features/chat/AgentBox';
import { styled } from '@stitches/react';
import {  useState } from 'react'
import { Plus } from 'lucide-react';
import AgentForm from './AgentForm';

const GridContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
    padding: '16px',
  });
  
  const AddButton = styled('button', {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '16px',
    transition: 'background-color 0.3s ease',
  
    '&:hover': {
      backgroundColor: '#45a049',
    }
  });
  
  const AgentList = ({ onEdit }) => {
    const agents = useStore($agentsStore);
    const [isFormOpen, setIsFormOpen] = useState(false);
  
    // ✅ Fonction de suppression liée au bouton
    const handleDeleteAgent = (id) => {
      SupprAgent(id);
    };
  
    const handleAddAgent = (agentData) => {
      const newAgent = {
        id: Math.random().toString(),
        ...agentData
      };
      addAgent(newAgent);
      setIsFormOpen(false);
    };
  
    return (
      <div>
        <AddButton onClick={() => setIsFormOpen(!isFormOpen)}>
          <Plus /> Ajouter un Agent
        </AddButton>
  
        {isFormOpen && (
          <AgentForm
            onSave={handleAddAgent}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
  
        <GridContainer>
          {agents.map((agent) => (
            <AgentBox
              key={agent.id}
              agent={agent}
              onEdit={onEdit}
              onDelete={handleDeleteAgent}
            />
          ))}
        </GridContainer>
      </div>
    );
  };
  
  export default AgentList;