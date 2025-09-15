import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { CssVarsProvider } from '@mui/joy/styles';
import { FormControl, FormLabel } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/joy/Link';
import { useMutation } from 'react-query';
import AuthService from '../../ApiService/AuthService';
import { AuthContext } from '../../context/AuthContext';
import { drawerFontColorActive, primary } from '../../constants/colors';
import ActivateUser from './ActivateUser';
import { errorNotify, successNotify } from '../notifications/notify';

const RegComponent = ({ changeLoginPage }) => {
    const { setUser, saveToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [isNotActivated, setIsNotActivated] = useState(false);
    const [userId, setUserId] = useState(null);
    // create 2FA

    const { mutateAsync, isLoading } = useMutation(AuthService.registration, {
        onSuccess: async ({ data }) => {
            setUserId(data?.user?.id);
            successNotify('User has been created!');
            setIsNotActivated(!isNotActivated);
        },
    });

    const { mutateAsync: login } = useMutation(AuthService.login, {
        onSuccess: async (data) => {
            if (data?.errors?.status === 400) {
                console.log('AUTH ERROR');
                errorNotify('Incorrect email or password');
                return;
            }
            if (data?.user) {
                console.log(data.user);
                if (data.user.isActivated) {
                    setUser(data.user);
                    saveToken(data.accessToken);
                } else {
                    errorNotify('User not activated');
                    // send email here
                    setUserId(data.user.id);
                    setIsNotActivated(true);
                }
            }
        },
    });

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            if (!firstName || !lastName || !email || !password) {
                errorNotify('All fields must be filled');
            } else {
                handleNext();
            }
        }
    };

    const handleNext = async () => {
        if (!firstName || !lastName || !email || !password) {
            setError('All fields must be filled!');
            return;
        }
        await mutateAsync({
            email,
            password,
            firstName,
            lastName,
            roles: ['employer'],
        });
    };

    const redirectToLoginPage = () => {
        changeLoginPage(true);
    };

    return !isNotActivated ? (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'rgb(20, 1, 0)',
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
                        gap: 2,
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
                            Please sign up to continue
                        </Typography>
                    </div>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            // html input attribute
                            name="firstName"
                            type="text"
                            placeholder="Jimmie"
                            onChange={(e) => setFirstName(e.target.value)}
                            onKeyDown={keyPress}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name="lastName"
                            type="test"
                            placeholder="Hopkins"
                            onChange={(e) => setLastName(e.target.value)}
                            onKeyDown={keyPress}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            // html input attribute
                            name="email"
                            type="email"
                            placeholder="johndoe@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={keyPress}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={keyPress}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        style={{
                            marginTop: 20,
                            cursor:
                                isLoading ||
                                !firstName ||
                                !lastName ||
                                !email ||
                                !password
                                    ? 'initial'
                                    : 'pointer',
                            background:
                                isLoading ||
                                !firstName ||
                                !lastName ||
                                !email ||
                                !password
                                    ? 'rgb(213, 87, 96)'
                                    : primary,
                            color: '#fff',
                        }}
                        onClick={handleNext}
                        disabled={
                            isLoading ||
                            !firstName ||
                            !lastName ||
                            !email ||
                            !password
                        }
                    >
                        Sign up
                        {isLoading && (
                            <CircularProgress
                                size={20}
                                sx={{ marginLeft: 2 }}
                            />
                        )}
                    </Button>
                    {error && (
                        <Typography
                            fontSize="sm"
                            sx={{ alignSelf: 'center', color: 'red' }}
                        >
                            {error}
                        </Typography>
                    )}
                    <Typography
                        endDecorator={
                            <Link
                                sx={{
                                    color: 'rgb(255, 99, 94)',
                                    textDecoration: 'none',
                                }}
                                onClick={() => changeLoginPage(true)}
                            >
                                Sign in
                            </Link>
                        }
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Do you have an account?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </Box>
    ) : (
        <ActivateUser
            activate={login}
            email={email}
            password={password}
            cancel={redirectToLoginPage}
            userId={userId}
        />
    );
};

export default RegComponent;
