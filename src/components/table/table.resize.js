import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resize = $(event.target)
  const $parent = $resize.closest('[data-type="resizable"]')
  const cords = $parent.getCoords()
  const type = $resize.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resize.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - cords.right
      value = cords.width + delta
      $resize.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - cords.bottom
      value = cords.height + delta
      $resize.css({
        bottom: -delta + 'px',
      })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    $parent.css({width: value + 'px'})

    if (type == 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`).
          forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    $resize.css({
      opacity: 0,
      right: 0,
      bottom: '0px',
    })
  }
}
