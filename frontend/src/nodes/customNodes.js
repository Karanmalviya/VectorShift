// customNodes.js
import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const NoteNode = ({ id, data }) => {
    const [note, setNote] = useState(data?.note || '');
    return (
        <BaseNode id={id} title="Note" inputs={[]} outputs={[]}>
            <textarea
                className="node-textarea"
                placeholder="Type a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
        </BaseNode>
    );
};

export const TimerNode = ({ id, data }) => {
    const [delay, setDelay] = useState(data?.delay || 1000);
    return (
        <BaseNode id={id} title="Timer" outputs={[{ id: `${id}-out` }]}>
            <label className="node-label">
                Delay (ms)
                <input type="number" className="node-input" value={delay} onChange={(e) => setDelay(e.target.value)} />
            </label>
        </BaseNode>
    );
};

export const ConditionNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            title="Condition"
            inputs={[{ id: `${id}-in` }]}
            outputs={[
                { id: `${id}-true`, style: { top: '30%' } },
                { id: `${id}-false`, style: { top: '70%' } }
            ]}
        >
            <div className="node-content" style={{ fontSize: '0.8rem' }}>
                <span>Evaluates input logic and branches execution.</span>
            </div>
        </BaseNode>
    );
};

export const FilterNode = ({ id, data }) => {
    return (
        <BaseNode id={id} title="Filter" inputs={[{ id: `${id}-in` }]} outputs={[{ id: `${id}-out` }]}>
            <select className="node-select">
                <option>Exclude Empty</option>
                <option>Regex Match</option>
                <option>Threshold</option>
            </select>
        </BaseNode>
    );
};

export const TransformNode = ({ id, data }) => {
    return (
        <BaseNode id={id} title="Transform" inputs={[{ id: `${id}-in` }]} outputs={[{ id: `${id}-out` }]}>
            <select className="node-select">
                <option>Uppercase</option>
                <option>JSON Parse</option>
                <option>Trim</option>
            </select>
        </BaseNode>
    );
};
