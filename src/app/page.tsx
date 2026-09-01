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

  const [loading,setLoading]=useState<boolean>(true);

  const [search,setSearch]=useState<string>("");

  let foundBlog=null;

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

  const firstSection=posts?.[0];

  const secondSectionLeft=posts?.[1];

  const SecondSetionRight=posts?.slice(2,4);

  const thirdSection=posts?.slice(4,8);

  foundBlog=posts?.filter((value)=>value.title.toLowerCase().includes(search.toLowerCase()));

  if(loading) return <CommonLoader></CommonLoader>

  return (

    <div className='wrapper w-full min-h-screen relative pb-32 sm:pb-40 lg:pb-56 pt-28 sm:pt-32 lg:pt-44 px-5 sm:px-8 md:px-12 lg:px-20 xl:px-36 font-sans'>

      {/* HERO SECTION */}

      <div className="top h-fit flex flex-col lg:flex-row justify-between gap-10 lg:gap-x-20 xl:gap-x-40">

        <div className="left w-full lg:w-1/2 flex flex-col justify-center">

          <div className="blog w-fit h-fit px-3 text-sm py-2 rounded-full bg-secondary font-sans">

            THE BLOG

          </div>

          <div className="title text-3xl sm:text-4xl lg:text-5xl mt-5 mb-6 w-full lg:w-3/4 tracking-wide leading-snug font-heading">

            {firstSection?.title}

          </div>

          <div className="date mb-8 font-sans text-sm text-gray-900/60">

            {

              firstSection && (

                format(new Date(firstSection?.createdAt),"PPP")

              )

            }

          </div>

          <Button className="gotobtn w-fit h-fit px-5 text-sm py-3 rounded-lg border-black/30 text-black/50 font-sans" variant={"secondary"}>

            <Link href={`/blogs/${firstSection?._id}`}>

              Read blog -

            </Link>

          </Button>

        </div>

        {firstSection &&(

          <div className="right w-full lg:w-1/2 flex items-center justify-center rounded-lg">

            <Image
              className='rounded-lg w-full h-64 sm:h-80 lg:h-[28rem] object-cover'
              width={1200}
              height={800}
              src={firstSection?.coverImage}
              alt=''
            />

          </div>

        )}

      </div>


      {/* BLOG HEADER */}

      <div className="blog-header mt-24 sm:mt-28 lg:mt-36 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10 sm:mb-16">

        <div className="title text-3xl sm:text-4xl font-heading">

          Latest blogs

        </div>

        <div className="search w-full sm:w-auto font-sans">

          <Search onSearch={setSearch}></Search>

        </div>

      </div>


      {

        search.length>0 ? (

          <div className='wrapper w-full'>

            {

              foundBlog?.map((value)=>(

                <div
                  className="blog grid grid-cols-1 lg:grid-cols-5 h-fit gap-6 lg:gap-x-12 xl:gap-x-20 my-10 lg:my-16"
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

                  <div className="right col-span-1 lg:col-span-3 bg-secondary px-5 py-4 rounded-xl flex flex-col justify-between">

                    <Link href={`/blogs/${value._id}`}>

                      <div className="title text-xl sm:text-2xl max-w-full lg:max-w-11/12 font-heading">

                        {value.title}

                      </div>

                    </Link>

                    <div className="aut-date flex flex-col sm:flex-row justify-between gap-3 mt-5">

                      <div className="author w-fit px-3 py-1 bg-secondary rounded-full text-sm flex items-center gap-x-1 font-sans">

                        <div className="logo flex justify-center">

                          <User size={".8rem"}></User>

                        </div>

                        {value?.authorName}

                      </div>

                      <div className="date w-fit px-3 py-1 bg-secondary rounded-full text-sm font-sans">

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

            {/* SECTION 2 */}

            <div className="sec-2 grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-x-6 w-full h-fit">

              {/* LEFT */}

              <div className="left col-span-1 lg:col-span-4">

                {secondSectionLeft && (

                  <div className="img w-full h-64 sm:h-80 lg:h-[28rem] rounded-2xl object-cover">

                    <Image
                      className='object-cover rounded-2xl h-full w-full'
                      width={1200}
                      height={800}
                      src={secondSectionLeft?.coverImage}
                      alt=''
                    />

                  </div>

                )}

                <Link href={`/blogs/${secondSectionLeft?._id}`}>

                  <div className="title mt-4 text-xl sm:text-2xl lg:text-3xl font-heading">

                    {secondSectionLeft?.title}

                  </div>

                </Link>

                <div className="date text-sm sm:text-lg text-gray-900/60 font-sans">

                  {

                    secondSectionLeft && (

                      format(new Date(secondSectionLeft?.createdAt),"PP")

                    )

                  }

                </div>

              </div>


              {/* RIGHT */}

              <div className="right col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 lg:gap-y-10 px-0 lg:px-10">

                {

                  SecondSetionRight?.map(value=>(

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

                      <div className="date text-gray-900/60 text-sm font-sans">

                        {

                          format(new Date(value?.createdAt),"PP")

                        }

                      </div>

                    </div>

                  ))

                }

              </div>

            </div>


            {/* SECTION 3 */}

            <div className="blogs relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-10 lg:gap-x-16 gap-y-10 mt-16 lg:mt-20">

              {

                thirdSection?.map(value=>(

                  <div className="wrapper col-span-1 h-fit rounded-xl" key={value._id}>

                    <Image
                      src={value.coverImage}
                      alt=''
                      className='h-56 sm:h-72 md:max-h-80 w-full rounded-xl object-cover'
                      height={800}
                      width={1200}
                    />

                    <Link href={`/blogs/${value._id}`}>

                      <div className="title text-lg sm:text-xl mt-4 mb-2 font-heading">

                        {value.title}

                      </div>

                    </Link>

                    <div className="date text-gray-900/60 text-sm font-sans">

                      {

                        format(new Date(value.createdAt), "PP")

                      }

                    </div>

                  </div>

                ))

              }

              <Button
                className="relative md:absolute left-1/2 -translate-x-1/2 mt-5 md:mt-0 md:-bottom-24 px-7 rounded-xl text-base sm:text-lg py-5 sm:py-6 bg-transparent border-black/30 text-black/50 font-sans"
                variant={'secondary'}
              >

                <Link href={'/blogs'}>

                  Read all

                </Link>

              </Button>

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
// import {format} from 'date-fns';
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
//   const [loading,setLoading]=useState<boolean>(true);
//   const [search,setSearch]=useState<string>("");
//   let foundBlog=null;
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
//   const firstSection=posts?.[0];
//   const secondSectionLeft=posts?.[1];
//   const SecondSetionRight=posts?.slice(2,4);
//   const thirdSection=posts?.slice(4,8);
//   foundBlog=posts?.filter((value)=>value.title.toLowerCase().includes(search.toLowerCase()));
//   if(loading) return <CommonLoader></CommonLoader>
//   return (
//     <div className='wrapper w-full min-h-screen relative pb-56 pt-44 px-36'>
//       <div className="top h-fit grid-cols-2 flex justify-between gap-x-40">
//         <div className="left col-span-1 w-full">
//           <div className="blog w-fit h-fit  px-3 text-sm py-2 rounded-full bg-secondary font-sans">THE BLOG</div>
//           <div className="title text-4xl mt-5 mb-6 w-3/4 tracking-wide leading-snug font-medium font-heading">{firstSection?.title}</div>
//           <div className="date mb-8">
//             {
//               firstSection && (
//                 format(new Date(firstSection?.createdAt),"PPP")
//               )
//             }
//           </div>
//           <Button className="gotobtn w-fit h-fit px-5 text-sm py-3 rounded-lg border-black/30 text-black/50" variant={"secondary"}><Link href={`/blogs/${firstSection?._id}`}>Read blog -</Link></Button>

//         </div>  
//         {firstSection &&(
//             <div className="right col-span-1 w-full flex items-center justify-center rounded-lg"><Image className='rounded-lg w-full h-full object-cover'  width={1200} height={800} src={firstSection?.coverImage} alt=''></Image></div>
//         )}
//       </div>
//        {/* blog section */}

//         <div className="blog-header mt-36 flex items-center justify-between mb-16">
//           <div className="title text-4xl">Latest blogs</div>
//           <div className="search"><Search onSearch={setSearch}></Search></div>
//         </div>


//         {
//           search.length>0 ? (
//           <div className='wrapper w-full'>
//              {
//              foundBlog?.map((value)=>(
//               <div className="blog grid grid-cols-5 h-fit gap-x-20 my-16" key={value._id}>
//                 <div className="left col-span-2 bg-sky-200 h-56 rounded-xl">
//                   <Image src={`${value.coverImage}`} alt='' height={800} width={1200} className='w-full h-full object-cover rounded-xl'></Image>
//                 </div>
//                 <div className="right col-span-3 bg-secondary px-5 py-3 rounded-xl">
//                   <Link href={`/blogs/${value._id}`}><div className="title text-2xl max-w-11/12 font-heading">{value.title}</div></Link>
//                   <div className="aut-date flex justify-between mt-3">
//                     <div className="author px-3 py-1 bg-secondary rounded-full text-sm flex items-center gap-x-1">
//                         <div className="logo flex justify-center"><User size={".8rem"}></User></div>
//                          {value?.authorName}
//                     </div>
//                     <div className="date px-3 py-1 bg-secondary rounded-full text-sm">
//                          {
//                            value && (
//                           <div className="flex text-sm items-center gap-x-1">
//                           <CalendarDays size={".8rem"} />
//                           {format(new Date(value.createdAt),"PPP")}
//                       </div>
//                     )
//                         }
//                     </div>
//                   </div>
//                 </div>
//               </div>
//              ))
//              }
//           </div>
//           ) : (
//             <>
//               {/* section 2 */}

//         {/* Left */}
//         <div className="sec-2 grid grid-cols-6 gap-x-6 w-full h-fit">
//           <div className="left col-span-4">
//             {secondSectionLeft && (
//                <div className="img w-full h-3/4 rounded-2xl object-cover"><Image className='object-cover rounded-2xl h-full w-full'width={1200} height={800} src={secondSectionLeft?.coverImage} alt=''></Image></div>
//             )}
//            <Link href={`/blogs/${secondSectionLeft?._id}`}> <div className="title mt-4 text-2xl font-heading">{secondSectionLeft?.title}</div></Link>
//             <div className="date text-lg text-gray-900/60">
//                {
//               secondSectionLeft && (
//                 format(new Date(secondSectionLeft?.createdAt),"PP")
//               )
//             }
//             </div>
//           </div>
          


//           {/* Right */}

//           <div className="right col-span-2 grid grid-rows-2 gap-y-10 px-10">
//             {
//               SecondSetionRight?.map(value=>(
//                 <div className="up row-span-1" key={value._id}>
//               <div className="img h-fit w-full rounded-2xl">
//                   <Image src={value.coverImage} alt='' width={1200} height={800} className='h-40 object-cover w-full rounded-2xl'></Image>
//               </div>
//               <Link href={`/blogs/${value._id}`}><div className="title mt-4 mb-1 max-w-10/12 text-xl font-heading">{value.title}</div></Link>
//               <div className="date text-gray-900/60">
//                  {
//                 format(new Date(value?.createdAt),"PP")
//                   }
//               </div>
//             </div>
//               ))
//             }
//           </div>
//         </div>



//         {/* section 3 */}
//         <div className="blogs relative grid grid-cols-2 gap-x-16 gap-y-8 mt-20">
//           {
//             thirdSection?.map(value=>(
//             <div className="wrapper col-span-1 h-fit rounded-xl" key={value._id}>
//             <Image src={value.coverImage} alt='' className='max-h-80 w-full rounded-xl object-cover' height={800} width={1200}></Image>
//             <Link href={`/blogs/${value._id}`}><div className="title text-xl mt-4 mb-2 font-heading ">{value.title}</div></Link>
//             <div className="date text-gray-900/60">
//             {
//               format(new Date(value.createdAt), "PP")
//             }
//             </div>
//           </div>
//             ))
//           }

//           <Button className="absolute left-1/2 -bottom-24 -translate-x-1/2 px-7 rounded-xl text-lg py-6 bg-transparent border-black/30 text-black/50" variant={'secondary'}><Link href={'/blogs'}>Read all</Link></Button>
//         </div>
//             </>
//           )
//         }

        
//     </div>
//   )
// }

// export default page