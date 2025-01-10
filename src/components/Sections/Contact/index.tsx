import {DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {FC, memo} from 'react';

import {contact, SectionId} from '../../../data/data';
import {ContactType, ContactValueMap} from '../../../data/dataDef';
import Section from '../../Layout/Section';

const ContactValueMapData: Record<ContactType, ContactValueMap> = {
  [ContactType.Email]: {Icon: EnvelopeIcon, srLabel: 'Email'},
  [ContactType.Phone]: {Icon: DevicePhoneMobileIcon, srLabel: 'Phone'},
  [ContactType.Location]: {Icon: MapPinIcon, srLabel: 'Location'},
  [ContactType.Github]: {Icon: EnvelopeIcon, srLabel: 'Github'},
  [ContactType.LinkedIn]: {Icon: EnvelopeIcon, srLabel: 'LinkedIn'},
  [ContactType.Facebook]: {Icon: EnvelopeIcon, srLabel: 'Facebook'},
  [ContactType.Twitter]: {Icon: EnvelopeIcon, srLabel: 'Twitter'},
  [ContactType.Instagram]: {Icon: EnvelopeIcon, srLabel: 'Instagram'},
};

const Contact: FC = memo(() => {
  const {headerText, description, items} = contact;

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Contact}>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-white">{headerText}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="order-2 col-span-1 md:order-1 ">
            <p className="prose leading-6 text-neutral-300">{description}</p>
          </div>
          <div className="order-1 col-span-1 flex flex-col gap-y-4 md:order-2">
            {items.map(({type, text, href}) => {
              const {Icon, srLabel} = ContactValueMapData[type];
              return (
                <div className="flex items-center gap-x-2" key={srLabel}>
                  <Icon className="h-5 w-5 text-white" />
                  <span className="sr-only">{srLabel}</span>
                  {href ? (
                    <a
                      className={classNames(
                        'text-sm font-medium text-neutral-300 hover:text-blue-500 focus:text-blue-500',
                      )}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-neutral-300">{text}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
