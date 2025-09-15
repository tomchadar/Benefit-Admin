import React, { useEffect, useState, useContext } from 'react';
import {
    Typography,
    Box,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    TextField,
    Input,
    Select,
    MenuItem,
    Stack,
    FormHelperText,
    Autocomplete,
} from '@mui/material';

import { drawerBackground, grayText, primary } from '../../constants/colors';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import { errorNotify, successNotify } from '../notifications/notify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function CreateTransaction(props) {
    const { user } = useContext(AuthContext);
    const [bankName, setBankName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [currency, setCurrency] = useState('');
    const [externalId, setExternalId] = useState('');
    const [paymentSystem, setPaymentSystem] = useState('');
    const [employeeId, setEmployeeId] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [amount, setAmount] = useState('');
    const [bankNameError, setBankNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [paymentSystemError, setPaymentSystemError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [employeeIdError, setEmployeeIdError] = useState(false);

    const { mutateAsync: createTransaction, isLoading } = useMutation(
        EmployeeService.createTransaction,
        {
            onSuccess: async ({ data }) => {
                if (data?.errors?.status !== 400) {
                    await props.transactionRefetch();
                    successNotify('Transaction successfully created!');
                    props.setTransactionModal(false);
                } else {
                    errorNotify('Something went wrong');
                }
            },
        }
    );

    const { data: employee, refetch: employeeRefetch } = useQuery(
        'getEmployee',
        EmployeeService.getAllEmployees
    );

    useEffect(() => {
        if (employee) console.log(employee);
    }, [employee]);

    function handleChangeBankName(event) {
        if (event.target.value.length > 0) {
            setBankNameError(false);
        }
        setBankName(event.target.value);
    }

    function handleChangePaymentSystem(event) {
        if (event.target.value.length > 0) {
            setPaymentSystemError(false);
        }
        setPaymentSystem(event.target.value);
    }

    function handleChangeExternalId(event) {
        setExternalId(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function handleChangeAmount(event) {
        if (event.target.value.length > 0) {
            setAmountError(false);
        }
        setAmount(event.target.value);
    }

    function handleChangeDate(newValue) {
        setDate(newValue);
    }

    function handleChangeCurrency(event) {
        setCurrency(event.target.value);
    }

    async function handleSave(event) {
        console.log('In handleSave');

        // validate fields
        if (!bankName) {
            setBankNameError(true);
            alert('Please enter a valid bank name.');
            return;
        } else if (!date) {
            setDateError(true);
            alert('Please enter a date.');
            return;
        } else if (!amount) {
            setAmountError(true);
            alert('Please enter a valid amount.');
            return;
        } else if (!paymentSystem) {
            setPaymentSystemError(true);
            alert('Please enter a valid payment system name.');
            return;
        } else if (!employeeId) {
            setEmployeeIdError(true);
            alert('Please enter a valid employee.');
            return;
        }

        console.log({
            bankName,
            description,
            employerId: selectedEmployee?.employerId,
            employeeId: selectedEmployee?._id,
            companyId: selectedEmployee?.companyId,
            signedBonusId: selectedEmployee?.signedBonus?._id,
            date,
            currency,
            externalId,
            paymentSystem,
            amount: Number(amount),
            bonusAmount: Number(selectedEmployee?.bonus?.amount),
        });

        await createTransaction({
            bankName,
            description,
            employerId: selectedEmployee?.employerId,
            employeeId: selectedEmployee?._id,
            companyId: selectedEmployee?.companyId,
            signedBonusId: selectedEmployee?.signedBonus?._id,
            date,
            currency,
            externalId,
            paymentSystem,
            amount: Number(amount),
            bonusAmount: Number(selectedEmployee?.bonus?.amount),
            bonusId: selectedEmployee?.bonus?._id,
        });
    }

    const handleChangeEmployee = (value) => {
        setEmployeeIdError(false);
        setEmployeeId(value);
        setSelectedEmployee(employee.find((el) => el._id === value));
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="firstname">
                                Bank Name
                            </InputLabel>
                            <OutlinedInput
                                id="bankName"
                                value={bankName}
                                error={bankNameError}
                                onChange={handleChangeBankName}
                                label="Bank Name"
                            />
                            {!!bankNameError && (
                                <FormHelperText error id="bank-error">
                                    Please enter a valid bank name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="amount">Amount</InputLabel>
                            <OutlinedInput
                                type="number"
                                id="amount"
                                value={amount}
                                error={amountError}
                                onChange={handleChangeAmount}
                                label="Amount"
                            />
                            {!!amountError && (
                                <FormHelperText error id="amount-error">
                                    Please enter a valid amount.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="description">
                                Description
                            </InputLabel>
                            <OutlinedInput
                                id="description"
                                value={description}
                                onChange={handleChangeDescription}
                                label="Description"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                variant="standard"
                                label="Date"
                                inputFormat="MM/dd/yyyy"
                                value={date}
                                onChange={handleChangeDate}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <FormControl fullWidth>*/}
                    {/*        <InputLabel htmlFor="companyCity">Currency</InputLabel>*/}
                    {/*        <OutlinedInput*/}
                    {/*            id="companyCity"*/}
                    {/*            value={currency}*/}
                    {/*            error={dateError}*/}
                    {/*            onChange={handleChangeExternalId}*/}
                    {/*            label="Currency"*/}
                    {/*        />*/}
                    {/*        {!!dateError && (*/}
                    {/*            <FormHelperText error id="city-error">*/}
                    {/*                Please enter a valid currency.*/}
                    {/*            </FormHelperText>*/}
                    {/*        )}*/}
                    {/*    </FormControl>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="externalId">
                                External Id
                            </InputLabel>
                            <OutlinedInput
                                id="externalId"
                                value={externalId}
                                onChange={handleChangeExternalId}
                                label="External Id"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="paymentSystem">
                                Payment System
                            </InputLabel>
                            <OutlinedInput
                                id="paymentSystem"
                                value={paymentSystem}
                                error={paymentSystemError}
                                onChange={handleChangePaymentSystem}
                                label="Payment System"
                            />
                            {!!paymentSystemError && (
                                <FormHelperText error id="payment-system-error">
                                    Please enter a valid payment system.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                id="employee"
                                onChange={(event, newValue) => {
                                    handleChangeEmployee(newValue?.id || '');
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === employeeId
                                }
                                options={
                                    employee
                                        ? employee
                                              .filter((el) => el.signedBonus)
                                              .map((el) => {
                                                  return {
                                                      label: `${el.firstName} ${
                                                          el.lastName
                                                      } - ${
                                                          el.company
                                                              .companyName || ''
                                                      }`,
                                                      id: el._id,
                                                  };
                                              })
                                        : []
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Employee" />
                                )}
                            />
                            {!!employeeIdError && (
                                <FormHelperText error id="dept-error">
                                    Please select an employee
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <Stack direction="row" justifyContent="end">
                            <Button
                                onClick={props.handleCloseTransaction}
                                variant="outlined"
                                style={{
                                    marginTop: 20,
                                    marginRight: 10,
                                    borderColor: grayText,
                                    color: drawerBackground,
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                style={{ marginTop: 20, background: primary }}
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
