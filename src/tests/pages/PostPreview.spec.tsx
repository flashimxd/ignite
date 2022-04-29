import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'
import { useRouter } from 'next/router';

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

const post = { 
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '29 de abril de 2022'
}

describe('Preview page test suite', () => {
  it('Should render correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    const { getByText } = render(<Post post={post} />)

    expect(getByText('My New Post')).toBeInTheDocument()
    expect(getByText('Post content')).toBeInTheDocument()
    expect(getByText('Wanna keep reading?')).toBeInTheDocument()
  })

  it('Should redirect to complete post when authenticated', () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const mockedPush = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription'},
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: mockedPush
    } as any)

    const { getByText } = render(<Post post={post} />)

    expect(mockedPush).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('should should load initial date', async() => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ]
        },
        last_publication_date: '04-29-2022'
      })
    } as any)

    const response = await getStaticProps({ params: { slug: 'my-new-post' }})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '29 de abril de 2022'
          }
        }
      })
    )
  })
})