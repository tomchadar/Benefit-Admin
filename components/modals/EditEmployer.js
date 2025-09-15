import React, { useEffect } from 'react';
import {
    Typography,
    Box,
    Grid,
    FormControl,
    InputLabel,
    TextField,
    OutlinedInput,
    Button,
    Input,
    Select,
    MenuItem,
    Stack,
    FormHelperText,
    Autocomplete,
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import AuthService from '../../ApiService/AuthService';
import { errorNotify, successNotify } from '../notifications/notify';
import UserService from '../../ApiService/UserService';

export default function AddEmployer(props) {
    const { user } = React.useContext(AuthContext);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [companyId, setCompanyId] = React.useState('');
    const [companyLabel, setCompanyLabel] = React.useState(null);
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [CompanyError, setCompanyError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    const { mutateAsync: updateEmployer, isLoading } = useMutation(
        UserService.updateEmployer,
        {
            onSuccess: async ({ data }) => {
                if (data?.errors?.status === 400) {
                    errorNotify(
                        'Employer with this email address already exists.'
                    );
                } else {
                    await props.employersRefetch();
                    successNotify('Employer successfully updated!');
                    props.setEmployerModal(false);
                }
            },
        }
    );

    const { data: getUser } = useQuery(
        'getEmployerById',
        () => EmployeeService.getEmployerById(props.userId),
        {
            enabled: !!props.userId,
        }
    );

    React.useEffect(() => {
        if (getUser) {
            setFirstName(getUser?.firstName);
            setLastName(getUser?.lastName);
            setEmail(getUser?.email);
            setCompanyId(getUser?.companyId);
        }
    }, [getUser]);

    const { data: companies } = useQuery(
        'getCompanies',
        EmployeeService.getCompanies
    );

    useEffect(() => {
        if (companies && getUser) {
            const currentCompany = companies.find(
                (el) => el._id === getUser.companyId
            );
            if (!currentCompany) setCompanyLabel('');
            setCompanyLabel({
                label: currentCompany.companyName,
                id: currentCompany._id,
            });
        }
    }, [companies, getUser]);

    function handleChangeFirstName(event) {
        if (event.target.value.length > 0) {
            setFirstNameError(false);
        }
        setFirstName(event.target.value);
    }

    function handleChangeLastName(event) {
        if (event.target.value.length > 0) {
            setLastNameError(false);
        }
        setLastName(event.target.value);
    }

    function handleChangeEmail(event) {
        if (event.target.value.length > 0) {
            setEmail(false);
        }
        setEmail(event.target.value);
    }

    async function handleSave(event) {
        console.log('In handleSave');

        // validate fields
        if (!firstName) {
            setFirstNameError(true);
            alert('Please enter a valid first name.');
            return;
        } else if (!lastName) {
            setLastNameError(true);
            alert('Please enter a valid last name.');
            return;
        } else if (!companyId) {
            setCompanyError(true);
            alert('Please select a department.');
            return;
        } else if (!email) {
            setEmailError(true);
            alert('Please enter a valid email.');
            return;
        }

        console.log({
            firstName,
            lastName,
            email,
            companyId: companyId,
            password: 'password',
        });

        await updateEmployer({
            id: props.userId,
            firstName,
            lastName,
            email,
            companyId: companyId,
        });
    }

    const handleChangeCompany = (value) => {
        setCompanyError(false);
        setCompanyId(value);
        if (!value) setCompanyLabel({ label: ' ', id: undefined });
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="firstname">
                                First Name
                            </InputLabel>
                            <OutlinedInput
                                id="firstname"
                                value={firstName}
                                error={firstNameError}
                                onChange={handleChangeFirstName}
                                label="First Name"
                            />
                            {!!firstNameError && (
                                <FormHelperText error id="firstname-error">
                                    Please enter a valid first name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="lastname">
                                Last Name
                            </InputLabel>
                            <OutlinedInput
                                id="lastname"
                                value={lastName}
                                error={lastNameError}
                                onChange={handleChangeLastName}
                                label="First Name"
                            />
                            {!!lastNameError && (
                                <FormHelperText error id="lastname-error">
                                    Please enter a valid last name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                value={email}
                                error={emailError}
                                onChange={handleChangeEmail}
                                label="Email"
                                type="email"
                            />
                            {!!lastNameError && (
                                <FormHelperText error id="lastname-error">
                                    Please enter a valid email.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    {companyLabel && (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    disablePortal
                                    id="company"
                                    onChange={(event, newValue) => {
                                        handleChangeCompany(newValue?.id || '');
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === companyId
                                    }
                                    value={companyLabel}
                                    options={
                                        companies
                                            ? companies.map((el) => {
                                                  return {
                                                      label: el.companyName,
                                                      id: el._id,
                                                  };
                                              })
                                            : []
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Company"
                                        />
                                    )}
                                />
                                {!!CompanyError && (
                                    <FormHelperText error id="dept-error">
                                        Please select a company
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    )}
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <Stack direction="row" justifyContent="end">
                            <Button
                                onClick={props.handleCloseEmployee}
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
