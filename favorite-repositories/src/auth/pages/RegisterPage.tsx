import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { SiginUpData } from '../models';
import { useMemo } from 'react';

export const RegisterPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { handleSubmit, register, formState: { errors }, trigger } = useForm<SiginUpData>();

    const { status, errorMessage } = useSelector((state: RootState) => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const onSubmit: SubmitHandler<SiginUpData> = (data: SiginUpData) => {
        dispatch(startCreatingUserWithEmailPassword(data));
    };

    const validateField = async (fieldName: keyof SiginUpData) => {
        await trigger(fieldName);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardContent>
                    <h2 className="text-center mb-4">Sigin Up!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Username"
                            fullWidth
                            {...register('displayName', { required: 'This field is required' })}
                            error={!!errors.displayName}
                            margin="normal"
                            onBlur={() => validateField('displayName')}
                            helperText={errors.displayName?.message}
                        />

                        <TextField
                            label="Correo electrónico"
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

                        />

                        <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuthentication}>
                            Sign up
                        </Button>

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
        </div>
    );
}
