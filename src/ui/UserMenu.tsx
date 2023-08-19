'use client';

import userIcon from 'assets/user.svg';

import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import type { Session } from 'next-auth';
import { Fragment } from 'react';

const { Button, Items, Item } = Menu;

type Props = {
  session: Session;
};

export default function UserMenu({ session }: Props) {
  return (
    <Menu>
      <Button>
        {session.user.image ? (
          <Image
            className="rounded-full"
            alt="user_img"
            src={session.user.image}
            width={40}
            height={40}
          />
        ) : (
          <UserCircleIcon />
        )}
      </Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Items className="absolute right-10 top-20 origin-top-right p-4 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <span>{session.user.email}</span>
        </Items>
      </Transition>
    </Menu>
  );
}
