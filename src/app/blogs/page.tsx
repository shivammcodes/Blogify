"use client"

import Image from 'next/image';

import Search from '@/components/search';

import { Button } from '@/components/ui/button';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import {format} from 'date-fns';

import CommonLoader from '@/components/CommonLoader';

import { User,CalendarDays } from 'lucide-react';

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

  const [loading,setLoading]=useState<boolean>(true);

  const [search,setSearch]=useState<string>("");

  async function handlerGetPosts(){

    try{

      setLoading(true);

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

    finally{

      setLoading(false);

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

  let foundBlog=null;

  foundBlog=posts?.filter((value)=>value.title.toLowerCase().includes(search.toLowerCase()));

  console.log(blogDisplayCount);

  if(loading) return <CommonLoader></CommonLoader>

  return (

    <div className='wrapper w-full min-h-screen relative pb-40 sm:pb-44 pt-24 sm:pt-28 lg:pt-36 px-5 sm:px-8 md:px-12 lg:px-20 xl:px-36 font-sans'>

      {/* HEADER */}

      <div className="blog-header mt-16 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 sm:mb-16">

        <div className="title text-3xl sm:text-4xl font-heading tracking-tight">

          All blogs

        </div>

        <div className="search w-full sm:w-auto">

          <Search onSearch={setSearch}></Search>

        </div>

      </div>


      {

        search.length>0 ? (

          <div className='wrapper w-full'>

            {

              foundBlog?.map((value)=>(

                <div
                  className="blog grid grid-cols-1 lg:grid-cols-5 h-fit gap-6 lg:gap-x-12 xl:gap-x-20 my-10 sm:my-12 lg:my-16"
                  key={value._id}
                >

                  <div className="left col-span-1 lg:col-span-2 bg-sky-200 h-56 sm:h-64 lg:h-56 rounded-xl">

                    <Image
                      src={`${value.coverImage}`}
                      alt=''
                      height={800}
                      width={1200}
                      className='w-full h-full object-cover rounded-xl'
                    />

                  </div>

                  <div className="right col-span-1 lg:col-span-3 bg-secondary px-5 py-4 rounded-xl">

                    <Link href={`/blogs/${value._id}`}>

                      <div className="title text-xl sm:text-2xl max-w-full lg:max-w-11/12 font-heading tracking-normal">

                        {value.title}

                      </div>

                    </Link>

                    <div className="aut-date flex flex-col sm:flex-row justify-between gap-3 mt-5">

                      <div className="author w-fit px-3 py-1 bg-secondary rounded-full text-sm flex items-center gap-x-1">

                        <div className="logo flex justify-center">

                          <User size={".8rem"}></User>

                        </div>

                        {value?.authorName}

                      </div>

                      <div className="date w-fit px-3 py-1 bg-secondary rounded-full text-sm">

                        {

                          value && (

                            <div className="flex text-sm items-center gap-x-1">

                              <CalendarDays size={".8rem"} />

                              {format(new Date(value.createdAt),"PPP")}

                            </div>

                          )

                        }

                      </div>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        ) : (

          <>

            {/* SECTION 1 */}

            <div className="sec-2 grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-x-6 w-full h-fit">

              {/* LEFT */}

              <div className="left col-span-1 lg:col-span-4">

                {firstSectionLeft && (

                  <div className="img w-full h-64 sm:h-80 lg:h-[28rem] rounded-2xl">

                    <Image
                      className='object-cover rounded-2xl h-full w-full'
                      width={1200}
                      height={800}
                      src={firstSectionLeft.coverImage}
                      alt=''
                    />

                  </div>

                )}

                <Link href={`/blogs/${firstSectionLeft?._id}`}>

                  <div className="title mt-4 text-xl sm:text-2xl lg:text-3xl font-heading">

                    {firstSectionLeft?.title}

                  </div>

                </Link>

                <div className="date text-sm sm:text-lg text-gray-900/60">

                  {

                    firstSectionLeft &&(

                      format(new Date(firstSectionLeft.createdAt), "PPP")

                    )

                  }

                </div>

              </div>


              {/* RIGHT */}

              <div className="right col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-y-10 px-0 lg:px-10">

                {

                  firstSetionRight?.map(value=>(

                    <div className="up" key={value._id}>

                      <div className="img h-fit w-full rounded-2xl">

                        <Image
                          src={value.coverImage}
                          alt=''
                          width={1200}
                          height={800}
                          className='h-48 sm:h-40 object-cover w-full rounded-2xl'
                        />

                      </div>

                      <Link href={`/blogs/${value._id}`}>

                        <div className="title mt-4 mb-1 max-w-full text-lg sm:text-xl font-heading">

                          {value.title}

                        </div>

                      </Link>

                      <div className="date text-gray-900/60 text-sm">

                        {

                          format(new Date(value.createdAt), "PPP")

                        }

                      </div>

                    </div>

                  ))

                }

              </div>

            </div>


            {/* SECTION 2 */}

            <div className="blogs relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 lg:gap-x-16 gap-y-10 mt-16 lg:mt-20">

              {

                secondSection?.map(value=>(

                  <div className="wrapper col-span-1 h-fit rounded-xl" key={value._id}>

                    <Image
                      src={value.coverImage}
                      alt=''
                      className='h-56 sm:h-64 md:max-h-80 w-full rounded-xl object-cover'
                      height={800}
                      width={1200}
                    />

                    <Link href={`/blogs/${value._id}`}>

                      <div className="title text-lg sm:text-xl mt-4 mb-2 font-heading">

                        {value.title}

                      </div>

                    </Link>

                    <div className="date text-gray-900/60 text-sm">

                      {

                        format(new Date(value.createdAt), "PPP")

                      }

                    </div>

                  </div>

                ))

              }

            </div>


            {/* SECTION 3 */}

            <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 lg:mt-20 gap-10 lg:gap-14">

              {thirdSection?.map(value=>(

                <div className="box col-span-1 w-full h-fit" key={value._id}>

                  <Image
                    src={value.coverImage}
                    className='w-full h-48 sm:h-52 lg:max-h-46 rounded-xl object-cover'
                    height={800}
                    width={1200}
                    alt=''
                  />

                  <Link href={`/blogs/${value._id}`}>

                    <div className="title pt-4 mb-1 text-lg sm:text-xl font-heading">

                      {value.title}

                    </div>

                  </Link>

                  <div className="date text-gray-900/60 text-sm">

                    {

                      format(new Date(value.createdAt), "PPP")

                    }

                  </div>

                </div>

              ))}

              {

                blogDisplayCount<(posts?.length ?? 0) &&(

                  <Button
                    className="relative sm:absolute left-1/2 -translate-x-1/2 mt-5 sm:mt-10 lg:mt-0 sm:bottom-10 px-7 rounded-xl text-base sm:text-lg py-5 sm:py-6 bg-transparent border-black/30 text-black/50"
                    onClick={()=>{setBlogDisplayCount(blogDisplayCount+6)}}
                    variant={'secondary'}
                  >

                    Load More

                  </Button>

                )

              }

            </div>

          </>

        )

      }

    </div>

  )

}

export default page







































// "use client"
// import Image from 'next/image';
// import Search from '@/components/search';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import {format}  from 'date-fns';
// import CommonLoader from '@/components/CommonLoader';
// import { User,CalendarDays } from 'lucide-react';

// type postContext={
//   _id: string,
//   title: string,
//   authorId: string,
//   authorName: string,
//   coverImage: string,
//   content: string,
//   createdAt: string
// }
// const page = () => {


//   const [posts,setPosts]=useState<postContext[] | null>(null);
//   const [blogDisplayCount,setBlogDisplayCount]=useState<number>(13);
//   const [loading,setLoading]=useState<boolean>(true);
//   const [search,setSearch]=useState<string>("");
//   async function handlerGetPosts(){
//     try{
//       setLoading(true);
//       const response=await fetch("/api/posts",{
//         method: "GET",
//       })

//       const data=await response.json();
//       if(!response.ok){
//         toast.error(data.error);
//       }
//       else{
//         setPosts(data.data);
//       }
//     }
//     catch(error){
//       console.log("Cant get the posts :",error);
//     }
//     finally{
//       setLoading(false);
//     }
//   }
//   useEffect(()=>{
//     handlerGetPosts();
//   },[])
//   console.log(posts);
//   const firstSectionLeft=posts?.[0];
//   const firstSetionRight=posts?.slice(1,3);
//   const secondSection=posts?.slice(3,7);
//   const thirdSection=posts?.slice(7,blogDisplayCount);
//   let foundBlog=null;
//   foundBlog=posts?.filter((value)=>value.title.toLowerCase().includes(search.toLowerCase()));
// console.log(blogDisplayCount);
// if(loading) return <CommonLoader></CommonLoader>
//   return (
//     <div className='wrapper w-full min-h-screen relative pb-44 pt-16 px-36'>
//         <div className="blog-header mt-36 flex items-center justify-between mb-16">
//           <div className="title text-4xl">All blogs</div>
//           <div className="search"><Search onSearch={setSearch}></Search></div>
//         </div>


//       {
//         search.length>0 ? (
//                   <div className='wrapper w-full'>
//                      {
//                      foundBlog?.map((value)=>(
//                       <div className="blog grid grid-cols-5 h-fit gap-x-20 my-16" key={value._id}>
//                         <div className="left col-span-2 bg-sky-200 h-56 rounded-xl">
//                           <Image src={`${value.coverImage}`} alt='' height={800} width={1200} className='w-full h-full object-cover rounded-xl'></Image>
//                         </div>
//                         <div className="right col-span-3 bg-secondary px-5 py-3 rounded-xl">
//                           <Link href={`/blogs/${value._id}`}><div className="title text-2xl max-w-11/12">{value.title}</div></Link>
//                           <div className="aut-date flex justify-between mt-3">
//                             <div className="author px-3 py-1 bg-secondary rounded-full text-sm flex items-center gap-x-1">
//                                 <div className="logo flex justify-center"><User size={".8rem"}></User></div>
//                                  {value?.authorName}
//                             </div>
//                             <div className="date px-3 py-1 bg-secondary rounded-full text-sm">
//                                  {
//                                    value && (
//                                   <div className="flex text-sm items-center gap-x-1">
//                                   <CalendarDays size={".8rem"} />
//                                   {format(new Date(value.createdAt),"PPP")}
//                               </div>
//                             )
//                                 }
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                      ))
//                      }
//                   </div>
//                   ) :(
//                     <>
                      
// {/* section 1 */}
        
//         <div className="sec-2 grid grid-cols-6 gap-x-6 w-full h-fit">
//                   <div className="left col-span-4">
//                     {firstSectionLeft && (
//                        <div className="img w-full h-3/4 rounded-2xl"><Image className='object-cover rounded-2xl h-full w-full'width={1200} height={800} src={firstSectionLeft.coverImage} alt=''></Image></div>
//                     )}
//                     <Link href={`blogs/${firstSectionLeft?._id}`}><div className="title mt-4 text-2xl">{firstSectionLeft?.title}</div></Link>
//                     <div className="date text-lg text-gray-900/60">
//                        {firstSectionLeft &&(
//                         format(new Date(firstSectionLeft.createdAt), "PPP")
//                        )}
//                     </div>
//                   </div>
                  
        
        
//                   {/* Right */}
        
//                   <div className="right col-span-2 grid grid-rows-2 gap-y-10 px-10">
//                     {
//                       firstSetionRight?.map(value=>(
//                         <div className="up row-span-1" key={value._id}>
//                       <div className="img h-fit w-full rounded-2xl">
//                           <Image src={value.coverImage} alt='' width={1200} height={800} className='h-40 object-cover w-full rounded-2xl'></Image>
//                       </div>
//                       <Link href={`blogs/${value._id}`}><div className="title mt-4 mb-1 max-w-10/12 text-xl">{value.title}</div></Link>
//                       <div className="date text-gray-900/60">
//                         {
//                           format(new Date(value.createdAt), "PPP")
//                         }
//                       </div>
//                     </div>
//                       ))
//                     }
//                   </div>
//                 </div>



//         {/* section 2 */}


//         <div className="blogs relative grid grid-cols-2 gap-x-16 gap-y-8 mt-20">
//           {
//             secondSection?.map(value=>(
//             <div className="wrapper col-span-1 h-fit rounded-xl" key={value._id}>
//             <Image src={value.coverImage} alt='' className='max-h-80 w-full rounded-xl object-cover' height={800} width={1200}></Image>
//             <Link href={`/blogs/${value._id}`}><div className="title text-xl mt-4 mb-2">{value.title}</div></Link>
//             <div className="date text-gray-900/60">
//                 {
//                   format(new Date(value.createdAt), "PPP")
//                 }
//             </div>
//           </div>
//             ))
//           }
//         </div>




//         {/* Section 3 */}

//         <div className="wrapper grid grid-cols-3 mt-20 gap-14">

//             {thirdSection?.map(value=>(
//               <div className="box col-span-1 w-full h-fit" key={value._id}>
//                 <Image src={value.coverImage} className='w-full max-h-46 rounded-xl object-cover' height={800} width={1200} alt=''></Image>
//                 <Link href={`/blogs/${value._id}`}><div className="title pt-4 mb-1 text-xl">{value.title}</div></Link>
//                 <div className="date text-gray-900/60">
//                   {
//                     format(new Date(value.createdAt), "PPP")
//                   }
//                 </div>
//             </div>
//             ))}
//            {
//             blogDisplayCount<(posts?.length ?? 0) &&(
//               <Button className="absolute left-1/2 bottom-10 -translate-x-1/2 px-7 rounded-xl text-lg py-6 bg-transparent border-black/30 text-black/50"  onClick={()=>{setBlogDisplayCount(blogDisplayCount+6)}}  variant={'secondary'}> Load More</Button>
//             )
//            }

//         </div>
//                     </>
//                   )
//       }

//     </div>
//   )
// }

// export default page
