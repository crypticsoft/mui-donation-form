import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

// @ts-ignore
import DonationForm from '../components/DonationForm'

export default {
  title: 'Example/Donation Form',
  component: DonationForm
} as ComponentMeta<typeof DonationForm>

const Template: ComponentStory<typeof DonationForm> = args => <DonationForm {...args} />

export const Demo = Template.bind({})
