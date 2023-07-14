import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemo } from "react";
import { Card, CardContent, TextField, Button, Snackbar, Alert, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { startLoginWithEmailPassword } from '../../store/auth';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

interface LoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { status, errorMessage } = useSelector((state: RootState) => state.auth);

    // Custom Hook for control forms
    const { handleSubmit, register, formState: { errors }, trigger } = useForm<LoginForm>();

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        dispatch(startLoginWithEmailPassword(data))
    };

    const validateField = async (fieldName: keyof LoginForm) => {
        await trigger(fieldName);
    };

    return (

        <AuthLayout>
            <Card>
                <CardContent>
                    <Typography variant="h4" sx={{ paddingBottom: '1rem', textAlign: 'center' }} >
                        Hello! Welcome back
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Email"
                            fullWidth
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            margin="normal"
                            onBlur={() => validateField('email')}
                            color='secondary'
                        />

                        <TextField
                            label="Password"
                            fullWidth
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            margin="normal"
                            onBlur={() => validateField('password')}
                            color='secondary'
                        />

                        <Button sx={{ marginTop: '1.5rem' }} type="submit" variant="contained" size='large' fullWidth disabled={isAuthenticating}>
                            Login
                        </Button>

                        <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>Don't have an account yet? <Link to='/auth/register' className='border-b'>Sign Up!</Link></Typography>

                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={!!errorMessage ? true : false}
                            autoHideDuration={6000}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Snackbar>
                    </form>
                </CardContent>
            </Card>
        </AuthLayout>

    );
}
