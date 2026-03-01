import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: `${id}-system`, position: Position.Left, style: { top: `${100 / 3}%` } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: `${200 / 3}%` } }
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div className="node-content" style={{ color: '#64748b', fontSize: '0.8rem' }}>
        <span>Optimized Large Language Model instance for sequence generation.</span>
      </div>
    </BaseNode>
  );
}
