import React from 'react';
import cn from 'classnames';
import styles from './App.module.css';
import './App.css';
import Numbers from './components/Numbers/Numbers';
import Display from './components/Display/Display';
import Operations from './components/Operations/Operations';
import Switch from './components/Switch/Switch';
import DragField from './components/Drag/Drag';
import Equals from './components/Equals/Equals';
import { useTypedSelector } from './hooks/useTypedSelector';

function App(): JSX.Element {
  const { isEditable, dragZone } = useTypedSelector((state) => state.calcState);
  return (
    <div className={styles.app}>
      <div
        className={cn(styles.leftPanel, {
          [styles.disabledPanel]: !isEditable,
        })}
      >
        <Display inZone={false} isDraggable={!dragZone.includes('display')} />
        <Operations inZone={false} isDraggable={!dragZone.includes('operations')} />
        <Numbers inZone={false} isDraggable={!dragZone.includes('numbers')} />
        <Equals inZone={false} isDraggable={!dragZone.includes('equals')} />
      </div>
      <div className={styles.rightPanel}>
        <Switch />
        <DragField />
      </div>
    </div>
  );
}

export default App;
