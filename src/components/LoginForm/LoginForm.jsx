import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/authService';
import { setError, setUser } from '../../redux/slices/authSlice';
import { loginSchema } from '../../utils/validationSchemas';
import styles from './LoginForm.module.css';

export default function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      onClose();
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.subtitle}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an excellent teacher.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input
            id="login-email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.passwordWrapper}>
            <input
              id="login-password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
          id="login-submit-btn"
        >
          {isSubmitting ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
