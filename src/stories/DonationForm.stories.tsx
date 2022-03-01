import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import DonationForm from '../components/DonationForm/index'

export default {
  title: 'Example/Donation Form',
  component: DonationForm
} as ComponentMeta<typeof DonationForm>

const Template: ComponentStory<typeof DonationForm> = args => <DonationForm {...args} />

export const Demo = Template.bind({})
