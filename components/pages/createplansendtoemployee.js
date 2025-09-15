import Typography from '@mui/material/Typography'
import { Stepper, Step, StepLabel } from '@mui/material'

const steps = ['Create Plan', 'Plan Summary', 'Send To Employee']

export default function CreatePlanSendToEmployee(props) {
  return (
    <>
      <Typography variant="h4" component="h6" style={{ paddingBottom: 20 }}>
        Vesting Plan - Employee Notification
      </Typography>

      <Stepper activeStep={2} alternativeLabel style={{ paddingBottom: 30 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h6" component="h6" style={{ paddingBottom: 20 }}>
        Benefit will notify{' '}
        {props.employee[0].firstName + ' ' + props.employee[0].lastName} of the
        vesting plan.
      </Typography>
      <Typography variant="h6" component="h6" style={{ paddingBottom: 20 }}>
        We&apos;ll send you a confirmation once this has been done.
      </Typography>
    </>
  )
}
