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
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import { successNotify } from '../notifications/notify';

export default function EditCompany(props) {
    const { user } = React.useContext(AuthContext);
    const [companyName, setCompanyName] = React.useState('');
    const [addressCompany, setAddressCompany] = React.useState('');
    const [cityCompany, setCityCompany] = React.useState('');
    const [countryCompany, setCountryCompany] = React.useState('');
    const [zipCodeCompany, setZipCodeCompany] = React.useState('');
    const [companyNameError, setCompanyNameError] = React.useState(false);
    const [addressCompanyError, setAddressCompanyError] = React.useState(false);
    const [cityCompanyError, setCityCompanyError] = React.useState(false);
    const [countryCompanyError, setCountryCompanyError] = React.useState(false);
    const [zipCodeCompanyError, setZipCodeCompanyError] = React.useState(false);

    const { mutateAsync: updateCompany, isLoading } = useMutation(
        EmployeeService.editCompany,
        {
            onSuccess: async ({ data }) => {
                await props.employeesRefetch();
                successNotify('Company successfully updated!');
                props.setCompanyModal(false);
            },
        }
    );

    const { data: getCompany } = useQuery(
        'getCompanyById',
        () => EmployeeService.getCompanyById(props.companyId),
        {
            enabled: !!props.companyId,
        }
    );

    React.useEffect(() => {
        if (getCompany) {
            setCompanyName(getCompany?.companyName);
            setAddressCompany(getCompany?.companyAddress);
            setCityCompany(getCompany?.companyCity);
            setCountryCompany(getCompany?.companyCountry);
            setZipCodeCompany(getCompany?.zipCode);
        }
    }, [getCompany]);

    function handleChangeCompanyName(event) {
        if (event.target.value.length > 0) {
            setCompanyNameError(false);
        }
        setCompanyName(event.target.value);
    }

    function handleChangeAddress(event) {
        if (event.target.value.length > 0) {
            setAddressCompanyError(false);
        }
        setAddressCompany(event.target.value);
    }

    function handleChangeCity(event) {
        if (event.target.value.length > 0) {
            setCityCompanyError(false);
        }
        setCityCompany(event.target.value);
    }

    function handleChangeCountry(event) {
        if (event.target.value.length > 0) {
            setCountryCompanyError(false);
        }
        setCountryCompany(event.target.value);
    }

    function handleChangeZipCode(event) {
        if (event.target.value.length > 0) {
            setZipCodeCompanyError(false);
        }
        setZipCodeCompany(event.target.value);
    }

    async function handleSave(event) {
        console.log('In handleSave');

        // validate fields
        if (!companyName) {
            setCompanyNameError(true);
            alert('Please enter a valid company name.');
            return;
        } else if (!addressCompany) {
            setAddressCompanyError(true);
            alert('Please enter a valid address.');
            return;
        } else if (!cityCompany) {
            setCityCompanyError(true);
            alert('Please enter a valid city.');
            return;
        } else if (!countryCompany) {
            setCountryCompanyError(true);
            alert('Please enter a valid country.');
            return;
        } else if (!zipCodeCompany) {
            setZipCodeCompanyError(true);
            alert('Please enter a valid zip code.');
            return;
        }

        console.log({
            companyName,
            addressCompany,
            companyCountry: countryCompany,
            companyCity: cityCompany,
            zipCode: zipCodeCompany,
        });

        await updateCompany({
            ...getCompany,
            id: props.companyId,
            companyName,
            companyAddress: addressCompany,
            companyCountry: countryCompany,
            companyCity: cityCompany,
            zipCode: zipCodeCompany,
        });
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="firstname">
                                Company Name
                            </InputLabel>
                            <OutlinedInput
                                id="companyName"
                                value={companyName}
                                error={companyNameError}
                                onChange={handleChangeCompanyName}
                                label="Company Name"
                            />
                            {!!companyNameError && (
                                <FormHelperText error id="company-error">
                                    Please enter a valid company name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="countryAddress">
                                Country
                            </InputLabel>
                            <OutlinedInput
                                id="countryAddress"
                                value={countryCompany}
                                error={countryCompanyError}
                                onChange={handleChangeCountry}
                                label="Country"
                            />
                            {!!countryCompanyError && (
                                <FormHelperText error id="country-error">
                                    Please enter a valid company country.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="companyCity">City</InputLabel>
                            <OutlinedInput
                                id="companyCity"
                                value={cityCompany}
                                error={cityCompanyError}
                                onChange={handleChangeCity}
                                label="City"
                            />
                            {!!cityCompanyError && (
                                <FormHelperText error id="city-error">
                                    Please enter a valid city name.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="companyAddress">
                                Address
                            </InputLabel>
                            <OutlinedInput
                                id="companyAddress"
                                value={addressCompany}
                                error={addressCompanyError}
                                onChange={handleChangeAddress}
                                label="Address"
                            />
                            {!!addressCompanyError && (
                                <FormHelperText error id="address-error">
                                    Please enter a valid company address.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="zipCode">Zip Code</InputLabel>
                            <OutlinedInput
                                id="zipCode"
                                value={zipCodeCompany}
                                error={zipCodeCompanyError}
                                onChange={handleChangeZipCode}
                                label="Zip Code"
                            />
                            {!!zipCodeCompanyError && (
                                <FormHelperText error id="zip-code-error">
                                    Please enter a valid zipCode.
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
