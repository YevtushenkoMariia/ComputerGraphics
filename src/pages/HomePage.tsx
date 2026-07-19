import { Link } from "react-router-dom";
import { projects } from "../constants/Projects";
import { COLORS } from "../constants/colors";

export default function HomePage() {
  return (
    <>
      <div>
        <header
          style={{ backgroundColor: COLORS.darkBlue }}
          className="h-16 flex items-center justify-center fixed top-0 left-0 right-0 z-10">
          <h1 style={{ color: COLORS.white }} className="text-2xl font-bold">Computer Graphics Projects</h1>
        </header>
        <div className="bg-white mt-16 ">
          <div
            style={{ backgroundColor: COLORS.lightBlue, boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.1)" }}
            className="
          mx-60 grid grid-cols-3 gap-x-8 gap-y-8 p-8 shadow-px-2  h-full max-h-[calc(100vh-80px)] "
          >
            {projects.map((project) => (
              <div
                key={project.name}
                style={{ backgroundColor: COLORS.lightBlue }}
                className=" 
              p-4 hover:bg-blue-50 transition-all 
              duration-300 rounded-lg border-2 border-gray-300"
              >
                <Link
                  to={project.route}
                  key={project.name}
                  className="w-full h-full"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className=" w-full mb-2">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-32 rounded-lg object-cover"
                      />
                    </div>
                    <div className=" w-full">
                      <h2 className="text-2xl font-bold">{project.name}</h2>
                      <p className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
