export enum EnumDirection {
  FULL = 'FULL',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT_TOP = 'LEFT_TOP',
  RIGHT_TOP = 'RIGHT_TOP',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM'
}

export const spanCss = (duration: EnumDirection) => {
  let css
  switch (duration) {
    case EnumDirection.LEFT:
      css = 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2  w-1.5 h-4 cursor-ew-resize'
      break
    case EnumDirection.RIGHT:
      css = 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-4 cursor-ew-resize'
      break
    case EnumDirection.TOP:
      css = 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-4 cursor-ns-resize'
      break
    case EnumDirection.BOTTOM:
      css = 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1.5 w-4 cursor-ns-resize'
      break
    case EnumDirection.LEFT_TOP:
      css =
        'top-0 left-0 border-t-[3px] border-l-[3px] border-cyan-400 size-3 bg-transparent cursor-nw-resize'
      break
    case EnumDirection.RIGHT_TOP:
      css =
        'top-0 right-0 cursor-ne-resize border-t-[3px] border-r-[3px] border-cyan-400 size-3 bg-transparent'
      break
    case EnumDirection.LEFT_BOTTOM:
      css =
        'bottom-0 left-0 border-l-[3px] border-b-[3px] border-cyan-400 size-3 cursor-sw-resize bg-transparent'
      break
    case EnumDirection.RIGHT_BOTTOM:
      css =
        'bottom-0 right-0 border-r-[3px] border-b-[3px] border-cyan-400 size-3 cursor-se-resize bg-transparent'
      break
    default:
      break
  }
  return css
}
