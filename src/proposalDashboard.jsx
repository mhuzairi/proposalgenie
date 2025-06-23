import { useState, useEffect } from 'react';

const ProposalDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/proposals");
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();
        setProposals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const filteredProposals = proposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="proposal-dashboard">
      <header>
        <h1>Proposal Dashboard</h1>
      </header>
      <section className="controls">
        <input
          type="text"
          placeholder="Filter proposals..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </section>
      {loading && <p>Loading proposals...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && proposals.length === 0 && <p>No proposals found.</p>}
      {!loading && !error && proposals.length > 0 && filteredProposals.length === 0 && (
        <p>No proposals match the filter criteria.</p>
      )}
      <main>
        {filteredProposals.length > 0 && (
          <ul>
            {filteredProposals.map((proposal) => (
              <li key={proposal.id}>
                <h2>{proposal.title}</h2>
                <p>{proposal.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default ProposalDashboard; 