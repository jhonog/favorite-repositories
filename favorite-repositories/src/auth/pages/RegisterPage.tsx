import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Snackbar, Alert, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { SiginUpData } from '../models';
import { useMemo } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { Link } from 'react-router-dom';
import { setTemporalDisplayName } from '../../store/favoriteRepos';
import { useVerifyRepository } from '../../hooks/useVerifyRepository';

export const RegisterPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { verifyRepository, isValid } = useVerifyRepository();

    // Custom Hook for control forms
    const { handleSubmit, register, formState: { errors }, trigger, getValues } = useForm<SiginUpData>();

    const { status, errorMessage } = useSelector((state: RootState) => state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const onSubmit: SubmitHandler<SiginUpData> = (data: SiginUpData) => {
        verifyRepository(data.displayName);

        if (isValid) {
            dispatch(setTemporalDisplayName(data.displayName))
            dispatch(startCreatingUserWithEmailPassword(data));
        }
    };

    const validateField = async (fieldName: keyof SiginUpData) => {
        await trigger(fieldName);
    };

    // Verifies the github username
    const onValidateUserName = () => {
        validateField('displayName');
        verifyRepository(getValues('displayName'));
    }

    return (
        <AuthLayout>
            <Card>
                <CardContent>
                    <Typography variant="h4" sx={{ paddingBottom: '1rem', textAlign: 'center' }} >
                        Sign up!
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Username"
                            fullWidth
                            {...register('displayName', { required: 'This field is required' })}
                            error={!!errors.displayName}
                            margin="normal"
                            onBlur={() => onValidateUserName()}
                            helperText={errors.displayName?.message}
                            color='secondary'
                        />

                        <TextField
                            label="Email"
                            fullWidth
                            {...register('email', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            error={!!errors.email}
                            margin="normal"
                            onBlur={() => validateField('email')}
                            helperText={errors.email?.message}
                            color='secondary'
                        />

                        <TextField
                            label="Password"
                            fullWidth
                            type="password"
                            {...register('password', {
                                required: 'This field is required',
                                minLength: {
                                    value: 8,
                                    message: 'The password must be at least 8 characters long',
                                },
                            })}
                            error={!!errors.password}
                            margin="normal"
                            onBlur={() => validateField('password')}
                            helperText={errors.password?.message}
                            color='secondary'

                        />

                        <Button sx={{ marginTop: '1.5rem' }} type="submit" variant="contained" size='large' fullWidth disabled={isCheckingAuthentication}>
                            Sign up
                        </Button>

                        <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>Alredy have an account? <Link to='/auth/login' className='border-b'>Login!</Link></Typography>

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
