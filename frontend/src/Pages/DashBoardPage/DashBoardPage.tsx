import React from 'react'

interface Props {
    message: string;
}

const DashBoardPage = (props: Props) => {
  return (
    <div>DashBoardPage: {props.message}</div>
  )
}

export default DashBoardPage