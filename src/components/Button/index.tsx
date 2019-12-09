import React, { FC, MouseEvent, FormEvent, SyntheticEvent, useState, ChangeEvent } from "react"
import PropTypes from "prop-types"

type ButtonProps = {
  title?: string
}

const Button: FC<ButtonProps> = ({ title }) => {

  const [text, setText] = useState<string>('')

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target: any = e.currentTarget.tagName
  }

  //const handleInput = (e: FormEvent<HTMLInputElement>) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    console.log(e.currentTarget.value)
    setText(e.target.value)
  }

  const a = 'aa'
  return (
    <>
      <button onClick={handleClick}>
        mi boton {title}
      </button>

      <input type="text" onInput={handleInput} value={text} />
    </>
  )
}

Button.propTypes = {
  title: PropTypes.string,
}

Button.defaultProps = {
  title: ''
}

export default Button
