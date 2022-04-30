import React from 'react';
import { useForm } from 'react-hook-form';
import Headers from './Header';

let renderCount = 0;

const BasicWithTypescript = () => {
  renderCount++;

  const { register } = useForm();

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description='Performant, flexible and extensible forms with easy-to-use validation.'
      />
      <form>
        <label htmlFor='firstName'>First Name:</label>
        <input name='firstName' id='First Name' />

        <label htmlFor='lastName'>Last Name:</label>
        <input name='lastName' id='Last Name' />

        <label htmlFor='age'>Age</label>
        <input type='number' name='age' id='age' />

        <label htmlFor='gender'>Age</label>
        <select name='gender' id='gender'>
          <option value=''>Select...</option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>

        <label htmlFor='developer'>Are you a developer?</label>
        <input type='checkbox' name='developer' />

        <input type='submit' />
      </form>
    </div>
  );
};

export default BasicWithTypescript;
