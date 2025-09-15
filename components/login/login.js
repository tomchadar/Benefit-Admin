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
import { errorNotify } from '../notifications/notify';
import { useMutation } from 'react-query';
import AuthService from '../../ApiService/AuthService';
import { AuthContext } from '../../context/AuthContext';
import { drawerFontColorActive, primary } from '../../constants/colors';
import ActivateUser from './ActivateUser';
import ConfirmAuth from './ConfirmAuth';
import FileUpload from '../../ApiService/UploadCSVService';

const LoginComponent = ({ changeLoginPage }) => {
    const { setUser, saveToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNotActivated, setIsNotActivated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isConfirmAuth, setIsConfirmAuth] = useState(false);
    const [isConfirmCode, setIsConfirmCode] = useState(false);
    const [tempUser, setTempUser] = useState();
    const [tempToken, setTempToken] = useState();

    const { mutateAsync, isLoading } = useMutation(AuthService.login, {
        onSuccess: async (data) => {
            if (data?.errors?.status === 400) {
                console.log('AUTH ERROR');
                errorNotify('Incorrect email or password');
                return;
            }
            if (data?.user) {
                console.log(data?.user);
                if (data?.user?.isActivated) {
                    // 2FA
                    if (data?.user?.confirmAuthStatus) {
                        // setUser(data.user);
                        // saveToken(data.accessToken);

                        setTempUser(data.user);
                        setTempToken(data.accessToken);

                    } else {
                        setIsNotActivated(false);
                        setIsConfirmAuth(true);
                        setUserId(data.user.id);
                        console.log('NEXT ACTIONS');
                    }
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
            if (!password.length > 0 || !email.length > 0) {
                errorNotify('All fields must be filled');
            } else {
                handleNext();
            }
        }
    };

    const handleNext = async () => {
        await mutateAsync({ email, password });
    };

    return !isNotActivated ? (
        <>
            {isConfirmAuth ? (
                <>
                {
                    isConfirmCode ? 
                    <FileUpload  user={tempUser} token={tempToken}/>
                    : <ConfirmAuth
                        activate={mutateAsync}
                        email={email}
                        password={password}
                        cancel={setIsConfirmAuth}
                        userId={userId}
                        setIsConfirmCode={setIsConfirmCode}
                    />
                }
                </>
            ) : (
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
                                    Please sign in to continue
                                </Typography>
                            </div>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    onKeyDown={keyPress}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                style={{
                                    marginTop: 20,
                                    cursor:
                                        isLoading || !email || !password
                                            ? 'initial'
                                            : 'pointer',
                                    background:
                                        isLoading || !email || !password
                                            ? 'rgb(213, 87, 96)'
                                            : primary,
                                    color: '#fff',
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
                            
                        </Sheet>
                    </CssVarsProvider>
                    {/* <CssVarsProvider>
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
                            <FileUpload />
                        </Sheet>
                    </CssVarsProvider> */}
                </Box>
            )}
        </>
    ) : (
        <ActivateUser
            activate={mutateAsync}
            email={email}
            password={password}
            cancel={setIsNotActivated}
            userId={userId}
        />
    );
};

export default LoginComponent;
