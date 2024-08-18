import React from 'react';

function NewsLetter() {

    const handleNewsletter = (e) => {
        e.preventDefault();
        alert(`Subscribed to Newsletter`)
       }
  return (
    <section className=" bg-blue-500 text-white p-6  ">

 <div className='container mx-auto text-center'>
 <h2 className="text-2xl font-bold mb-4">Stay Updated!</h2>
        <p className="mb-4">Subscribe to our newsletter to get the latest hostel updates.</p>
    <form onSubmit={handleNewsletter}>
    <input type="email" placeholder="Enter your email" className="p-2 rounded-l-lg text-gray-500"/>
    <button type="submit" className="px-4 py-2 bg-white text-blue-500 rounded-r-lg">Subscribe</button>
  </form>
 </div>
  </section>
  )
}

export default NewsLetter
