import "./stories.css"
import jake from "../../assets/img/jake.jpg"
import charles from "../../assets/img/charles.jpeg"
import amy from "../../assets/img/Amy_Santiago.png"
import holt from "../../assets/img/holt.jpeg"
import terry from "../../assets/img/terry.jpeg"
import { useAuth } from '../../context/authContext'; 

const Stories = () => {
  const { user: currentUser } = useAuth(); 

  const stories = [
    {
      id: 1,
      name: "Amy Santiago",
      img: amy,
    },
    {
      id: 2,
      name: "Ray Holt",
      img: holt,
    },
    {
      id: 3,
      name: "Charles Boyle",
      img: charles,
    },
    {
      id: 4,
      name: "Terry Jeffords",
      img: terry,
    },
  ];

  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser.profilePic || jake} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div> 
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories