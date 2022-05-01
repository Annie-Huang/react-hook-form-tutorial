import React from 'react';
import { useForm } from 'react-hook-form';
import Headers from './Header';

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  developer: string;
  yourDetail: {
    firstName: string;
  };
  lastName2: string;
  lastName3: string;
};

const BasicWithTypescript = () => {
  renderCount++;

  /*
  const { register } = useForm();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo',
      yourDetail: {
        firstName: '',
      },
    },
  });
  */
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    // delayError: 500, // delay to show up the error msg
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo',
      yourDetail: {
        firstName: '',
      },
      lastName2: 'bill',
      lastName3: 'bill',
    },
  });

  // When you use validate option, you can get the validate of the field straight away.
  // Change the default value to 'Huang2' and you can see the this field in errors when submit
  register('lastName2', {
    maxLength: {
      value: 5,
      message: 'Max length is 5',
    },
    validate: async (value) => {
      // console.log('lastName2 value=', value);
      // return value === 'bill';
      return value === 'bill' || 'The lastName2 has to be bill';
    },
  });

  // You can see what's inside a register is just a wrapper with name, onBlur, onChange, ref property
  // Change the default value to 'Huang3' and you can see the this field in errors when submit
  console.log(
    'What is inside a Register ==>',
    register('lastName3', {
      maxLength: {
        value: 5,
        message: 'Max length is 5',
      },
      validate: async (value) => {
        // console.log('lastName3 value=', value);
        // return value === 'bill';
        return value === 'bill' || 'The lastName3 has to be bill';
      },
    })
  );

  // watch is for 1. conditionally render stuff, 2. show something in the view.
  // console.log('watch=', watch());
  // console.log('watch("firstName")=', watch('firstName'));
  // console.log(
  //   " watch(['firstName', 'lastName'])=",
  //   watch(['firstName', 'lastName'])
  // );
  // NOTE: 'bill2' in below is the initially value of 'firstName', but you would usually set it in defaultValues rather than doing it like this.
  // console.log('watch("firstName")=', watch('firstName', 'bill2'));

  // console.log('isValid=', isValid);
  console.log('errors=', errors);

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description='Performant, flexible and extensible forms with easy-to-use validation.'
      />
      {/*
      <form onSubmit={(e) => {
        const data = new FormData(e.target as HTMLFormElement)
      }}>
        <label htmlFor='firstName'>First Name:</label>
        <input name='firstName' id='First Name' />

        <label htmlFor='lastName'>Last Name:</label>
        <input name='lastName' id='Last Name' />

        <label htmlFor='age'>Age</label>
        <input name='age' type='number' id='age' />

        <label htmlFor='gender'></label>
        <select name='gender' id='gender'>
          <option value=''>Select...</option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>

        <label htmlFor='developer'>Are you a developer?</label>
        <input name='developer' type='checkbox'  value='yes' />

        <input type='submit' />
      </form>

      <form
        onSubmit={handleSubmit((data) => {
          console.log('data=', data);
        })}
      >
        <label htmlFor='firstName'>First Name:</label>
        <input {...register('firstName')} id='First Name' />

        <label htmlFor='lastName'>Last Name:</label>
        <input {...register('lastName')} id='Last Name' />

        <label htmlFor='age'>Age</label>
        <input {...register('age')} type='number' id='age' />

        <label htmlFor='gender'></label>
        <select {...register('gender')} id='gender'>
          <option value=''>Select...</option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>

        <label htmlFor='developer'>Are you a developer?</label>
        <input {...register('developer')} type='checkbox' value='yes' />

        <input type='submit' />
      </form>
      */}

      {/* One good thing about handleSubmit is that if the form is in error, it is not going to trigger handleSubmit... */}
      <form
        onSubmit={handleSubmit((data) => {
          console.log('data=', data);
        })}
      >
        <label htmlFor='firstName'>First Name:</label>
        {/*<input {...register('firstName', { required: true })} id='First Name' />*/}
        {/*{errors.firstName && <p className='error'>This is required</p>}*/}
        {/*========================================================================*/}
        {/*<input*/}
        {/*  {...register('firstName', {*/}
        {/*    required: { value: true, message: 'This is required' },*/}
        {/*  })}*/}
        {/*  id='First Name'*/}
        {/*/>*/}
        {/* NOTE: You would have the shortcut for required like below....*/}
        <input
          {...register('firstName', { required: 'This is required' })}
          id='First Name'
        />
        {errors.firstName && (
          <p className='error'>{errors.firstName.message}</p>
        )}

        <label htmlFor='lastName'>Last Name:</label>
        {/*<input*/}
        {/*  {...register('lastName', { required: true, maxLength: 4 })}*/}
        {/*  id='Last Name'*/}
        {/*/>*/}
        <input
          {...register('lastName', {
            required: 'This is required',
            maxLength: {
              value: 4,
              message: 'You exceeded the max length',
            },
          })}
          id='Last Name'
        />
        {errors.lastName && <p className='error'>{errors.lastName.message}</p>}

        <label htmlFor='yourDetail.firstName'>Your Detail First Name:</label>
        <input
          {...register('yourDetail.firstName', {
            required: 'This is required',
          })}
          id='Your Detail First Name'
        />
        {errors.yourDetail?.firstName && (
          <p className='error'>{errors.yourDetail.firstName.message}</p>
        )}

        <label htmlFor='age'>Age</label>
        <input
          {...register('age', {
            required: true, // If you don't put a default value and don't have required, the empty will become NaN, and will not do min or max check
            valueAsNumber: true,
            min: { value: 0, message: 'You should be at least 0 years old' },
            max: {
              value: 120,
              message: 'You cannot be more than 120 years old',
            },
          })}
          type='number'
          id='age'
        />
        {errors.age && <p className='error'>{errors.age.message}</p>}

        <label htmlFor='gender'></label>
        <select {...register('gender')} id='gender'>
          <option value=''>Select...</option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>

        <label htmlFor='developer'>Are you a developer?</label>
        <input {...register('developer')} type='checkbox' value='yes' />

        <input type='submit' />
        {/*<input type='submit' disabled={!isValid} />*/}
      </form>
    </div>
  );
};

export default BasicWithTypescript;
