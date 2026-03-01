import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: `${id}-value` }]}
    >
      <div className="node-content">
        <label className="node-label">
          Name
          <input
            type="text"
            className="node-input"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>
        <label className="node-label">
          Type
          <select className="node-select" value={inputType} onChange={(e) => setInputType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
