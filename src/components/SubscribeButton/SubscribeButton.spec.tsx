import { render, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { SubscribeButton } from '.'
import { useRouter } from 'next/router'

jest.mock('next-auth/client')
jest.mock('next/router')

describe('SubscribeButton component', () => {
  it('should render the SubscribeButton', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(
      <SubscribeButton />
    )

    expect(getByText('Subscribe now')).toBeInTheDocument()
  })

  it('should redirect to the sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    const signedInMocked = mocked(signIn)
    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(
      <SubscribeButton />
    )
    
    const subscribeButton = getByText('Subscribe now')
    fireEvent.click(subscribeButton)
    expect(signedInMocked).toHaveBeenCalled()
  })

  it('should redirect to the posts when authenticated', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { 
        user: { 
          name: 'Galo doido',
          email: 'galo.doido@example.com'
        },
        activeSubscription: 'fake-active-sub',
        expires: 'test-expires'
      },
      false
   ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    const { getByText } = render(
      <SubscribeButton />
    )
    
    const subscribeButton = getByText('Subscribe now')
    fireEvent.click(subscribeButton)
    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})