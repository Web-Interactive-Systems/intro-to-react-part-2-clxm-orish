import { atom } from 'nanostores';

export const $agentsStore = atom([
  {
    id: Math.random().toString(),
    emoji: '😀',
    title: 'Scifi writer',
    role: 'you are a wonderful writer',
    response_format: 'text',
    temperature: 0.1,
    desired_response: 'a draft of scifi writing',
  }
]);

// Nouveau store pour l'agent sélectionné
export const $currentAgent = atom(null);

// ✅ Fonction pour définir l'agent actuel
export const setCurrentAgent = (agentId) => {
  const agents = $agentsStore.get();
  const selectedAgent = agents.find((agent) => agent.id === agentId);
  $currentAgent.set(selectedAgent || null);
};

// ✅ Fonction d'ajout d'un agent
export const addAgent = (agent) => {
  const agents = $agentsStore.get();
  $agentsStore.set([...agents, agent]);
};

// ✅ Fonction de suppression d'un agent
export const SupprAgent = (id) => {
  const agents = $agentsStore.get();
  const updatedAgents = agents.filter((agent) => agent.id !== id);
  $agentsStore.set(updatedAgents);

  // Si l'agent supprimé est l'actuel, on reset $currentAgent
  if ($currentAgent.get()?.id === id) {
    $currentAgent.set(null);
  }
};

// ✅ Fonction de modification d'un agent
export const updateAgent = (updatedAgent) => {
  const agents = $agentsStore.get();
  const newAgents = agents.map((agent) =>
    agent.id === updatedAgent.id ? updatedAgent : agent
  );
  $agentsStore.set(newAgents);
};
