import React from 'react';

function NewsLetter() {

    const handleNewsletter = (e) => {
        e.preventDefault();
        alert(`Subscribed to Newsletter`)
       }
  return (
    <section className=" bg-blue-500 dark:bg-cardDark text-white min-[250px]:p-1 min-[325px]:p-6  mt-3">

 <div className='container mx-auto text-center'>
 <h2 className= "text-xl sm:text-2xl font-bold mb-4">Stay Updated!</h2>
        <p className="mb-4 max-sm:text-sm">Subscribe to our newsletter to get the latest hostel updates.</p>
    <form onSubmit={handleNewsletter}>
    <input type="email" placeholder="Enter your email" className="max-[235px]:w-[100px] max-sm:w-[150px] max-[300px]:text-[10px] p-1 py-2 min-[346px]:p-2 rounded-l-lg text-gray-500 dark:text-white dark:bg-bgInputsDark focus:border border-icons focus:outline-none"/>
    <button type="submit" className="px-2 max-[235px]:w-[80px] min-[346px]:px-4 max-[300px]:text-[10px] py-2 bg-hov hover:bg-hovDark text-text rounded-r-lg">Subscribe</button>
  </form>
 </div>
  </section>
  )
}

export default NewsLetter
