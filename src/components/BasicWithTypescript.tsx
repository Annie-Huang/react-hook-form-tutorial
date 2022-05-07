import { BaseSyntheticEvent, SyntheticEvent, useEffect } from 'react';
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
  lastName4: string;
  lastName5: string;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    formState,
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
    getValues,
  } = useForm<FormValues>({
    // mode: 'onChange', // isValid only worked if you have mode set to be 'onChange'
    // delayError: 500, // delay to show up the error msg
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo',
      age: 1,
      yourDetail: {
        firstName: 'annie1',
      },
      lastName2: 'bill',
      lastName3: 'bill',
      lastName5: 'bill',
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

  // Submit with reset. Then you need to watch formState
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        firstName: 'bill1',
        lastName: 'luo1',
      });
    }
  }, [formState, reset]);

  // watch is for 1. conditionally render stuff, 2. show something in the view.
  // console.log('watch=', watch());
  // console.log('watch("firstName")=', watch('firstName'));
  // console.log(
  //   " watch(['firstName', 'lastName'])=",
  //   watch(['firstName', 'lastName'])
  // );
  // --------------------------------------------
  // NOTE: 'bill2' in below is the initially value of 'firstName', but you would usually set it in defaultValues rather than doing it like this.
  // console.log('watch("firstName")=', watch('firstName', 'bill2'));
  // --------------------------------------------
  // NOTE: the following is handy if you want to monitor every move from the user (e.g enter letters in each field)
  // useEffect(() => {
  //   const subscription = watch((data) => {
  //     console.log('data has change:', data);
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);
  // --------------------------------------------
  // NOTE: if you are assigning a value to a watch function, it should really be used inside the render rather than in the useEffect
  // E.g. this is the wrong approach:
  // const firstName = watch('firstName');
  // useEffect(() => {...}, [firstName])
  // Correct approach:
  // <p>{firstName === 'bill1' ? 'This is a fake one' : 'wait'}</p>

  console.log('errors=', errors);
  // console.log('isValid=', isValid);
  // NOTE: only worked when you have mode set to be 'onChange'. isDirty return true as long as your field value !== initial value
  //       isDirty is more like the native form of isDirty state
  console.log('isDirty=', isDirty);
  // NOTE: dirtyFields is a bit different from isDirty. If you change a field, it will show in the dirtyFields object.
  //       But if you change it back to the original value, it will be removed from the dirtyFields object.
  // console.log('dirtyFields=', dirtyFields);
  // NOTE: touchedFields will be added if you touched the field, even if you didn't make a change, like the native touch for <input>
  // console.log('touchedFields=', touchedFields);
  // NOTE: isSubmitted only log if the the submit button be clicked. Doesn't matter whether we call handleSubmit or not. Remember we will not call handleSubmit unless it pass validation?
  // console.log('isSubmitted=', isSubmitted);
  // NOTE: isSubmitted only log if handleSubmit is call, meaning it passes all validation when the submit button is clicked.
  // console.log('isSubmitSuccessful=', isSubmitSuccessful);
  // console.log('submitCount=', submitCount);
  // NOTE: Bill Lou said isSubmitting only work for async submit, but i can see it without async as well
  // console.log('isSubmitting=', isSubmitting);
  // NOTE: isValidating only work async validate, e.g. lastName4
  // console.log('isValidating=', isValidating);

  /*
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
  }
  const onSubmit = (data: FormValues) => {
    console.log('data=', data);
  };
  // Cannot find the type of the event, assigning it to React.SyntheticEvent or SyntheticBaseEvent does not work..
  // If it failed any validation, e.g. onError is called, it will not called handleSubmit(onSubmit) function
  const onSubmit = (data: FormValues, event: any) => {
    console.log('data=', data);
    console.log('event=', event); // the form is in event.target
  };
  // onSubmit function can be async as well
  const onSubmit = async (data: FormValues) => {
    // Bill Lou said isSubmitting only work for async submit, but i can see it without async as well....
    await sleep(3000);
    console.log('data=', data);
  };
  const onSubmit = async (data: FormValues) => {
    try {
      await sleep(3000);
      console.log('data=', data);
    } catch (e) {
      // setError('service', {
      //   type: 'serverSideError',
      //   message: 'something is wrong',
      // });
      // setError has to set to a specific field.
      setError('firstName', {
        type: 'serverSideError',
        message: 'something is wrong',
      });
    }
  };
  const onSubmit = async (data: FormValues) => {
    throw new Error('test');
  };
  */
  // Everytime you clicks submit, all the form state will get flush away.
  const onSubmit = (data: FormValues, event: any) => {
    console.log('data=', data);
    console.log('event=', event); // the form is in event.target
  };

  const onError = () => {
    console.log('--------- WRONG ---------');
  };

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description='Performant, flexible and extensible forms with easy-to-use validation.'
      />
      {/*
      <form onSubmit={onSubmit}>
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
      {/* Handle the code when onSubmit is throwing errors */}
      {/*<form*/}
      {/*  onSubmit={(e) =>*/}
      {/*    handleSubmit(onSubmit)(e).catch(() => {*/}
      {/*      console.log('e', e);*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*<form>*/}
      {/*<form onSubmit={handleSubmit(onSubmit, onError)}>*/}
      <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* isValidating only work async validate */}
        <label htmlFor='lastName4'>Last Name 4:</label>
        <input
          {...register('lastName4', {
            validate: async () => {
              await sleep(2000);
              return true;
            },
          })}
          id='Last Name 4'
        />
        {errors.lastName4 && (
          <p className='error'>{errors.lastName4.message}</p>
        )}

        {/* When you set a field to be disabled, it has the undefined value when submitting (even through it got default value). This is the same as native form behavior */}
        <label htmlFor='lastName5'>Last Name 5:</label>
        <input
          {...register('lastName5', { disabled: true })}
          id='Last Name 5'
        />
        {errors.lastName5 && (
          <p className='error'>{errors.lastName5.message}</p>
        )}

        <label htmlFor='yourDetail.firstName'>Your Detail First Name:</label>
        <input
          {...register('yourDetail.firstName', {
            required: 'This is required',
            minLength: 6,
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

        <button
          type='button'
          // onClick={() => setValue('yourDetail.firstName', 'annie')}
          // NOTE: ShouldDirty can be seen with isDirty, dirtyFields properties from formState. Component will re-render.
          // onClick={() =>
          //   setValue('yourDetail.firstName', 'annie', { shouldDirty: true })
          // }
          // NOTE: ShouldDirty can be seen with touchFields properties from formState. Component will re-render.
          // onClick={() =>
          //   setValue('yourDetail.firstName', 'annie', { shouldTouch: true })
          // }
          // NOTE: shouldValidate can be seen with errors properties from formState. Component will re-render.
          // If you want to check isValid as well make sure you change mode to be 'onChange'
          // onClick={() =>
          //   setValue('yourDetail.firstName', 'annie', { shouldValidate: true })
          // }
          // NOTE: if you have nesting fields, you can do all nesting one at the same time, e.g. below. However, we don't have nested in our example.
          // onClick={() =>
          //   setValue(
          //     'yourDetail',
          //     { firstName: 'annie', lastName: 'huang' },
          //     { shouldValidate: true }
          //   )
          // }
          // NOTE: cannot set multiple first level fields in one go, need to do separate setValue
          onClick={() => {
            setValue('yourDetail.firstName', 'annie', { shouldValidate: true });
            setValue('age', 10, { shouldValidate: true });
          }}
        >
          setValue
        </button>

        <button
          type='button'
          // NOTE: Reset the form to the original default value
          // onClick={() => reset()}
          // NOTE: Reset the form to new values + change the original default values to the new values as well
          // onClick={() => reset({ firstName: 'annie', lastName: 'huang' })}
          // NOTE: Reset the form to new values + NOT change the original default values
          //       You do this when you have initial value as empty and reset will fill the form with new value, isDirty is true.
          //       But because original value didn't change, when you delete the value in the form, isDirty will change back to false.
          //       You cannot see it in here for some reason, run the <TestReset> component to see.
          // onClick={() =>
          //   reset(
          //     { firstName: 'annie', lastName: 'huang' },
          //     { keepDefaultValues: true }
          //   )
          // }
          // NOTE: If you put on watch(), you can see the field has change but it doesn't change on the page, what is the use of this function??
          //       Also tested without watch(), press reset and then click submit, it will still submit the page value rather than the reset value.
          // onClick={() =>
          //   reset(
          //     { firstName: 'annie', lastName: 'huang' },
          //     { keepValues: true }
          //   )
          // }
          // NOTE: Partial reset. Just reset one and keep the rest of the value.
          //       setValue is usually use for setting single value where as reset is use for setting bulk values in different form fields
          //       Also unlike setValue, reset will wipe out your form state when you involve it,
          onClick={() => reset({ ...getValues, lastName: 'huang' })}
        >
          reset
        </button>

        <input type='submit' />
        {/*<input type='submit' disabled={!isValid} />*/}

        {/* Only got <form></form> and do submit through button click:
            Should not do this, it will decrease accessibility, e.g. press enter will not trigger form submission */}
        <button
          type='button'
          onClick={(e) => {
            handleSubmit(onSubmit, onError)(e);
          }}
        >
          Fake Submit
        </button>
      </form>
    </div>
  );
};

export default BasicWithTypescript;
