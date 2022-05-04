import React from 'react';
import { useForm } from 'react-hook-form';
import Headers from './Header';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
};

const TestReset = () => {
  renderCount++;

  const {
    register,
    watch,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isDirty,
      dirtyFields,
      touchedFields,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
      isSubmitting,
      isValidating,
    },
    setError,
    setValue,
    reset,
  } = useForm<FormValues>({
    // mode: 'onChange', // isValid only worked if you have mode set to be 'onChange'
    // delayError: 500, // delay to show up the error msg
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  console.log('isDirty=', isDirty);

  const onSubmit = (data: FormValues) => {
    console.log('data=', data);
  };

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description='Performant, flexible and extensible forms with easy-to-use validation.'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First name</label>
          <input
            type='text'
            {...register('firstName', { required: true })}
            placeholder='First name'
          />
        </div>
        <div>
          <label>Last name</label>
          <input type='text' {...register('lastName')} />
        </div>
        <button
          type='button'
          onClick={() =>
            reset(
              { firstName: 'annie', lastName: 'huang' },
              { keepDefaultValues: true }
            )
          }
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default TestReset;
