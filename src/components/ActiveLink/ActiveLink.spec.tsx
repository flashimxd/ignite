import { render } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink Component', () => {
  it('should render the link correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toBeInTheDocument()
  })

  it('should append the active class to the link', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toHaveClass('active')
  })
})