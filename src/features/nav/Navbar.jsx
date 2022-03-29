import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscSearch } from 'react-icons/vsc';

function Navlink({ name }) {
  return (
    <li className='cursor-pointer transition ease-in delay-100 hover:text-main'>
      {name}
    </li>
  );
}

function Navbar() {
  return (
    <div className='sm:container sm:mx-auto md:max-w-[1100px] flex justify-between items-center h-[60px] px-4'>
      <div className='h-9 text-3xl text-main tracking-tighter mr-4'>
        PinFollower
      </div>

      <div className='h-11 w-96 min-w-[250px] p-2 relative border text-gray-500 rounded-sm '>
        <input
          type='text'
          id='search'
          className='h-full w-full focus:shadow focus:outline-none'
          placeholder='Search'
        />
        <button>
          <VscSearch className='text-md absolute right-4 top-3' />
        </button>
      </div>
      <div className='ml-4'>
        <GiHamburgerMenu className='text-3xl  cursor-pointer md:hidden' />
        <ul className='hidden md:flex md:justify-between md:items-center gap-3'>
          <Navlink name='Keşfet' />
          <Navlink name='Giriş Yap' />
          <Navlink name='Kayıt Ol' />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
