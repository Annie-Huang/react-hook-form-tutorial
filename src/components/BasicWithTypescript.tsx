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
};

const BasicWithTypescript = () => {
  renderCount++;

  // const { register } = useForm();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // watch is for 1. conditionally render stuff, 2. show something in the view.
  // console.log('watch=', watch());

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

      <form
        onSubmit={handleSubmit((data) => {
          console.log('data=', data);
        })}
      >
        <label htmlFor='firstName'>First Name:</label>
        {/*<input {...register('firstName', { required: true })} id='First Name' />*/}
        {/*{errors.firstName && <p className='error'>This is required</p>}*/}
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

        <label htmlFor='age'>Age</label>
        <input
          {...register('age', {
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
      </form>
    </div>
  );
};

export default BasicWithTypescript;
