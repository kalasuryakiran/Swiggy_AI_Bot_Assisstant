import React from 'react';

const DragHandle = ({ onDrag }) => {
  return (
    <div 
      className="flex justify-center py-2 cursor-grab active:cursor-grabbing"
      onTouchStart={onDrag}
      onMouseDown={onDrag}
    >
      <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
    </div>
  );
};

export default DragHandle;