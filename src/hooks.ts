import { useRef, useEffect, useState, CSSProperties } from "react"
import interact from "interactjs"

type Partial<T> = {
  [P in keyof T]?: T[P]
}

const initPosition = {
  x: 0,
  y: 0
}

/**
 * HTML要素を動かせるようにする
 * 返り値で所得できるrefと、styleをそれぞれ対象となるHTML要素の
 * refとstyleに指定することで、そのHTML要素のリサイズと移動が可能になる
 * @param position HTML要素の初期座標と大きさ、指定されない場合はinitPositionで指定された値になる
 */
export function useInteractJS(position: Partial<typeof initPosition> = initPosition) {
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position
  })
  const [isEnabled, setEnable] = useState(true)

  const interactRef = useRef(null)
  let { x, y } = _position
  const enable = () => {
    interact((interactRef.current as unknown) as HTMLElement)
      .draggable({
        inertia: false
      })
      .on("dragmove", (event) => {
        x += event.dx
        y += event.dy
        setPosition({
          x,
          y
        })
      })
  }

  const disable = () => {
    interact((interactRef.current as unknown) as HTMLElement).unset()
  }

  useEffect(() => {
    if (isEnabled) {
      enable()
    } else {
      disable()
    }
  }, [isEnabled])

  useEffect(() => {
    return disable
  }, [])

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: "100px",
      height: "100px",
      position: "absolute" as CSSProperties["position"]
    },
    width: 100,
    height: 100,
    position: _position,
    isEnabled,
    enable: () => setEnable(true),
    disable: () => setEnable(false)
  }
}
