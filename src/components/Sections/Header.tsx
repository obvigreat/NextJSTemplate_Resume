import {Dialog, Transition} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

export const headerID = 'header';

const Header: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const navSections = useMemo(
    () => [SectionId.About, SectionId.Resume, SectionId.Portfolio, SectionId.Testimonials, SectionId.Contact],
    [],
  );

  const activeSection = useNavObserver(
    navSections.map(section => `#${section}`),
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const baseClass = classNames(
    'fixed top-0 z-50 w-full bg-white bg-opacity-90 px-4 sm:px-6 lg:px-8',
  );

  return (
    <header className={baseClass} id={headerID}>
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link className="text-2xl font-bold text-gray-900" href="/">
          M&A Marketplace
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex space-x-8">
            {navSections.map(section => (
              <li key={section}>
                <Link
                  className={classNames(
                    'hover:text-gray-900',
                    activeSection === section ? 'text-gray-900' : 'text-gray-500',
                  )}
                  href={`#${section}`}
                >
                  {section}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="block rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 sm:hidden"
          onClick={toggleOpen}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <Transition.Root as={Fragment} show={isOpen}>
        <Dialog as="div" className="fixed inset-0 z-40 sm:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                <div className="absolute right-0 top-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={toggleOpen}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Link className="text-2xl font-bold text-gray-900" href="/">
                    M&A Marketplace
                  </Link>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="space-y-1">
                    {navSections.map(section => (
                      <Link
                        key={section}
                        className={classNames(
                          'block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-gray-900',
                          activeSection === section ? 'bg-gray-50 text-gray-900' : 'text-gray-600',
                        )}
                        href={`#${section}`}
                        onClick={toggleOpen}
                      >
                        {section}
                      </Link>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true" />
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
