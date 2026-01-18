'use client';

import { forwardRef } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { cn } from '@/components/ui/utils';

export interface DynamicInputProps {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url' | 'textarea' | 'select';
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  options?: Array<{ value: string; label: string }>; // For select type
  rows?: number; // For textarea
  min?: number | string;
  max?: number | string;
  step?: number | string;
  validationMessage?: string;
}

export const DynamicInput = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, DynamicInputProps>(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      register,
      error,
      disabled = false,
      required = false,
      className = '',
      inputClassName = '',
      labelClassName = '',
      options = [],
      rows = 4,
      min,
      max,
      step,
      validationMessage,
      ...props
    },
    ref
  ) => {
    const errorMessage = error?.message || validationMessage;

    const baseInputClasses = cn(
      'w-full px-3 py-2 text-sm border rounded-lg transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      errorMessage
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500',
      inputClassName
    );

    const labelClasses = cn(
      'block text-sm font-medium text-gray-700 mb-1.5',
      required && "after:content-['*'] after:ml-0.5 after:text-red-500",
      labelClassName
    );

    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label htmlFor={name} className={labelClasses}>
            {label}
          </label>
        )}

        {type === 'textarea' ? (
          <textarea
            id={name}
            {...register}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={baseInputClasses}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? `${name}-error` : undefined}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : type === 'select' ? (
          <select
            id={name}
            {...register}
            ref={ref as React.Ref<HTMLSelectElement>}
            disabled={disabled}
            className={baseInputClasses}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? `${name}-error` : undefined}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            {...register}
            ref={ref as React.Ref<HTMLInputElement>}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={baseInputClasses}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? `${name}-error` : undefined}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {errorMessage && (
          <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

DynamicInput.displayName = 'DynamicInput';

