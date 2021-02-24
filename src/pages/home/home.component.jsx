import Header from "../../components/header/header.component";
import "./home.css";

const Home = () => (
      <div className = "container mx-auto px-2 h-screen" >
         <div className= "py-10">
            <Header />
            <div className="flex py-20">
               <div className="flex-grow-0 w-5/12">
                  <h2 className="textColor text-7xl leading-tight font-medium">Explore <span className="brandColor">New Ways</span> to <span className="brandColor">VOTE</span></h2>
                  <p className="py-3 subtext">A solo project that combines the idea of the blockchain technology to improve the fundamental right of any individual (The rights to VOTE).</p>
                  <div className="flex space-x-5 py-4">
                     <div>
                        <button className="rounded-full py-3 px-6 btn">Create Election</button>
                     </div>
                     <div>
                        <button className="rounded-full py-3 px-6 btn">Login</button>
                     </div>
                  </div>
               </div>
               <div className="flex-grow-0 w-2/3">
                  
               </div>
            </div>
         </div>
      </div>
);

export default Home;
