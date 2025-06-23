import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchProposals = async () => {
  const response = await axios.get(`${API_BASE_URL}/proposals`);
  return response.data;
};

export const createProposal = async (proposalData) => {
  const response = await axios.post(`${API_BASE_URL}/proposals`, proposalData);
  return response.data;
};

export const updateProposal = async (id, proposalData) => {
  const response = await axios.put(`${API_BASE_URL}/proposals/${id}`, proposalData);
  return response.data;
};

export const deleteProposal = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/proposals/${id}`);
  return response.data;
}; 