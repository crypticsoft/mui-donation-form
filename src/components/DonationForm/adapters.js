import { Button, ButtonGroup, FormGroup, FormLabel, FormControl } from '@mui/material'

import UnstyledSwitch from './components/UnstyledSwitch'

const SwitchAdapter = ({ input, meta, label, ...rest }) => (
  <UnstyledSwitch {...input} {...label} {...rest} checked={!!input.value} inputProps={{ role: 'switch' }} />
)

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

// toggle switch
// const SwitchAdapter = ({
//   input: { onChange, value },
//   meta,
//   label,
//   ...rest
// }) => (
//   <UnstyledSwitch
//     {...label}
//     {...rest}
//     checked={!!value}
//     inputProps={{ role: 'switch' }}
//     onChange={(event, value) => onChange(value)}
//   />
// );

export default {
  SwitchAdapter,
  ButtonFieldAdapter,
  ButtonGroupAdapter
}

// module.exports.ButtonGroupAdapter = ButtonGroupAdapter;
// module.exports.ButtonFieldAdapter = ButtonFieldAdapter;
