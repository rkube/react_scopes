// This is the baseline 'droppable' implementation from dndkit
// https://docs.dndkit.com/introduction/getting-started

import React from 'react';
import {useDroppable} from '@dnd-kit/core';

function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export { Droppable }