import { useFormState } from 'react-final-form'
import { Switches } from 'mui-rff'
import { Grid } from '@mui/material'

const roundPrice = x => (Math.round(x * 100) / 100).toFixed(2)

const Summary = () => {
  const formState = useFormState()
  const PROCESSING_FEE_RATE = 2.9
  const PROCESSING_FEE_BASE = PROCESSING_FEE_RATE / 100 // (p = 2.9%/100 = 0.029)
  const PROCESSING_FEE_CHARGE = 0.3 // flat-charge fee

  // donation amount + processing fee(s)
  const amount = Number(formState.values?.donationAmount.replace('$', ''))
  const donation_fee = PROCESSING_FEE_BASE * amount
  const total_processing = donation_fee + PROCESSING_FEE_CHARGE // 2.9% + 0.3

  return (
    <section className='donation-summary'>
      <h3>Your Donation</h3>
      <dl className='flex flex-row justify-between pb-1'>
        <dt className='text-secondary text-sm font-medium'>Donation Total</dt>
        <dd className='text-primary text-sm font-semibold'>{formState.values?.donationAmount}</dd>
      </dl>
      <dl className='flex flex-row justify-between pb-1'>
        <dt className='text-secondary text-sm font-medium'>Processing Fees</dt>
        <dd className='text-primary text-sm font-semibold'>${roundPrice(total_processing)}</dd>
      </dl>
      <hr />
      <dl className='flex flex-row justify-between pb-1'>
        <dt className='text-secondary text-sm font-medium'>You Pay</dt>
        <dd className='text-primary text-sm font-semibold'>
          {formState.values?.processingFees ? roundPrice(amount + total_processing) : formState.values?.donationAmount}
        </dd>
      </dl>
      <dl className='flex flex-row justify-between pb-1'>
        <dt className='text-secondary text-sm font-medium'>They Receive</dt>
        <dd className='text-primary text-sm font-semibold'>
          {formState.values?.processingFees
            ? roundPrice(amount + total_processing)
            : roundPrice(amount - total_processing)}
        </dd>
      </dl>
      <Grid item xs={12}>
        <Switches
          // label="Cover Processing Fees"
          name='processingFees'
          required={false}
          data={{ label: 'Cover Processing Fee', value: true }}
        />
      </Grid>
    </section>
  )
}

export default Summary
