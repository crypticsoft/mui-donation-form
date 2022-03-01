import React, { useState, Fragment } from 'react'
import { Field } from 'react-final-form'
import { TextField } from 'mui-rff'

import { Grid, Button, ButtonGroup, FormGroup, FormLabel, FormControl } from '@mui/material'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, Elements } from '@stripe/react-stripe-js'

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

const validate = values => {
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
}

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

const WizardForm = props => {
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [clientSecret, setClientSecret] = useState(null);
  // const [stepValues, setStepValues] = useState(null);
  const stripe = useStripe()
  // const elements = useElements();
  /*
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log('paymentIntent', paymentIntent);
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);
*/

  /*  useEffect(() => {
    console.log('fetch secret');
    async () => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        payment_method_types: ['card'],
      });
      console.log(paymentIntent);
      setClientSecret(paymentIntent?.client_secret);
      setOptions({ clientSecret: paymentIntent?.client_secret });
    };
  }, []);
*/
  return (
    <Wizard
      initialValues={{
        // amount: '50',
        // donationAmount: '$50',
        donationType: 'Single',
        processingFees: true
      }}
      onSubmit={onSubmit}
    >
      {Steps &&
        Steps.map((step, index) => (
          <Wizard.Page
            key={index}
            // validate={(values) => {
            //   // setStepValues(values);
            //   stepValues = values;
            //   validate(values);
            // }}
          >
            <Grid container alignItems='flex-start' spacing={2}>
              {renderGridItem(step)}
            </Grid>
          </Wizard.Page>
        ))}
    </Wizard>
  )
}

export default DonationForm
