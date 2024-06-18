import React from "react";
// import { motion } from "framer-motion";
// import { useRef, useEffect, useState } from "react";

import images from "../../data/images";
import "../styles/projects.css";
import ProjectCard from "../base/projects/ProjectCard";
import Title from "../base/Title";

const projects = [
  {
    name: "My portfolio",
    image: images[0],
    description: "Work exp, education, projects",
    link: "https://www.CJS-portfolio.com",
    tech: "#ReactJS"
  },
  {
    name: "Loterie EC",
    maintenance: false,
    image: images[3],
    description: "dv loterie registering candidate",
    link: "https://dvloteriec.com/",
  },
  {
    name: "My best follow up",
    maintenance: false,
    image: images[1],
    description: "app for diabetic patient follow",
    link: "https://mybestfollowup.org/",
  },
  {
    name: "Ma tension",
    maintenance: false,
    image: images[4],
    description: "app for dabetic patient follow",
    link: "https://admin.jeconnaismatension.org/",
  },

  {
    name: "Venus Pay",
    maintenance: true,
    image: images[2],
    description: "Online payment solution",
    link: "https://venuspay.2si-inc.com/",
    tech: "#Angular"
  },
  {
    name: "Venus SMS",
    maintenance: true,
    image: images[5],
    description: "Online bulk messaging solution",
    link: "https://venussms.2si-inc.com/",
    tech: "#Angular"
  }
];

function Projects() {
  // const [width, setWidth] = useState(0);
  // const carousel = useRef();

  // useEffect(() => {
  //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  // }, []);

  return (
    <div className="container" id="projects">
      <span className="before-title" style={{margin: '0px'}}> This are projects {'i\'ve'} handle </span>
        <Title title="My Projects" className="title title-p" />
      
      <div className="project-container">
        {/* <motion.div
          ref={carousel}
          className="carousel"
          whileTap={{ cursor: "grabbing" }}
        > */}
          {/* <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel"
          > */}
            {projects.map((projectDetails, index) => (
              // <motion.div className="item">
                <ProjectCard
                key={index+"projectDetail"}
                  src={projectDetails.image}
                  alt={projectDetails.name}
                  name={projectDetails.name}
                  description={projectDetails.description}
                  link={projectDetails.link}
                  maintenance = {projectDetails.maintenance}
                  tech = {projectDetails.tech}
                  // children={ <i class="fa fa-github" aria-hidden="true"></i>}
                  className="project-card"
                />
              // </motion.div>
            ))}
          {/* </motion.div> */}
        {/* </motion.div> */}
      </div>
    </div>
  );
}

export default Projects;
