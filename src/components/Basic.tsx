import React from 'react';

let renderCount = 0;
const Basic = () => {
  renderCount++;
  return (
    <div>
      Render Count: {renderCount}
      <form>
        <input name='firstName' placeholder='First Name' />
        <input name='lastName' placeholder='Last Name' />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Basic;
