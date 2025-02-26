import React, { useState } from 'react';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('ACCOUNT SETTINGS');

  const tabs = [
    'ACCOUNT SETTINGS',
    'BOOKING HISTORY',
    'MY FAVOURITES',
    'BOOKINGS'
  ];

  return (
    <div className=" bg-gray-100 px-10 min-h-screen">
      <header className=" ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">TRAFFIC <br></br>TOURS</div>
          <div className="flex items-center">
          
            <nav className="ml-10 font-semibold space-x-16">
              <a className="text-black hover:text-black" href="#">HOME</a>
              <a className="text-black hover:text-black" href="#">PACKAGES</a>
              <a className="text-black hover:text-black" href="#">ABOUT US</a>
              <a className="text-black hover:text-black" href="#">CONTACT US</a>
            </nav>
          </div>
          <div className='flex justify-center text-center '>
          <button className="bg-black text-white px-4 py-2 rounded-lg  m-3">BOOK NOW </button>
          <img
            src="https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="rounded-full w-10 h-10 object-cover mt-3"
          />
          </div>
         
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold">YOUR ADVENTURE AWAITS</h1>
        <p className="mt-2">TAILOR YOUR EXPERIENCE AND MAKE EVERY MOMENT UNFORGETTABLE.</p>

        <div className=" flex items-center my-12">
          <img
            src="https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover"
          />
          <div className="ml-6">
            <h2 className="text-md font-bold">LEEANN DEEMER</h2>
            <p className="text-md font-bold">LEEANNDEEMER@GMAIL.COM</p>
            <div className="mt-4">
              <button className="bg-white  border-1  px-2 py-2 rounded mr-2">CANCEL</button>
              <button className="bg-black text-white px-2 py-2 rounded">CHANGE PROFILE</button>
            </div>
          </div>
        </div>

        <div className=" bg-black text-white">
          <nav className="flex justify-between  ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-2 px-27 ${
                  selectedTab === tab
                    ? 'text-black bg-gray-100 font-bold border-b-4 border-black'
                    : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
{/* Account Settings */}
        {selectedTab === 'ACCOUNT SETTINGS' && (
           <div className="">
           <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
          
         </div>
          )}
      </main>
    </div>
  );
};

export default Profile;
