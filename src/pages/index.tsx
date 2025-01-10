import { ArrowPathIcon, ChartBarIcon, DocumentTextIcon, ShieldCheckIcon, UserGroupIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Upload your financial documents and get an unbiased AI analysis of your company\'s value and potential.',
    icon: ChartBarIcon,
  },
  {
    name: 'Transparent Marketplace',
    description: 'Browse our comprehensive marketplace featuring detailed business profiles and high-level company data.',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Secure Document Management',
    description: 'Handle NDAs and sensitive information through our secure Virtual Data Room during due diligence.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'End-to-End Process',
    description: 'Seamlessly manage the entire M&A process from initial discussions to post-purchase integration.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Professional Community',
    description: 'Connect with M&A professionals and business owners in our thriving community section.',
    icon: UserGroupIcon,
  },
  {
    name: 'Resource Center',
    description: 'Access valuable resources and educational content to grow your M&A expertise.',
    icon: DocumentTextIcon,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <Head>
        <title>M&A Marketplace - Simplifying Business Acquisitions</title>
        <meta name="description" content="A state-of-the-art platform for buying and selling businesses with transparency and ease." />
      </Head>

      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Transform Your M&A Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our state-of-the-art platform simplifies the entire M&A process. From initial valuation to final integration,
              we provide the tools and transparency needed for successful business transactions.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/marketplace"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Marketplace
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Comprehensive Platform</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for successful M&A transactions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the tools and features needed to facilitate smooth and successful business transactions,
            from initial valuation to final integration.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-32 sm:mt-40">
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to start your M&A journey?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Join our platform today and experience a transparent, efficient way to buy or sell businesses.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </Link>
                <Link href="/pricing" className="text-sm font-semibold leading-6 text-white">
                  View pricing <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
