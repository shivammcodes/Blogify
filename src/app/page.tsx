import img from '../../public/hero.png';
import img1 from '../../public/img1.png';
import Image from 'next/image';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const page = () => {
  return (
    <div className='wrapper w-full min-h-screen relative pb-56 pt-44 px-36'>
      <div className="top h-fit grid-cols-2 flex justify-between gap-x-40">
        <div className="left col-span-1 w-full">
          <div className="blog w-fit h-fit  px-3 text-sm py-2 rounded-full bg-secondary">THE BLOG</div>
          <div className="title text-4xl mt-5 mb-6 w-3/4 tracking-wide leading-snug font-medium">Live in Kota: Salary sacrifice schemes your employees value, run from one place</div>
          <div className="date mb-8">August 20, 2026</div>
          <Button className="gotobtn w-fit h-fit px-5 text-sm py-3 rounded-lg border-black/30 text-black/50" variant={"secondary"}><Link href={'/'}>Read blog -</Link></Button>

        </div>  
        <div className="right col-span-1 w-full flex items-center justify-center rounded-lg"><Image className='rounded-lg w-full h-full object-cover' src={img} alt=''></Image></div>
      </div>
       {/* blog section */}

        <div className="blog-header mt-36 flex items-center justify-between mb-16">
          <div className="title text-4xl">Latest blogs</div>
          <div className="search"><Search></Search></div>
        </div>


        {/* section 2 */}
        <div className="sec-2 grid grid-cols-6 gap-x-6 w-full h-fit">
          <div className="left col-span-4">
            <div className="img w-full h-3/4 rounded-2xl"><Image className='object-cover rounded-2xl h-full w-full' src={img1} alt=''></Image></div>
            <div className="title mt-4 text-2xl">Kota is now offering Cycle to Work with DASH</div>
            <div className="date text-lg text-gray-900/60">August 6, 2026</div>
          </div>
          <div className="right col-span-2 grid grid-rows-2 gap-y-12 px-10">


            <div className="up row-span-1">
              <div className="img h-fit w-full rounded-2xl">
                <Image src={img1} alt='' className='h-40 object-cover w-full rounded-2xl'></Image>
              </div>
              <div className="title mt-4 mb-1 max-w-10/12 text-xl">10 Most Popular UK Business Health Insurance Providers Compared</div>
              <div className="date text-gray-900/60">August 4, 2026</div>
            </div>


            <div className="down row-span-1">
              <div className="img h-fit w-full rounded-2xl">
                <Image src={img1} alt='' className='h-40 object-cover w-full rounded-2xl'></Image>
              </div>
              <div className="title mt-4 mb-1 max-w-10/12 text-xl">10 Most Popular UK Business Health Insurance Providers Compared</div>
              <div className="date text-gray-900/60">August 4, 2026</div>
            </div>
          </div>
        </div>



        {/* section 3 */}
        <div className="blogs relative grid grid-cols-2 gap-x-16 gap-y-8 mt-20">
          <div className="wrapper col-span-1 h-fit rounded-xl">
            <Image src={img1} alt='' className='max-h-80 w-full rounded-xl'></Image>
            <div className="title text-xl mt-4 mb-2">Best Workplace Pension Providers for UK Employers in 2026</div>
            <div className="date text-gray-900/60">July 31, 2026</div>
          </div>
          
          
          <div className="wrapper col-span-1 h-fit rounded-xl">
            <Image src={img1} alt='' className='max-h-80 w-full rounded-xl'></Image>
            <div className="title text-xl mt-4 mb-2">Best Workplace Pension Providers for UK Employers in 2026</div>
            <div className="date text-gray-900/60">July 31, 2026</div>
          </div>


          <div className="wrapper col-span-1 h-fit rounded-xl">
            <Image src={img1} alt='' className='max-h-80 w-full rounded-xl'></Image>
            <div className="title text-xl mt-4 mb-2">Best Workplace Pension Providers for UK Employers in 2026</div>
            <div className="date text-gray-900/60">July 31, 2026</div>
          </div>



          <div className="wrapper col-span-1 h-fit rounded-xl">
            <Image src={img1} alt='' className='max-h-80 w-full rounded-xl'></Image>
            <div className="title text-xl mt-4 mb-2">Best Workplace Pension Providers for UK Employers in 2026</div>
            <div className="date text-gray-900/60">July 31, 2026</div>
          </div>

          <Button className="absolute left-1/2 -bottom-24 -translate-x-1/2 px-7 rounded-xl text-lg py-6 bg-transparent border-black/30 text-black/50" variant={'secondary'}><Link href={'/'}>Load More</Link></Button>
        </div>
    </div>
  )
}

export default page