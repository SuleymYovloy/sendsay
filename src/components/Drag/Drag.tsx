import React, { DragEvent } from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './Drag.module.css'
import imgIcon from './imgIcon.svg'
import Display from '../Display/Display'
import Operations from '../Operations/Operations'
import Equals from '../Equals/Equals'
import Numbers from '../Numbers/Numbers'

function DragField(): JSX.Element {
  const { isFieldHovered, dragZone } = useTypedSelector(
    (state) => state.calcState
  )
  const { hoverField, dropItem } = useActions()
  const dragOverHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    hoverField(true)
  }
  const dragLeaveHandler = () => {
    hoverField(false)
  }
  const dropHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    dropItem()
    hoverField(false)
  }
  if (dragZone.length !== 0) {
    return (
      <div
        className={styles.dragContainer}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
      >
        {dragZone.map((item) => {
          switch (item) {
            case 'display':
              return <Display key={item} inZone isDraggable={false} />
            case 'operations':
              return <Operations key={item} inZone isDraggable />
            case 'numbers':
              return <Numbers key={item} inZone isDraggable />
            case 'equals':
              return <Equals key={item} inZone isDraggable />
            default:
              return null
          }
        })}
      </div>
    )
  }
  return (
    <div
      className={cn(styles.dragField, {
        [styles.isDragged]: isFieldHovered,
      })}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      <img src={imgIcon} alt="Icon" className={styles.icon} />
      <p className={styles.text}>Перетащите сюда</p>
      <p className={styles.textSmall}>любой элемент из левой панели</p>
    </div>
  )
}

export default DragField
