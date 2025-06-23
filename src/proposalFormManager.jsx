import { useState } from 'react';
import PropTypes from 'prop-types';

function ProposalFormManager({ initialData = {}, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and Description are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/proposals', {
        method: initialData.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit proposal.');
      }

      const result = await response.json();
      if (typeof onSubmitSuccess === 'function') {
        onSubmitSuccess(result);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the proposal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="proposal-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

ProposalFormManager.propTypes = {
  initialData: PropTypes.object,
  onSubmitSuccess: PropTypes.func
};

export default ProposalFormManager; 