"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {format} from 'date-fns'
import { User,CalendarDays,X} from 'lucide-react';
import Image from "next/image";
import {Button} from "@/components/ui/button"
import Link from "next/link";
import { motion } from "framer-motion";
import CommonLoader from "@/components/CommonLoader";
type postContext={
  _id: string,
  title: string,
  authorId: string,
  authorName: string,
  coverImage: string,
  content: string,
  createdAt: string,
  tags: string[]
}
const page =() => {
    const params=useParams();
    const {id}=params;
    const router=useRouter();
    const [post,setPost]=useState<postContext | null>(null);
    const [posts,setPosts]=useState<postContext[] | null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const [summary,setSummary]=useState<string>("");
    const [keyPoints,setKeyPoints]=useState<string[]>([]);
    const [takeaway,setTakeaway]=useState<string>("");
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const [summaryFetched,setSummaryFetched]=useState<boolean>(false);
    const [summaryLoader,setSummaryLoader]=useState<boolean>(false);
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



    // handler to take care of posts

    async function handlerSummarizePost(){
      try{
        setIsOpen(true);
        if(summaryFetched) return;
        setSummaryLoader(true);
        const response=await fetch('/api/posts/summarize',{
          method : "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({
            title: post?.title,
            content: post?.content
          })
        })
        const data=await response.json();

        if(response.ok){
          setSummary(data.data.summary);
          setKeyPoints(data.data.keyPoints);
          setTakeaway(data.data.takeaway);
          setSummaryFetched(true);
        }
      }
      catch(error){
        toast.error("Something went wrong try again");
      }
      finally{
        setSummaryLoader(false);
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
    console.log(summary, "   ",keyPoints, " ", takeaway);
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

      <div className="prose max-w-none mt-8 prose-headings:font-medium prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-7 prose-p:my-3 prose-strong:font-semibold prose-blockquote:font-normal" dangerouslySetInnerHTML={{  __html: post?.content ?? "" }}/>   
      </div>
      <div className="right col-span-1 sticky top-36 h-fit">
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

      <Button size={"lg"} variant={"default"} className="summarize absolute bottom-20 left-1/2 -translate-x-1/2 p-3 rounded-xl" onClick={handlerSummarizePost}>Summarize Post</Button>


      {/* summary div */}
      {isOpen ? (
  <motion.div drag dragMomentum={false} className="summaryWindow fixed z-50 top-10 left-1/2 -translate-x-1/2 w-3/4 h-[85vh] bg-background rounded-2xl overflow-hidden shadow-2xl border">

    {/* Close button */}
    <button
      onClick={() => setIsOpen(false)}
      className="absolute right-4 top-4 z-10 hover:bg-sky-600 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
    >
      <X />
    </button>

    {/* Content / Loader */}
    {summaryLoader ? (
      <div className="w-full h-full flex items-center justify-center">
        <CommonLoader />
      </div>
    ) : (
      <div className="content w-full h-full overflow-y-auto p-8 md:p-10">

        {!summary && keyPoints.length === 0 && !takeaway ? (

          /* Error state */
          <div className="flex min-h-full flex-col items-center justify-center text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
              <X className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight">
              Can't load summarized data
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Something went wrong while generating the summary.
              Refresh the page and try again.
            </p>

          </div>

        ) : (

          /* Actual summary */
          <div className="mx-auto max-w-3xl pb-10">

            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                AI Summary
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                A quick look at this blog
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Generated by AI to help you understand the key ideas faster.
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border bg-background p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">
                Summary
              </h3>

              <p className="text-[15px] leading-7 text-muted-foreground">
                {summary}
              </p>
            </div>

            {/* Key Points */}
            <div className="mt-6 rounded-2xl border bg-background p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold">
                Key Points
              </h3>

              <div className="space-y-4">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex gap-4">

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </div>

                    <p className="text-[15px] leading-6 text-muted-foreground">
                      {point}
                    </p>

                  </div>
                ))}
              </div>
            </div>

            {/* Takeaway */}
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">

              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                The Takeaway
              </p>

              <p className="text-base leading-7">
                {takeaway}
              </p>

            </div>

          </div>
        )}

      </div>
    )}

  </motion.div>
) : null}
      
    </div>
  )
}

export default page