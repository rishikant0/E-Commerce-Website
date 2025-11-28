import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
      <p className='text-gray-400 text-sm mt-3'>Join our newsletter to stay updated with the latest offers and products.</p>

      <form
        onSubmit={onSubmitHandler}
        className='text-center w-full sm:w-1/2 flex items-center gap-3 mx-auto outline-none'
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border border-gray-300 p-3 rounded-lg"
        />

        <button
          className="mt-5 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
