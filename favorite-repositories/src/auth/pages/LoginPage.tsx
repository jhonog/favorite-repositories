import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemo } from "react";
import { Card, CardContent, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';


interface LoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { status, errorMessage } = useSelector((state: RootState) => state.auth);

    const { handleSubmit, register, formState: { errors }, trigger } = useForm<LoginForm>();

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        dispatch(startLoginWithEmailPassword(data))
    };

    const validateField = async (fieldName: keyof LoginForm) => {
        await trigger(fieldName);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardContent>
                    <h2 className="text-center mb-4">Login</h2>
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
                        />

                        <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>
                            Sign In
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
