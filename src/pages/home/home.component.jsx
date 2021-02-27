import Header from "../../components/header/header.component";
import "./home.css";

const Home = () => (
      <div className = "container mx-auto" >
         <div>
            <Header />
            <div className="flex flex-col-reverse md:flex-row content-center context px-6 lg:px-0 md:py-20">
               <div className="flex-grow-0 md:w-3/6 lg:w-5/12">
                  <h2 className="textColor text-xl md:text-4xl lg:text-7xl leading-tight font-medium">Explore <span className="brandColor">New Ways</span> to <span className="brandColor">VOTE</span></h2>
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
               <div className="flex-grow-0 md:w-3/6 lg:w-2/3 bg-contain h-100 md:bg-center electionBg"></div>
            </div>
         </div>
      </div>
);

export default Home;
