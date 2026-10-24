import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/authService';
import { setError, setUser } from '../../redux/slices/authSlice';
import { registerSchema } from '../../utils/validationSchemas';
import styles from './RegisterForm.module.css';

export default function RegisterForm({ onClose }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const user = await registerUser(data);
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
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>
        Thank you for your interest in our platform! A few more steps to get
        started.
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <input
            id="reg-name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            type="text"
            placeholder="Name"
            {...register('name')}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="reg-email"
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
              id="reg-password"
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
          id="register-submit-btn"
        >
          {isSubmitting ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
