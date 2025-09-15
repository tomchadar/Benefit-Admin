import React, { useEffect } from 'react';
import {
    Typography,
    Box,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    TextField,
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
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [lastNameError, setLastNameError] = React.useState(false);
    const [CompanyError, setCompanyError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    const { mutateAsync: createEmployer, isLoading } = useMutation(
        UserService.registration,
        {
            onSuccess: async ({ data }) => {
                if (data?.errors?.status === 400) {
                    errorNotify(
                        'Employer with this email address already exists.'
                    );
                } else {
                    await props.employersRefetch();
                    successNotify('Employer successfully created!');
                    props.setEmployerModal(false);
                }
            },
        }
    );

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
            password: 'password',
        });

        await createEmployer({
            firstName,
            lastName,
            email,
            password: 'password',
        });
    }

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
