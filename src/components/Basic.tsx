import React from 'react';
import { useForm } from 'react-hook-form';

let renderCount = 0;
const Basic = () => {
  renderCount++;

  // Subscribing the error state will trigger rerender....
  /*
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo',
    },
  });

  // console.log('errors=', errors);

  // watch() will watch the whole form in an object, while watch('firstName') will only print out the firstname value.
  // If you only watch('firstName'), and you only have watch('firstName') and no watch().
  // you will find out that console.log('watch("firstName")=', watch('firstName')) does not print everything you update the 'lastName',
  // which is very handy as we don't want that many rerender....
  /*
  console.log('watch()=', watch());
  console.log('watch("firstName")=', watch('firstName'));
   */
  const firstName = watch('firstName');

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
      */}
      {/*
      I am bit confused,
      - If i got default value, and make the field required, clearing the field and blur the input does not make error show up straight away...
      - If I don't have default value, and the field is required, click and blur the input also not making error shows up.
      */}
      <form
        onSubmit={handleSubmit((data) => {
          console.log('handleSubmit=', data);
        })}
      >
        <input
          {...register('firstName', { required: 'This is required.' })}
          placeholder='First Name'
        />
        <p>{firstName}</p>
        <p className='error'>{errors.firstName?.message}</p>
        <input
          {...register('lastName', {
            required: 'This is required.',
            minLength: {
              value: 4,
              message: 'Min length is 4',
            },
          })}
          placeholder='Last Name'
        />
        <p className='error'>{errors.lastName?.message}</p>
        <input type='submit' />
      </form>
    </div>
  );
};

export default Basic;
