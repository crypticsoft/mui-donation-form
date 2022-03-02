import React, { Fragment } from 'react'
import { Field } from 'react-final-form'
import { TextField } from 'mui-rff'

import { Grid, Button, ButtonGroup, FormGroup, FormLabel, FormControl } from '@mui/material'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import './form.css'

import Billing from './components/Billing'
import Summary from './components/Summary'
// import CheckoutForm from './components/CheckoutForm.jsx';

import Wizard from './Wizard'

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto'
    }
  ]
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_t8wuVqGO5EPXM6FbORdCJtBxzjBrY')

const ButtonGroupAdapter = ({ input, meta, ...rest }) => (
  <FormGroup>
    <FormControl>
      <FormLabel
        id='demo-buttons-group-label'
        sx={{
          marginBottom: '10px',
          fontWeight: 'bold'
        }}
      >
        {input.label || rest.label}
      </FormLabel>
      <FormGroup
        aria-labelledby='donation-amount-buttons-group-label'
        name='buttons-group'
        row={true} // go horizontal (not by default)
        {...input}
        {...rest}
        // horizontal space gap
        sx={{
          gap: '10px'
        }}
      >
        {rest?.options &&
          rest.options.map((item, key) => (
            <Button
              onClick={(event, value) => input.onChange(item)}
              variant={input.value === item || rest.defaultValue === item ? 'contained' : 'outlined'}
              key={`button-${key}`}
            >
              {item}
            </Button>
          ))}
      </FormGroup>
    </FormControl>
  </FormGroup>
)

const ButtonFieldAdapter = ({ input, meta, ...rest }) => (
  <ButtonGroup
    variant='outlined'
    aria-label='outlined button group'
    {...input}
    {...rest}
    // onChange={(event, value) => input.onChange(value)}
    // errorText={meta.touched ? meta.error : ''}
  >
    {rest?.options &&
      rest.options.map((item, key) => (
        <Button
          key={key}
          onClick={(event, value) => input.onChange(item)}
          variant={input.value === item ? 'contained' : 'outlined'}
        >
          {item}
        </Button>
      ))}
  </ButtonGroup>
)

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

/*const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.donationAmount) {
    errors.donationAmount = 'Required'
  }
  return errors
}*/

const Steps = [
  [
    {
      size: 12,
      field: (
        <Field
          name='donationAmount'
          label='Select a Donation Amount'
          component={ButtonGroupAdapter}
          // defaultValue="$50" // set a default option value
          options={['$50', '$100', '$500', '$1000', '$2000', '$5000']}
          // labelPosition="right"
        />
      )
    },
    {
      size: 12,
      field: (
        <TextField
          label='Amount $(USD)'
          name='donationAmount'
          margin='none'
          placeholder='$100'
          // helperText="Optional for entering a donation amount"
          required={true}
        />
      )
    },
    {
      size: 12,
      field: (
        <Field
          name='donationType'
          label='Donation Type'
          component={ButtonFieldAdapter}
          options={['Single', 'Monthly', 'Annual']}
          // labelPosition="right"
        />
      )
    }
  ],
  [
    {
      size: 12,
      field: <Summary />
    }
  ],
  [
    {
      size: 12,
      field: <Billing />
    }
  ]
]

// render fieldset : ( Grid item > Field )
const renderGridItem = fields =>
  fields.map((item, idx) => (
    <Fragment key={`field-${idx}`}>
      {item.relationships?.map((related, index) => (
        <Fragment key={`rel-${index}`}>{related}</Fragment>
      ))}
      <Grid item xs={item.size} key={idx}>
        {item.field}
      </Grid>
    </Fragment>
  ))

const DonationForm = props => (
  <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
    <WizardForm {...props} />
  </Elements>
)

const WizardForm = props => (
  <Wizard
    initialValues={{
      donationType: 'Single',
      processingFees: true
    }}
    onSubmit={onSubmit}
  >
    {Steps &&
      Steps.map((step, index) => (
        <Wizard.Page key={index}>
          <Grid container alignItems='flex-start' spacing={2}>
            {renderGridItem(step)}
          </Grid>
        </Wizard.Page>
      ))}
  </Wizard>
)

export default DonationForm
