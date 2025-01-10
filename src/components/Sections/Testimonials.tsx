import Image from 'next/image';
import {FC, memo, useCallback, useMemo, useState} from 'react';

import {SectionId, testimonial} from '../../data/data';
import useInterval from '../../hooks/useInterval';
import useWindow from '../../hooks/useWindow';
import Section from '../Layout/Section';

const Testimonials: FC = memo(() => {
  const {testimonials} = testimonial;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {width} = useWindow();
  const testimonialsToShow = useMemo(() => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }, [width]);

  const activeTestimonials = useMemo(
    () => testimonials.slice(activeIndex, activeIndex + testimonialsToShow),
    [activeIndex, testimonials, testimonialsToShow],
  );

  const nextTestimonial = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % (testimonials.length - testimonialsToShow + 1));
  }, [testimonials.length, testimonialsToShow]);

  useInterval(nextTestimonial, 2000);

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Testimonials}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">What our clients say</h2>
        <div className="flex gap-x-8">
          {activeTestimonials.map((testimonial, index) => {
            const {image, name, text} = testimonial;
            return (
              <div
                className="flex flex-col items-center gap-y-4 rounded-xl bg-neutral-300 p-4"
                key={`${name}-${index}`}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    alt={name}
                    className="h-full w-full rounded-full object-cover"
                    fill={true}
                    src={image}
                  />
                </div>
                <div className="flex flex-col gap-y-4">
                  <p className="text-center font-bold text-neutral-900">{name}</p>
                  <p className="text-center text-sm text-neutral-700">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

Testimonials.displayName = 'Testimonials';
export default Testimonials;
