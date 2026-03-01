import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;


      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(l => l.length));
      textareaRef.current.style.width = `${Math.max(160, maxLineLength * 8)}px`;
    }
  }, [currText]);


  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    setVariables(Array.from(matches));
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const inputHandles = variables.map((variable, index) => ({
    id: `${id}-${variable}`,
    position: Position.Left,
    style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` }
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      <div className="node-content">
        <label className="node-label">
          Content
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            rows={1}
          />
        </label>
      </div>
    </BaseNode>
  );
}
