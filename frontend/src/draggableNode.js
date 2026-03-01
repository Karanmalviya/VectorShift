// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '100px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        justifyContent: 'center',
        padding: '0 12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      draggable
    >
      <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </div>
  );
};
