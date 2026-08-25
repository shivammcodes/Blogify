"use client"
import img from '../../public/hero.png';
import img1 from '../../public/img1.png';
import Image from 'next/image';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {format} from 'date-fns';

type postContext={
  _id: string,
  title: string,
  authorId: string,
  authorName: string,
  coverImage: string,
  content: string,
  createdAt: string
}
const page = () => {
  const [posts,setPosts]=useState<postContext[] | null>(null);
  async function handlerGetPosts(){
    try{
      const response=await fetch("/api/posts",{
        method: "GET",
      })

      const data=await response.json();
      if(!response.ok){
        toast.error(data.error);
      }
      else{
        setPosts(data.data);
      }
    }
    catch(error){
      console.log("Cant get the posts :",error);
    }
  }
  useEffect(()=>{
    handlerGetPosts();
  },[])
  console.log(posts);
  const firstSection=posts?.[0];
  const secondSectionLeft=posts?.[1];
  const SecondSetionRight=posts?.slice(2,4);
  const thirdSection=posts?.slice(4,8);
  return (
    <div className='wrapper w-full min-h-screen relative pb-56 pt-44 px-36'>
      <div className="top h-fit grid-cols-2 flex justify-between gap-x-40">
        <div className="left col-span-1 w-full">
          <div className="blog w-fit h-fit  px-3 text-sm py-2 rounded-full bg-secondary">THE BLOG</div>
          <div className="title text-4xl mt-5 mb-6 w-3/4 tracking-wide leading-snug font-medium">{firstSection?.title}</div>
          <div className="date mb-8">
            {
              firstSection && (
                format(new Date(firstSection?.createdAt),"PPP")
              )
            }
          </div>
          <Button className="gotobtn w-fit h-fit px-5 text-sm py-3 rounded-lg border-black/30 text-black/50" variant={"secondary"}><Link href={'/'}>Read blog -</Link></Button>

        </div>  
        {firstSection &&(
            <div className="right col-span-1 w-full flex items-center justify-center rounded-lg"><Image className='rounded-lg w-full h-full object-cover'  width={1200} height={800} src={firstSection?.coverImage} alt=''></Image></div>
        )}
      </div>
       {/* blog section */}

        <div className="blog-header mt-36 flex items-center justify-between mb-16">
          <div className="title text-4xl">Latest blogs</div>
          <div className="search"><Search></Search></div>
        </div>


        {/* section 2 */}

        {/* Left */}
        <div className="sec-2 grid grid-cols-6 gap-x-6 w-full h-fit">
          <div className="left col-span-4">
            {secondSectionLeft && (
               <div className="img w-full h-3/4 rounded-2xl"><Image className='object-cover rounded-2xl h-full w-full'width={1200} height={800} src={secondSectionLeft?.coverImage} alt=''></Image></div>
            )}
            <div className="title mt-4 text-2xl">{secondSectionLeft?.title}</div>
            <div className="date text-lg text-gray-900/60">
               {
              secondSectionLeft && (
                format(new Date(secondSectionLeft?.createdAt),"PPP")
              )
            }
            </div>
          </div>
          


          {/* Right */}

          <div className="right col-span-2 grid grid-rows-2 gap-y-10 px-10">
            {
              SecondSetionRight?.map(value=>(
                <div className="up row-span-1" key={value._id}>
              <div className="img h-fit w-full rounded-2xl">
                  <Image src={value.coverImage} alt='' width={1200} height={800} className='h-40 object-cover w-full rounded-2xl'></Image>
              </div>
              <div className="title mt-4 mb-1 max-w-10/12 text-xl">{value.title}</div>
              <div className="date text-gray-900/60">
                 {
                format(new Date(value?.createdAt),"PPP")
                  }
              </div>
            </div>
              ))
            }
          </div>
        </div>



        {/* section 3 */}
        <div className="blogs relative grid grid-cols-2 gap-x-16 gap-y-8 mt-20">
          {
            thirdSection?.map(value=>(
            <div className="wrapper col-span-1 h-fit rounded-xl" key={value._id}>
            <Image src={value.coverImage} alt='' className='max-h-80 w-full rounded-xl' height={800} width={1200}></Image>
            <div className="title text-xl mt-4 mb-2">{value.title}</div>
            <div className="date text-gray-900/60">
            {
              format(new Date(value.createdAt), "PPP")
            }
            </div>
          </div>
            ))
          }

          <Button className="absolute left-1/2 -bottom-24 -translate-x-1/2 px-7 rounded-xl text-lg py-6 bg-transparent border-black/30 text-black/50" variant={'secondary'}><Link href={'/blogs'}>Read all</Link></Button>
        </div>

        
    </div>
  )
}

export default page