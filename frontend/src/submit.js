
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const result = await response.json();


            alert(
                `Pipeline Analysis:\n\n` +
                `• Nodes: ${result.num_nodes}\n` +
                `• Edges: ${result.num_edges}\n` +
                `• Is DAG: ${result.is_dag ? '✅ Yes' : '❌ No (Cycle detected)'}`
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: Could not connect to the backend server. Please ensure it is running on ${process.env.REACT_APP_API_KEY}.`

            );
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button
                type="button"
                onClick={handleSubmit}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: '#1e293b',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => e.target.style.background = '#334155'}
                onMouseOut={(e) => e.target.style.background = '#1e293b'}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
