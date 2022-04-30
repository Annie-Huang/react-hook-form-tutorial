import React from 'react';
import { useForm } from 'react-hook-form';

let renderCount = 0;
const Basic = () => {
  const { register, handleSubmit } = useForm();
  renderCount++;

  return (
    <div>
      Render Count: {renderCount}
      {/*
      <form>
        <input name='firstName' placeholder='First Name' />
        <input name='lastName' placeholder='Last Name' />
        <input type='submit' />
      </form>
      */}
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input {...register('firstName')} placeholder='First Name' />
        <input {...register('lastName')} placeholder='Last Name' />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Basic;
