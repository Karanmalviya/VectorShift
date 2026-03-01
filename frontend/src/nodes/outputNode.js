import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: `${id}-value` }]}
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
          <select className="node-select" value={outputType} onChange={(e) => setOutputType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
