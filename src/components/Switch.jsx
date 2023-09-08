import React from 'react'
import Switch from '@mui/material/Switch'
import styled from 'styled-components'

export const ToggleSwitch = ({ checked, onChange }) => {

  const handleClick = () => {
    if (onChange) {
      onChange(!checked)
    }
  }

  return (
    <StyledSwitch checked={checked} onClick={handleClick} />
  )
}

const StyledSwitch = styled(Switch).attrs(() => ({
  classes: {
    root: "root",
    switchBase: "switchBase",
    thumb: "thumb",
    track: "track",
    checked: "checked",
    focusVisible: "focusVisible"
  },
  disableRipple: true,
  focusVisibleClassName: "focusVisible"
}))`
  &.root {
    width: 42px;
    height: 22px;
    padding: 0;
    margin: 8px;
  }

  .switchBase {
    padding: 2px;

    &.checked {
      transform: translateX(16px);
      color: white;
      padding-left: 5px;
      & + .track {
        background-color: #52d869;
        opacity: 1;
        border: none;
      }
    }

    &.focusVisible &.thumb {
      color: #52d869;
      border: 6x sold #fff;
    }
  }

  .thumb {
    width: 20px;
    height: 20px;
  }

  & .track {
    border-radius: 13px;
    border: 1px solid #bdbdbd;
    background-color: red;
    opacity: 1;
    transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
      border 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .checked {
  }
  .focusVisible {
  }
`
