import React from 'react';
import { useForm } from 'react-hook-form';

let renderCount = 0;
const Basic = () => {
  // Subscribing the error state will trigger rerender....
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  renderCount++;

  console.log('errors=', errors);

  return (
    <div>
      Render Count: {renderCount}
      {/*
      <form>
        <input name='firstName' placeholder='First Name' />
        <input name='lastName' placeholder='Last Name' />
        <input type='submit' />
      </form>

      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input {...register('firstName')} placeholder='First Name' />
        <input {...register('lastName')} placeholder='Last Name' />
        <input type='submit' />
      </form>
      */}
      <form
        onSubmit={handleSubmit((data) => {
          console.log('handleSubmit=', data);
        })}
      >
        <input
          {...register('firstName', { required: true })}
          placeholder='First Name'
        />
        <input
          {...register('lastName', { required: true, minLength: 4 })}
          placeholder='Last Name'
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Basic;
