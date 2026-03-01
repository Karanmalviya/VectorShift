import { Handle, Position } from 'reactflow';
import './nodes.css';

export const BaseNode = ({ id, title, children, inputs = [], outputs = [] }) => {
  return (
    <div className="base-node">

      {inputs.map((input, idx) => (
        <Handle
          key={`${id}-input-${idx}`}
          type="target"
          position={input.position || Position.Left}
          id={input.id || `${id}-input-${idx}`}
          style={input.style}
        />
      ))}

      <div className="node-header">
        <span className="node-title">{title}</span>
      </div>

      <div className="node-content">
        {children}
      </div>


      {outputs.map((output, idx) => (
        <Handle
          key={`${id}-output-${idx}`}
          type="source"
          position={output.position || Position.Right}
          id={output.id || `${id}-output-${idx}`}
          style={output.style}
        />
      ))}
    </div>
  );
};
