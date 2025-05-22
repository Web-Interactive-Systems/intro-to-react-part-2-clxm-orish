import { useStore } from '@nanostores/react';
import { addAgent, $agentsStore, SupprAgent, updateAgent } from '@/store/agents';
import AgentBox from '@/features/chat/AgentBox';
import { styled } from '@stitches/react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import AgentForm from './AgentForm';

const Container = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  padding: '16px',
  gap: '24px',
});

const FormColumn = styled('div', {
  flex: '0 0 300px',
});

const AgentsColumn = styled('div', {
  flex: '1',
});

const GridContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
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

const AgentList = () => {
  const agents = useStore($agentsStore);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const handleDeleteAgent = (id) => {
    SupprAgent(id);
    if (selectedAgentId === id) {
      setSelectedAgentId(null);
    }
  };

  const handleAddAgent = (agentData) => {
    if (editingAgent) {
      updateAgent({ ...agentData, id: editingAgent.id });
    } else {
      const newAgent = {
        id: Math.random().toString(),
        ...agentData,
      };
      addAgent(newAgent);
    }
    setIsFormOpen(false);
    setEditingAgent(null);
  };

  const handleEditAgent = (agent) => {
    setEditingAgent(agent);
    setIsFormOpen(true);
    setSelectedAgentId(agent.id);
  };

  return (
    <Container>
      <FormColumn>
        <AddButton onClick={() => {
          setEditingAgent(null);
          setIsFormOpen(!isFormOpen);
          setSelectedAgentId(null);
        }}>
          <Plus /> Ajouter un Agent
        </AddButton>

        {isFormOpen && (
          <AgentForm
            onSave={handleAddAgent}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingAgent(null);
            }}
            initialData={editingAgent}
          />
        )}
      </FormColumn>

      <AgentsColumn>
        <GridContainer>
          {agents.map((agent) => (
            <div key={agent.id} style={{ flex: '0 0 220px' }}>
              <AgentBox
                agent={agent}
                onEdit={handleEditAgent}
                onDelete={handleDeleteAgent}
                isSelected={selectedAgentId === agent.id}
              />
            </div>
          ))}
        </GridContainer>
      </AgentsColumn>
    </Container>
  );
};

export default AgentList;
