interface CanvasItems {
  startPosition: number[]
  setStartPosition: any
  tempPosition: number[]
  setTempPosition: any
  drawnRect: DrawnRect[]
  setDrawnRect: any
}

interface DrawnRect {
  x: number
  y: number
  width: number
  height: number
  label: string
}