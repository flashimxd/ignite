import { render } from '@testing-library/react'
import { debug } from 'console'
import { mocked } from 'ts-jest/utils'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

// // jest.mock('../../services/prismic')
// jest.mock("../../services/prismic", () => {
//   return {
//     client: {
//       getAllByType: jest.fn(),
//     },
//   };
// });


const posts = [
  { slug: 'my-new-post', title: 'My New Post', excerpt: 'Post experpt', updatedAt: '27 April'}
]

describe('Home page test suite', () => {
  it('Should render correctly', () => {
    const { getByText } = render(<Posts posts={posts} />)

    expect(getByText('My New Post')).toBeInTheDocument()
  })

  //  TODO: new version of prismic changes it's return shape, FIX IT.
  // it('should load the initial data', async() => {
  //   const getPrismicClientMocked = mocked(getPrismicClient)

  //   getPrismicClientMocked.mockReturnValueOnce({
  //     query: jest.fn().mockResolvedValueOnce({
  //       results: [
  //         {
  //           uid: 'my-new-post',
  //           data: {
  //             title: [
  //               { type: 'heading', text: 'My new post' }
  //             ],
  //             content: [
  //               { type: 'paragraph', text: 'Post excerpt' }
  //             ]
  //           },
  //           last_publication_date: '04-27-2022'
  //         }
  //       ]
  //     })
  //   } as any)

  //   const response = await getStaticProps({ previewData: undefined })

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       props: {
  //         data: {
  //           slug: 'my-new-post',
  //           title: 'My new post',
  //           excerpt: 'Post excerpt',
  //           updatedAt: '27 de abril de 2022'
  //         }
  //       }
  //     })
  //   )

  // })
})