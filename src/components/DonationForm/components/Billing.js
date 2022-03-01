import React, { useState } from 'react'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js'

import StripeInput from './StripeInput'

const Billing = () => {
  // const [message, setMessage] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={12}>
        <PaymentElement id="payment-element" />
      </Grid> */}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {/* <Typography
          variant={'subtitle2'}
          sx={{ marginBottom: 2 }}
          fontWeight={700}
        >
          Enter your card number
        </Typography> */}
        {/* <TextField
          label="Card number *"
          variant="outlined"
          name={'cardNumber'}
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder="xxxx-xxxx-xxxx-xxxx"
        /> */}
        <TextField
          label='Credit Card Number'
          name='cardNumber'
          variant='outlined'
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement
            }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        {/* <Typography
          variant={'subtitle2'}
          sx={{ marginBottom: 2 }}
          fontWeight={700}
        >
          Name on the card
        </Typography> */}
        <TextField
          label='Name *'
          variant='outlined'
          name={'name'}
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder='Your Name'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* <Typography
          variant={'subtitle2'}
          sx={{ marginBottom: 2 }}
          fontWeight={700}
        >
          Expiration date
        </Typography> */}
        {/* <TextField
          label="Expiration date *"
          variant="outlined"
          name={'date'}
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder="mm/yy"
        /> */}
        <TextField
          label='Expiration Date'
          name='ccexp'
          variant='outlined'
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardExpiryElement
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* <Typography
          variant={'subtitle2'}
          sx={{ marginBottom: 2 }}
          fontWeight={700}
        >
          Billing zip code
        </Typography> */}
        <TextField
          label='Zip code *'
          variant='outlined'
          name={'zip'}
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder='Your Zip Code'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* <Typography
          variant={'subtitle2'}
          sx={{ marginBottom: 2 }}
          fontWeight={700}
        >
          CVV
        </Typography> */}
        {/* <TextField
          label="Card CVV *"
          variant="outlined"
          name={'cvv'}
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder="CVV"
        /> */}
        <TextField
          label='CVC'
          name='cvc'
          variant='outlined'
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardCvcElement
            }
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Billing
