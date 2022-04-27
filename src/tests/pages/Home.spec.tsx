import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { stripe } from '../../services/stripe'
import Home, { getStaticProps } from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripe')

describe('Home page test suite', () => {
  it('Should render correctly', () => {
    const { getByText } = render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }}/>)

    expect(getByText('for R$10,00 month')).toBeInTheDocument()
  })

  it('should load the initial data', async() => {
    const retriveStripePricesMocked = mocked(stripe.prices.retrieve)

    retriveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-stripe-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-stripe-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})