import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { FormControl, FormLabel } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/joy/Link';
import { errorNotify, successNotify } from '../notifications/notify';
import { useMutation } from 'react-query';
import AuthService from '../../ApiService/AuthService';
import { drawerFontColorActive, primary } from '../../constants/colors';

const ConfirmAuth = ({ activate, password, email, cancel, userId, setIsConfirmCode }) => {
    const [code, setCode] = useState('');

    const { mutateAsync, isLoading } = useMutation(
        AuthService.confirmAuthCode,
        {
            onSuccess: async (data) => {
                if (data?.errors?.status === 400) {
                    errorNotify('Incorrect code');
                    return;
                }
                successNotify('Login successful!');
                setIsConfirmCode(true);
                activate({ password, email });
            },
            onError: async () => {
                errorNotify('Incorrect code');
            },
        }
    );

    const { mutateAsync: resendCode } = useMutation(
        AuthService.resendConfirmAuthCode,
        {
            onSuccess: async (data) => {
                if (data?.errors?.status === 400) {
                    errorNotify('Something went wrong');
                    return;
                }
                successNotify(`Code has been sent to ${email}`);
            },
        }
    );

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            if (!code.length > 0) {
                errorNotify('Code field must be filled');
            } else {
                handleNext();
            }
        }
    };

    const handleNext = async () => {
        await mutateAsync({ code, userId });
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: '#fff',
                p: 3,
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CssVarsProvider>
                <Sheet
                    sx={{
                        width: 400,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & botom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        borderRadius: 15,
                        boxShadow: 'md',
                        border: `1px solid ${drawerFontColorActive}`,
                    }}
                >
                    <div>
                        <Typography
                            level="h4"
                            component="h1"
                            textAlign="center"
                        >
                            <b>Welcome to Benefit Admin</b>
                        </Typography>
                        <Typography level="body2" textAlign="center">
                            Code has been sent to {email}
                        </Typography>
                    </div>
                    <FormControl>
                        <FormLabel>Code</FormLabel>
                        <Input
                            // html input attribute
                            name="code"
                            type="number"
                            placeholder="1234"
                            onChange={(e) => setCode(e.target.value)}
                            onKeyDown={keyPress}
                        />
                    </FormControl>
                    <Typography
                        level="body2"
                        textAlign="left"
                        onClick={() => resendCode({ userId })}
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        Resend code
                    </Typography>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            style={{
                                marginRight: '20%',
                                cursor: 'pointer',
                                background: 'rgb(213, 87, 96)',
                                color: '#fff',
                                width: '40%',
                            }}
                            onClick={() => cancel(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                cursor:
                                    isLoading || !code ? 'initial' : 'pointer',
                                background:
                                    isLoading || !code
                                        ? 'rgb(213, 87, 96)'
                                        : primary,
                                color: '#fff',
                                width: '40%',
                            }}
                            onClick={handleNext}
                            disabled={isLoading || !email || !password}
                        >
                            Log in
                            {isLoading && (
                                <CircularProgress
                                    size={20}
                                    sx={{ marginLeft: 2 }}
                                />
                            )}
                        </Button>
                    </Box>
                </Sheet>
            </CssVarsProvider>
        </Box>
    );
};

export default ConfirmAuth;
