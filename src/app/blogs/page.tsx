"use client"
import img1 from '../../../public/img1.png';
import Image from 'next/image';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {format}  from 'date-fns';
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
  const [blogDisplayCount,setBlogDisplayCount]=useState<number>(13);
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
  const firstSectionLeft=posts?.[0];
  const firstSetionRight=posts?.slice(1,3);
  const secondSection=posts?.slice(3,7);
  const thirdSection=posts?.slice(7,blogDisplayCount);

console.log(blogDisplayCount);
  return (
    <div className='wrapper w-full min-h-screen relative pb-44 pt-16 px-36'>
        <div className="blog-header mt-36 flex items-center justify-between mb-16">
          <div className="title text-4xl">All blogs</div>
          <div className="search"><Search></Search></div>
        </div>


        {/* section 1 */}
        
        <div className="sec-2 grid grid-cols-6 gap-x-6 w-full h-fit">
                  <div className="left col-span-4">
                    {firstSectionLeft && (
                       <div className="img w-full h-3/4 rounded-2xl"><Image className='object-cover rounded-2xl h-full w-full'width={1200} height={800} src={firstSectionLeft.coverImage} alt=''></Image></div>
                    )}
                    <div className="title mt-4 text-2xl">{firstSectionLeft?.title}</div>
                    <div className="date text-lg text-gray-900/60">
                       {firstSectionLeft &&(
                        format(new Date(firstSectionLeft.createdAt), "PPP")
                       )}
                    </div>
                  </div>
                  
        
        
                  {/* Right */}
        
                  <div className="right col-span-2 grid grid-rows-2 gap-y-10 px-10">
                    {
                      firstSetionRight?.map(value=>(
                        <div className="up row-span-1" key={value._id}>
                      <div className="img h-fit w-full rounded-2xl">
                          <Image src={value.coverImage} alt='' width={1200} height={800} className='h-40 object-cover w-full rounded-2xl'></Image>
                      </div>
                      <div className="title mt-4 mb-1 max-w-10/12 text-xl">{value.title}</div>
                      <div className="date text-gray-900/60">
                        {
                          format(new Date(value.createdAt), "PPP")
                        }
                      </div>
                    </div>
                      ))
                    }
                  </div>
                </div>



        {/* section 2 */}


        <div className="blogs relative grid grid-cols-2 gap-x-16 gap-y-8 mt-20">
          {
            secondSection?.map(value=>(
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
        </div>




        {/* Section 3 */}

        <div className="wrapper grid grid-cols-3 mt-20 gap-14">

            {thirdSection?.map(value=>(
              <div className="box col-span-1 w-full h-fit" key={value._id}>
                <Image src={value.coverImage} className='w-full max-h-46 rounded-xl' height={800} width={1200} alt=''></Image>
                <div className="title pt-4 mb-1 text-xl">{value.title}</div>
                <div className="date text-gray-900/60">
                  {
                    format(new Date(value.createdAt), "PPP")
                  }
                </div>
            </div>
            ))}
           {
            blogDisplayCount<(posts?.length ?? 0) &&(
              <Button className="absolute left-1/2 bottom-10 -translate-x-1/2 px-7 rounded-xl text-lg py-6 bg-transparent border-black/30 text-black/50"  onClick={()=>{setBlogDisplayCount(blogDisplayCount+6)}}  variant={'secondary'}> Load More</Button>
            )
           }

        </div>



    </div>
  )
}

export default page