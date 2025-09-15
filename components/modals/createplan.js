import * as React from 'react';
import {
    Box,
    Grid,
    Typography,
    FormControl,
    Input,
    Button,
    TextField,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Stack,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
    FormHelperText,
    FormGroup,
} from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import EmployeeCard from '../cards/employeecard';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as Pages from '../../constants/pages';
import VestingChart from '../charts/vestingchart';
import HelpIcon from '@mui/icons-material/Help';
import useMediaQuery from '@mui/material/useMediaQuery';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import moment from 'moment';
import { errorNotify } from '../notifications/notify';

const steps = ['Create Plan', 'Plan Summary', 'Send To Employee'];

const imgUrl =
    'https://static0.thethingsimages.com/wordpress/wp-content/uploads/2021/09/the-office-steve-carell.jpg';

export default function CreatePlan(props) {
    const { user, setSavePlan, setIsCreatePlan } = useContext(AuthContext);
    const currentDate = new Date();
    // const date1 = new Date(
    //   currentDate.getFullYear(),
    //   currentDate.getMonth() + 1,
    //   1,
    // )
    // const date2 = new Date(
    //   date1.getFullYear() + 2,
    //   date1.getMonth(),
    //   date1.getDay(),
    // )
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [startDateISO, setStartDateISO] = React.useState('');
    const [endDateISO, setEndDateISO] = React.useState('');
    const [amount, setAmount] = React.useState();
    const [vestingOptions, setVestingOptions] = React.useState(12);
    const [vestingFreq, setVestingFreq] = React.useState(1);
    const [chartData, setChartData] = React.useState([]);
    const [typeOfPlan, setTypeOfPlan] = React.useState('SB');
    const [vestCliff, setVestCliff] = React.useState(0);
    const [amountError, setAmountError] = React.useState(false);
    const [vestingPeriodError, setVestingPeriodError] = React.useState(false);
    const [vestingFreqError, setVestingFreqError] = React.useState(false);
    const [typeOfPlanError, setTypeOfPlanError] = React.useState(false);
    const [bonusPlan, setBonusPlan] = React.useState({});
    const [newPlan, setNewPlan] = React.useState(true);

    const highRes = useMediaQuery('(min-width:1800px)');
    const mediumRes = useMediaQuery('(min-width:1200px)');
    const colWidth = highRes ? 400 : 300;

    const { data: planData } = useQuery(
        ['getPlanById', props.employee[0]._id],
        EmployeeService.getBonusPlanById
    );

    function calcEndDate(months) {
        let years = -1;
        if (months === 12) years = 1;
        if (months === 24) years = 2;
        if (months === 36) years = 3;

        const date1 = new Date(startDate);

        if (years > 0) {
            setEndDate(
                new Date(
                    date1.getFullYear() + years,
                    date1.getMonth(),
                    date1.getDate()
                )
            );
        }
    }

    function calcData(amt, vest, cliff) {
        const vestingData = [];
        const newDate = (amount, key) => {
            return moment(startDate).add(amount, key).format('L');
        };

        // add year 0
        vestingData.push({
            name: '0',
            vested: 0,
            nonvested: amt,
        });

        if (cliff == '30') {
            console.log('VESTCLIFF: ', 30);
            vestingData.push({
                name: 'Cliff ' + newDate(1, 'months'),
                cliff: 0,
                vested: 0,
                nonvested: amt,
            });
        } else if (cliff == '90') {
            console.log('VESTCLIFF: ', 90);
            vestingData.push({
                name: 'Cliff ' + newDate(3, 'months'),
                cliff: 0,
                vested: 0,
                nonvested: amt,
            });
        } else if (cliff == '180') {
            console.log('VESTCLIFF: ', 180);
            vestingData.push({
                name: 'Cliff ' + newDate(6, 'months'),
                cliff: 0,
                vested: 0,
                nonvested: amt,
            });
        } else if (cliff == '365') {
            console.log('VESTCLIFF: ', 365);
            vestingData.push({
                name: 'Cliff ' + newDate(1, 'years'),
                cliff: 0,
                vested: 0,
                nonvested: amt,
            });
        } else {
            // vestingCliffDesc = 'Custom Vesting Cliff';
        }

        if (vest == 12) {
            // add year 1
            vestingData.push({
                name: newDate(1, 'years'),
                vested: amt,
                nonvested: 0,
            });
        }

        if (vest == 24) {
            // add year 1
            vestingData.push({
                name: newDate(1, 'years'),
                vested: amt / 2,
                nonvested: amt / 2,
            });
            // add year 2
            vestingData.push({
                name: newDate(2, 'years'),
                vested: amt,
                nonvested: 0,
            });
        }

        if (vest == 36) {
            // add year 1
            vestingData.push({
                name: newDate(1, 'years'),
                vested: amt * 0.333,
                nonvested: amt * 0.667,
            });
            // add year 2
            vestingData.push({
                name: newDate(2, 'years'),
                vested: amt * 0.667,
                nonvested: amt * 0.333,
            });
            // add year 3
            vestingData.push({
                name: newDate(3, 'years'),
                vested: amt,
                nonvested: 0,
            });
        }

        setChartData(vestingData);
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
        if (isNaN(event.target.value)) {
            setAmountError(true);
        } else {
            setAmountError(false);
            calcData(event.target.value, vestingOptions, vestCliff);
        }
    };

    const handleStartDateChange = (newValue) => {
        let value = newValue;
        const substractHalfYear = moment().subtract(6, 'months');
        const addHalfYear = moment().add(6, 'months');
        if (newValue > addHalfYear) {
            value = addHalfYear._d;
            errorNotify("You can't pick date more than 6 months ahead.");
        }
        if (newValue < substractHalfYear) {
            value = substractHalfYear._d;
            errorNotify("You can't pick date more than 6 months ahead.");
        }
        let year = value.getFullYear();
        let month = value.getMonth();
        let day = value.getDate();
        let years = -1;
        if (vestingOptions === 12) years = 1;
        if (vestingOptions === 24) years = 2;
        if (vestingOptions === 36) years = 3;
        const endDate = new Date(year + years, month, day);
        setEndDate(endDate);
        setEndDateISO(endDate.toISOString().substring(0, 10));
        setStartDate(value);
        setStartDateISO(value.toISOString().substring(0, 10));
    };

    const handleEndDateChange = (newValue) => {
        console.log('handleEndDateChange fired');
        setEndDate(newValue);
        setEndDateISO(newValue.toISOString().substring(0, 10));
    };

    const handleChangeVestingOptions = (event) => {
        setVestingOptions(event.target.value);
        setVestingPeriodError(false);
        calcEndDate(event.target.value);
        calcData(amount, event.target.value, vestCliff);
    };

    const handleChangeVestingFreq = (event) => {
        setVestingFreq(event.target.value);
        setVestingFreqError(false);
        calcData(amount, vestingOptions, vestCliff);
    };

    const handleChangeTypePlan = (event) => {
        setTypeOfPlan(event.target.value);
        setTypeOfPlanError(false);
    };

    const handleChangeVestingCliff = (event) => {
        setVestCliff(event.target.value);
        calcData(amount, vestingOptions, event.target.value);
    };

    const handleNext = async (event) => {
        if (!amount || amountError || amount <= 0) {
            alert('Please enter an amount for the Goal Bonus');
            setAmountError(true);
            return;
        }
        if (!vestingOptions || vestingOptions < 12) {
            alert('Please enter an value for Vesting Period');
            setVestingPeriodError(true);
            return;
        }
        if (!vestingFreq || vestingFreq < 1) {
            alert('Please enter an value for Vesting Frequency');
            setVestingFreqError(true);
            return;
        }
        if (!typeOfPlan) {
            alert('Please choose a type of plan');
            setTypeOfPlanError(true);
            return;
        }

        // check that dates and vesting period match
        console.log('CHECKING DATES');
        let invalidFlag = false;
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        if (date1.getDate() != date2.getDate()) {
            invalidFlag = true;
            console.log('day match failed');
        }
        if (date1.getMonth() != date2.getMonth()) {
            invalidFlag = true;
            console.log('month match failed');
        }
        if (
            vestingOptions === 12 &&
            date2.getFullYear() - date1.getFullYear() != 1
        )
            invalidFlag = true;
        if (
            vestingOptions === 24 &&
            date2.getFullYear() - date1.getFullYear() != 2
        )
            invalidFlag = true;
        if (
            vestingOptions === 36 &&
            date2.getFullYear() - date1.getFullYear() != 3
        )
            invalidFlag = true;
        if (invalidFlag) {
            alert(
                'Employee start date and end date must match the vesting period.'
            );
            return;
        }

        console.log('DATES PASSED');

        // save data
        if (newPlan) {
            setSavePlan({
                amount,
                startDate: startDate,
                endDate: endDate,
                vestingPeriod: vestingOptions,
                vestingFreq: vestingFreq,
                vestingCliff: vestCliff,
                planType: typeOfPlan,
                employeeId: props.employee[0].id,
                employerId: props.employee[0]?.employer?.id,
            });
        } else {
            console.log('UPDATING EXISTING BONUS');

            setSavePlan({
                id: planData._id,
                amount,
                startDate: startDate,
                endDate: endDate,
                vestingPeriod: vestingOptions,
                vestingFreq: vestingFreq,
                vestingCliff: vestCliff,
                planType: typeOfPlan,
                employeeId: props.employee[0].id,
                employerId: props.employee[0]?.employer?.id,
            });
        }

        const planObj = {};
        planObj.amount = amount;
        planObj.startDate = new Date(startDate);
        planObj.endDate = new Date(endDate);
        planObj.vestingFreq = vestingFreq;
        planObj.vestingOptions = vestingOptions;
        let vestingFreqDesc, vestingOptionsDesc, vestingCliffDesc;
        if (vestingFreq === 1) {
            vestingFreqDesc = 'Annual';
        } else if (vestingFreq === 4) {
            vestingFreqDesc = 'Quarterly';
        } else {
            vestingFreqDesc = 'Monthly';
        }
        planObj.vestingFreqDesc = vestingFreqDesc;
        if (vestingOptions === 12) {
            vestingOptionsDesc = '12 Months';
        } else if (vestingOptions === 24) {
            vestingOptionsDesc = '24 Months';
        } else if (vestingOptions === 36) {
            vestingOptionsDesc = '36 Months';
        } else {
            vestingOptionsDesc = 'Custom';
        }
        // vesting cliff
        if (vestCliff == '0') {
            vestingCliffDesc = 'No Cliff';
        } else if (vestCliff == '30') {
            vestingCliffDesc = '1 Month Vesting Cliff';
        } else if (vestCliff == '90') {
            vestingCliffDesc = '3 Month Vesting Cliff';
        } else if (vestCliff == '180') {
            vestingCliffDesc = '6 Month Vesting Cliff';
        } else if (vestCliff == '365') {
            vestingCliffDesc = '1 Year Vesting Cliff';
        } else {
            vestingCliffDesc = 'Custom Vesting Cliff';
        }

        planObj.vestingOptionsDesc = vestingOptionsDesc;
        planObj.vestingCliffDesc = vestingCliffDesc;
        props.setPlan(planObj);

        props.setCurrentPage(Pages.CREATEPLAN_PAGE_2);
    };

    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        async function getEmployeeBonus() {
            if (planData) {
                setBonusPlan(planData);
                setNewPlan(false);
                setIsCreatePlan(false);
                // populate values
                const empBonus = planData;
                setAmount(empBonus.amount);
                setStartDate(empBonus.startDate);
                setEndDate(empBonus.enddate);
                setStartDateISO(
                    new Date(empBonus.startDate).toISOString().substring(0, 10)
                );
                setEndDateISO(
                    new Date(empBonus.endDate).toISOString().substring(0, 10)
                );
                setVestingFreq(empBonus.vestingFreq);
                setVestingOptions(empBonus.vestingPeriod);
                setTypeOfPlan(empBonus.planType);
                setVestCliff(empBonus.vestingCliff);

                calcData(
                    empBonus.amount,
                    empBonus.vestingPeriod,
                    empBonus.vestingCliff
                );
            } else {
                console.log('No employee bonus found');
                setNewPlan(true);
                setIsCreatePlan(true);
            }
        }

        getEmployeeBonus();
    }, [props.employee, planData]);

    return (
        <>
            <Typography
                variant="h4"
                component="h6"
                style={{ paddingBottom: 20 }}
            >
                Bonus Plan for {props.employee[0].firstName}{' '}
                {props.employee[0].lastName}
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Stepper
                    activeStep={0}
                    alternativeLabel
                    style={{ paddingBottom: 30 }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <EmployeeCard employee={props.employee[0]} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <FormControl>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginRight: 10,
                                        }}
                                    >
                                        <InputLabel htmlFor="vesting-amount">
                                            Goal Bonus
                                        </InputLabel>
                                        <OutlinedInput
                                            id="vesting-amount"
                                            value={amount}
                                            onChange={handleChangeAmount}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            }
                                            label="Goal Bonus"
                                            sx={{ width: colWidth }}
                                            required={true}
                                            error={amountError}
                                        />
                                        {!!amountError && (
                                            <FormHelperText
                                                error
                                                id="accountId-error"Input
                                            >
                                                Please enter an amount.
                                            </FormHelperText>
                                        )}

                                        <FormControl
                                            sx={{ marginTop: 4 }}
                                            fullWidth
                                        >
                                            <InputLabel id="type-plan-label">
                                                Type of plan
                                            </InputLabel>
                                            <Select
                                                labelId="type-plan-label"
                                                id="type-plan"
                                                sx={{ width: colWidth }}
                                                value={typeOfPlan}
                                                label="Type of plan"
                                                onChange={handleChangeTypePlan}
                                            >
                                                <MenuItem value="SB">
                                                    Signing Bonus
                                                </MenuItem>
                                                <MenuItem value="RB">
                                                    Retention Bonus
                                                </MenuItem>
                                                <MenuItem value="CA">
                                                    Cash Advance
                                                </MenuItem>
                                                <MenuItem value="EA">
                                                    Education Advance
                                                </MenuItem>
                                                <MenuItem value="ML">
                                                    Maternity Leave Top Up
                                                </MenuItem>
                                            </Select>
                                            {!!typeOfPlanError && (
                                                <FormHelperText
                                                    error
                                                    id="vesting-freq-error"
                                                >
                                                    Please choose a type of
                                                    plan.
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                        <FormControl sx={{ marginTop: 4 }}>
                                            <FormGroup>
                                                <InputLabel id="vest-cliff-label">
                                                    Vesting Cliff
                                                </InputLabel>
                                                <Select
                                                    labelId="vest-cliff-label"
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <Tooltip
                                                                disableFocusListener
                                                                title="Sometimes you might not want the employee to be able to 'forgive' funds right away - but rather, may want to start forgiving after a certain period of time. Example: Your company has a 3-month probationary period for new employees. To protect against the employee leaving right away, you might consider providing a vesting cliff after 3 full months of continuous employment. This means none of the loan will be forgiven in the first three months, but at 3 months plus a day, the first 3 months will be forgiven in a batch (hence, the 'cliff'). "
                                                            >
                                                                <IconButton aria-label="helpIcon">
                                                                    <HelpIcon
                                                                        color="primary"
                                                                        sx={{
                                                                            fontSize: 24,
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </InputAdornment>
                                                    }
                                                    id="vest-cliff"
                                                    value={vestCliff}
                                                    label="Vesting Cliff"
                                                    sx={{ width: colWidth }}
                                                    onChange={
                                                        handleChangeVestingCliff
                                                    }
                                                >
                                                    <MenuItem value={0}>
                                                        No cliff
                                                    </MenuItem>
                                                    <MenuItem value={30}>
                                                        1 Month
                                                    </MenuItem>
                                                    <MenuItem value={90}>
                                                        3 Months
                                                    </MenuItem>
                                                    <MenuItem value={180}>
                                                        6 Months
                                                    </MenuItem>
                                                    <MenuItem value={365}>
                                                        12 Months
                                                    </MenuItem>
                                                    {/* <MenuItem value="-1">Custom</MenuItem> */}
                                                </Select>
                                                {/* <Tooltip
                    disableFocusListener
                    title="Sometimes you might not want the employee to be able to 'forgive' funds right away - but rather, may want to start forgiving after a certain period of time. Example: Your company has a 3-month probationary period for new employees. To protect against the employee leaving right away, you might consider providing a vesting cliff after 3 full months of continuous employment. This means none of the loan will be forgiven in the first three months, but at 3 months plus a day, the first 3 months will be forgiven in a batch (hence, the 'cliff'). "
                  >
                    <IconButton aria-label="helpIcon">
                      <HelpIcon color="primary" sx={{ fontSize: 28 }} />
                    </IconButton>
                  </Tooltip> */}
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormControl
                                            sx={{ marginBottom: 4 }}
                                            fullWidth
                                        >
                                            <InputLabel id="vesting-options-label">
                                                Vesting Period
                                            </InputLabel>
                                            <Select
                                                labelId="vesting-options-label"
                                                id="vesting-options"
                                                sx={{ width: colWidth }}
                                                value={vestingOptions}
                                                label="Vesting Period"
                                                onChange={
                                                    handleChangeVestingOptions
                                                }
                                            >
                                                <MenuItem value={12}>
                                                    12 Months
                                                </MenuItem>
                                                <MenuItem value={24}>
                                                    24 Months
                                                </MenuItem>
                                                <MenuItem value={36}>
                                                    36 Months
                                                </MenuItem>
                                                {/* <MenuItem value={0}>Custom</MenuItem> */}
                                            </Select>
                                            {!!vestingPeriodError && (
                                                <FormHelperText
                                                    error
                                                    id="accountId-error"
                                                >
                                                    Please enter an valid
                                                    Vesting Period.
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <DesktopDatePicker
                                                variant="standard"
                                                label="Start Date"
                                                inputFormat="MM/dd/yyyy"
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        sx={{
                                                            width:
                                                                colWidth / 2 -
                                                                5,
                                                        }}
                                                        style={{
                                                            marginRight: 10,
                                                        }}
                                                    />
                                                )}
                                            />
                                            <DesktopDatePicker
                                                variant="standard"
                                                label="End Date"
                                                inputFormat="MM/dd/yyyy"
                                                disabled={true}
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        sx={{
                                                            width:
                                                                colWidth / 2 -
                                                                5,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>

                                        <FormControl
                                            sx={{ marginTop: 4 }}
                                            fullWidth
                                        >
                                            <InputLabel id="vesting-freq-label">
                                                Vesting Frequency
                                            </InputLabel>
                                            <Select
                                                labelId="vesting-freq-label"
                                                id="vesting-freq"
                                                sx={{ width: colWidth }}
                                                value={vestingFreq}
                                                label="Vesting Frequency"
                                                onChange={
                                                    handleChangeVestingFreq
                                                }
                                            >
                                                <MenuItem value={1}>
                                                    Annual
                                                </MenuItem>
                                                <MenuItem value={4}>
                                                    Quarterly
                                                </MenuItem>
                                                <MenuItem value={12}>
                                                    Monthly
                                                </MenuItem>
                                            </Select>
                                            {!!vestingFreqError && (
                                                <FormHelperText
                                                    error
                                                    id="vesting-freq-error"
                                                >
                                                    Please enter an valid
                                                    Vesting Frequency.
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
                                </div>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid sx={{ height: 450 }} item xs={6}>
                        <VestingChart chartData={chartData} />
                    </Grid>
                </Grid>

                <Button
                    variant="outlined"
                    style={{
                        marginRight: 10,
                        borderColor: grayText,
                        color: drawerBackground,
                    }}
                    onClick={() => {
                        props.setCurrentPage(Pages.EMPLOYEE_PAGE);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{ background: primary }}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
