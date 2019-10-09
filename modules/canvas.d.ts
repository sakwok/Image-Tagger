interface CanvasItems {
  startPosition: number[]
  setStartPosition: any
  tempPosition: number[]
  setTempPosition: any
  drawnRect: DrawnRect[]
  setDrawnRect: any
  undoQ: any
  setUndoQ: any
  redoQ: any
  setRedoQ: any
}

interface DrawnRect {
  x: number
  y: number
  width: number
  height: number
  label: string
}

interface ImageBoundaries {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}