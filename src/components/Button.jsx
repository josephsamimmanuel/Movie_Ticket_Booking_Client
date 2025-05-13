import React from 'react'

function Button({title, onClick, variant, disabled, fullWidth, type}) {
let className = 'bg-primary text-white p-1 rounded-md'
if(fullWidth){
    className += ' w-full'
}
if(variant === 'outlined'){
    className = className.replace('bg-primary', 'border border-primary text-primary bg-white')
}
    return (
      <button className={className} onClick={onClick} disabled={disabled} type={type}>
        {title}
      </button>
  )
}

export default Button
