import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton component', () => {
  it('should render the Sign in button', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    const { getByText } = render(
      <SignInButton />
    )

    expect(getByText('Sign in with GitHub')).toBeInTheDocument()
  })

  it('should render the authenticated user', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      { 
        user: { 
          name: 'Galo doido',
          email: 'galo.doido@example.com'
        },
        expires: 'test-expires'
      },
      false
   ])
   
    const { getByText } = render(
      <SignInButton />
    )

    expect(getByText('Galo doido')).toBeInTheDocument()
  })
})