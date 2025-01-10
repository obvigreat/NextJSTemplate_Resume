import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import {FC, memo} from 'react';

import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        <div className="w-full columns-2 md:columns-3 lg:columns-4">
          {portfolioItems.map((item: PortfolioItem, index: number) => {
            const {title, image} = item;
            return (
              <div className="pb-6" key={`${title}-${index}`}>
                <div
                  className={classNames(
                    'relative h-max w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
                  )}>
                  <Image alt={title} className="h-full w-full" placeholder="blur" src={image} />
                  <ItemOverlay item={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {href, title, description}}) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 px-3 text-white">
      <p className="mb-6 text-lg font-bold text-white">{title}</p>
      <p className="text-center text-white">{description}</p>
      {href && (
        <Link
          className="mt-5 rounded-full border-2 border-white px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-gray-900"
          href={href}
        >
          Learn More
        </Link>
      )}
    </div>
  );
});
