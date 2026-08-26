"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {format} from 'date-fns'
import { User,CalendarDays} from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import CommonLoader from "@/components/CommonLoader";
type postContext={
  _id: string,
  title: string,
  authorId: string,
  authorName: string,
  coverImage: string,
  content: string,
  createdAt: string,
  tags: [string]
}
const page =() => {
    const params=useParams();
    const {id}=params;
    const router=useRouter();
    const [post,setPost]=useState<postContext | null>(null);
    const [posts,setPosts]=useState<postContext[] | null>(null);
    const [loading,setLoading]=useState<boolean>(true);

    // async function to get all the posts
    

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

    // async function to get the post
    async function handlerGetPost(){
      try{
        const response=await fetch(`/api/posts/${id}`);
        const data=await response.json();
        if(!response.ok){
          toast.error(data.error);
          router.push('/');
        }
        else{
          setPost(data.data);
        }
      }
      catch(error){
        console.log("Something went wrong :",error);
      }
    }

  useEffect(() => {
  const loadData = async () => {
    setLoading(true);

    await Promise.all([
      handlerGetPost(),
      handlerGetPosts()
    ]);

    setLoading(false);
  };

  loadData();
}, [id]);


    const tags=post?.tags
    const extraPosts=posts?.filter(value=>value._id!==post?._id).slice(0,3);
    console.log(extraPosts);
    if(loading) return <CommonLoader></CommonLoader>
  return (
    <div className=" wrapper w-full min-h-screen relative pb-56 pt-44 pl-36 pr-16 grid grid-cols-4 gap-x-16 items-start">
      <div className="left col-span-3">

{/* title */}

        <div className="title text-4xl font-medium">
          {post?.title}
        </div>


{/* author date info */}
        <div className="author-data flex items-center justify-between w-full mt-4">
         <div className="author px-3 py-1 bg-[#efe8de] rounded-full text-sm flex items-center gap-x-1">
          <div className="logo flex justify-center"><User size={".8rem"}></User></div>
          {post?.authorName}
        </div>
          <div className="date px-3 py-1 bg-[#efe8de] rounded-full text-sm">
            {
              post && (
                <div className="flex text-sm items-center gap-x-1">
                <CalendarDays size={".8rem"} />
                {format(new Date(post.createdAt),"PPP")}
                </div>
              )
            }
          </div>
        </div>

           {/* image */}
      <div className="image w-full h-96 mt-7 rounded-2xl">
        {post &&(
            <Image src={`${post?.coverImage}`} className="w-full h-full rounded-2xl object-cover" height={800} width={1200} alt=""></Image>
        )}
      </div>
           {/* Content */}

      <div className="prose max-w-none mt-8" dangerouslySetInnerHTML={{  __html: post?.content ?? "" }}/>   
      </div>
      <div className="right col-span-1 sticky top-44 h-fit">
        <div className="tags">
          <div className="title mb-4 text-xl font-semibold">All Tags</div>
          <div className="flex flex-wrap gap-3">
            {
              tags?.map(value=>(
                <div key={value} className="rounded-full bg-[#efe8de] px-3 py-1 text-sm text-gray-700 shadow-sm">{value}</div>
              ))
            }
          </div>
        </div>
        <div className="posts w-full bg-secondary py-4 px-2 mt-5 rounded-sm">
          <div className="title">More Blogs</div>
          {
            extraPosts?.map(value=>(
              <Link href={`/blogs/${value._id}`} key={value.title}>
                 <div className="post w-full grid grid-cols-4 gap-x-1 h-fit my-7">
                <div className="left col-span-1 w-full h-12 rounded-lg">
                  <Image src={`${value.coverImage}`} alt="" height={800} width={800} className="size-full rounded-lg"></Image>
                </div>
                <div className="right col-span-3 ml-2">
                  <div className="date flex text-xs items-center gap-x-2">
                    <CalendarDays size={'.8rem'}></CalendarDays>
                    {format(new Date(value.createdAt),"PP")}
                  </div>
                  <div className="title text-sm font-medium mt-1">{value.title}</div>
                </div>
              </div>
              </Link>
            ))
          }
        </div>
      </div>

      
    </div>
  )
}

export default page