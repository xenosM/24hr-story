import React,{useEffect,useRef} from "react"
import AddStoryBtn from "./Addstory"

function StoryBar(){
    //*References
    const scrollBarRef = useRef(null)
    //*Event Function
    //*Use Effects
    useEffect(
        ()=>{
            const scrollBar = scrollBarRef.current
            const handleScroll = (e)=>{
                 if (scrollBar.scrollWidth > scrollBar.clientWidth) {
                   //Math.sign(x) returns 1 if x is +ve else -1
                   const scrollDirection = Math.sign(e.deltaY);
                   const scrollDistance = 240;
                   scrollBar.scrollLeft += scrollDirection * scrollDistance;
                   e.preventDefault();
                 }
            }
            scrollBar.addEventListener('wheel', handleScroll)
            return(()=>{
                scrollBar.removeEventListener('wheel', handleScroll)
                
            })
        },[]
    )

    return(
        <div  ref={scrollBarRef} id="story-bar-container">
            <AddStoryBtn/>
        </div>
    )
}
export default StoryBar
