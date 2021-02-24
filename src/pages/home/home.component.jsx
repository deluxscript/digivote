import Header from "../../components/header/header.component";
import "./home.css";

const Home = () => (
      <div className = "container mx-auto" >
         <div>
            <Header />
            <div className="flex py-20 content-center context md:flex-1">
               <div className="flex-grow-0 w-5/12">
                  <h2 className="textColor text-7xl leading-tight font-medium">Explore <span className="brandColor">New Ways</span> to <span className="brandColor">VOTE</span></h2>
                  <p className="py-3 subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed porta turpis. Sed rhoncus massa feugiat ultricies ultrices. Suspendisse egestas augue quis felis varius.</p>
                  <div className="flex space-x-5 py-4">
                     <div>
                        <button className="rounded-full py-3 px-6 btn">Create Election</button>
                     </div>
                     <div>
                        <button className="rounded-full py-3 px-6 btn">Login</button>
                     </div>
                  </div>
               </div>
               <div className="flex-grow-0 w-2/3 electionBg"></div>
            </div>
         </div>
      </div>
);

export default Home;
