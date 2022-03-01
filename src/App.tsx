import { FC } from 'react'
import { Link, Slider, styled } from '@mui/material'

import DonationForm from '@/components/DonationForm/index'
import Header from '@/header'

const App: FC = () => {
  return (
    <Root>
      <Header />
      <div>
        <DonationForm />
      </div>
    </Root>
  )
}

const Root = styled('div')`
  padding: 1% 2% 10vh 2%;
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    text-decoration: none;
    color: ${({ theme: { palette } }) => palette.primary.main};
  }
`

export default App
