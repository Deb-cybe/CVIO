import Isotope from "isotope-layout";
import { Fragment, useEffect, useRef, useState } from "react";
import Loading from "../../pages/loading";
import { parallax } from "../utils";
const ItemIsotope = () => {

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const projs=data.user.projects;
        const sortedProjects = projs.sort((project1, project2) => {
          return project1.sequence - project2.sequence;
        }); 
        setProjects(sortedProjects); // Assuming skills array is within data.user
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    parallax();
  }, []);

  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("box-item");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".portfolio-items", {
        itemSelector: ".box-item",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".box-item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "glitch-effect" : "");

  useEffect(() => {
    const circle = document.querySelectorAll(".circle");
    circle.forEach((e) => {
      e.addEventListener("mouseenter", (m) => {
        console.log(
          m.pageY,
          e.offsetParent.offsetParent.offsetParent.offsetParent.offsetLeft,
          e.offsetTop
        );
        if (!e.getElementsByClassName("ink")[0]) {
          const span = document.createElement("span");
          span.classList.add("ink");
          e.appendChild(span);
          span.classList.add("ink-animate");
          // span.style.height = `${e.clientHeight}px`;
          // span.style.width = `${e.clientWidth}px`;
          // span.style.top = `${m.pageY - e.offsetTop - e.clientHeight / 2}px`;
          // span.style.left = `${m.pageX - e.offsetLeft - e.clientWidth / 2}px`;
        }
      });
      e.addEventListener("mouseleave", (m) => {
        const span = document.querySelector(".ink");
        if (span) {
          span.classList.remove("ink-animate");
        }
      });
    });
  }, []);

  return (
    <>
      {isLoading && <Loading/>}
      {!isLoading && 
        <Fragment>
        {/* portfolio filter */}
        <div className="filter-menu content-box">
          <div className="filters">
            <div className="btn-group">
              <label
                data-text="All"
                className={`c-pointer ${activeBtn("box-item")}`}
                onClick={handleFilterKeyChange("box-item")}
              >
                <input type="radio" name="fl_radio" defaultValue=".box-item" />
                All
              </label>
            </div>
            <div className="btn-group">
              <label
                className={`c-pointer ${activeBtn("f-video")}`}
                onClick={handleFilterKeyChange("f-video")}
                data-text="Video"
              >
                <input type="radio" name="fl_radio" defaultValue=".f-video" />
                Video
              </label>
            </div>
            <div className="btn-group">
              <label
                className={`c-pointer ${activeBtn("f-music")}`}
                onClick={handleFilterKeyChange("f-music")}
                data-text="Music"
              >
                <input type="radio" name="fl_radio" defaultValue=".f-music" />
                Music
              </label>
            </div>
            <div className="btn-group">
              <label
                className={`c-pointer ${activeBtn("f-links")}`}
                onClick={handleFilterKeyChange("f-links")}
                data-text="Links"
              >
                <input type="radio" name="fl_radio" defaultValue=".f-links" />
                Links
              </label>
            </div>
            <div className="btn-group">
              <label
                className={`c-pointer ${activeBtn("f-image")}`}
                onClick={handleFilterKeyChange("f-image")}
                data-text="Image"
              >
                <input type="radio" name="fl_radio" defaultValue=".f-image" />
                Image
              </label>
            </div>
            <div className="btn-group">
              <label
                className={`c-pointer ${activeBtn("f-gallery")}`}
                onClick={handleFilterKeyChange("f-gallery")}
                data-text="Gallery"
              >
                <input type="radio" name="fl_radio" defaultValue=".f-gallery" />
                Gallery
              </label>
            </div>
            <div className="btn-group">
              <label
                className={`c-pointer ${activeBtn("f-content")}`}
                onClick={handleFilterKeyChange("f-content")}
                data-text="Content"
              >
                <input type="radio" name="fl_radio" defaultValue=".f-content" />
                Content
              </label>
            </div>
          </div>
        </div>
        {/* portfolio items */}
        <div className="box-items portfolio-items">
          {
            projects.map((project)=>{
              if((filterKey=="box-item" || filterKey=="f-gallery") && project.hasOwnProperty("gallery")){
                return(
                  <div className="box-item f-gallery">
            {" "}
            {/* add class "animate-to-page" if need animated transition to page and delete target="_blank" rel="noreferrer" */}
            <div className="image">
              <a href="#gallery-1" className="has-popup-gallery hover-animated">
                <img src="images/work1.jpg" className="wp-post-image" alt="" />
                <span className="info circle">
                  <span className="centrize full-width">
                    <span className="vertical-center">
                      <span className="icon fas fa-images" />
                      <span className="desc">
                        <span className="category">Gallery</span>
                        <span className="name">{project.title}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
              {/* Sample links for now */}
              <div id="gallery-1" className="mfp-hide">
                <a href="images/work1.jpg" />
                <a href="images/work2.jpg" />
                <a href="images/work3.jpg" />
                <a href="images/work4.jpg" />
              </div>
            </div>
                </div>
                )
              }
              if((filterKey=="box-item" || filterKey=="f-image") &&  project.hasOwnProperty("image")){
                return(
                  <div className="box-item f-image" key={project._id}>
            <div className="image">
              <a
                href={project.image.url}
                className="has-popup-image hover-animated"
              >
                <img src={project.image.url} className="wp-post-image" alt="" />
                <span className="info circle">
                  <span className="centrize full-width">
                    <span className="vertical-center">
                      <span className="icon fas fa-image" />
                      <span className="desc">
                        <span className="category">Image</span>
                        <span className="name">{project.title}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
            {project.hasOwnProperty("techStack") && project.techStack.length > 0 && (
              <div className="tech-stack">
                <span>Tech Stack:</span>
                {project.techStack.map((tech) => ( 
                  <div className="techstacks">
                    <p key={tech} className="tech-item">{tech}</p>
                  </div> 
                ))}
                {/* <div> */}
                  {project.hasOwnProperty("githuburl") && project.githuburl.trim()!=="" && (<div><span className="git_url">Github url : {project.githuburl}</span></div>)}
                  {project.hasOwnProperty("githuburl") && project.liveurl.trim()!=="" && (<div><span className="git_url">Live url : {project.liveurl}</span></div>)}
                {/* </div> */}
              </div>
            )}
                </div>
                )
              }
              if((filterKey=="box-item" || filterKey=="f-video") && project.hasOwnProperty("video")){
                return(
                  //Sample data for now
                  <div className="box-item f-video">
            <div className="image">
              <a
                href={project.video.url}
                className="has-popup-video hover-animated"
              >
                <img src="images/work2.jpg" className="wp-post-image" alt="" />
                <span className="info circle">
                  <span className="centrize full-width">
                    <span className="vertical-center">
                      <span className="icon fas fa-video" />
                      <span className="desc">
                        <span className="category">Video</span>
                        <span className="name">{project.title}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
          </div>
                )
              }
              if((filterKey=="box-item" || filterKey=="f-music") && project.hasOwnProperty("music")){
                return(
                  <div className="box-item f-music">
            <div className="image">
              <a
                href={project.music.url}
                className="has-popup-music hover-animated"
              >
                <img src="images/work6.jpg" className="wp-post-image" alt="" />
                <span className="info circle">
                  <span className="centrize full-width">
                    <span className="vertical-center">
                      <span className="icon fas fa-music" />
                      <span className="desc">
                        <span className="category">Music</span>
                        <span className="name">{project.title}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
                </div>
                )
              }
              if((filterKey=="box-item" || filterKey=="f-content") && project.hasOwnProperty("content")){
                return(
                  <div className="box-item f-content">
            <div className="image">
              <a href="#popup-1" className="has-popup-media hover-animated">
                <img src="images/work8.jpg" className="wp-post-image" alt="" />
                <span className="info circle">
                  <span className="centrize full-width">
                    <span className="vertical-center">
                      <span className="icon fas fa-plus" />
                      <span className="desc">
                        <span className="category">Content</span>
                        <span className="name">{project.title}</span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
            <div id="popup-1" className="popup-box mfp-fade mfp-hide">
              <div className="content">
                <div
                  className="image"
                  style={{ backgroundImage: "url(images/work8.jpg)" }}
                />
                <div className="desc single-post-text">
                  <div className="category">Content</div>
                  <h4>{project.content.title}</h4>
                  <p>
                    {project.content.description}
                  </p>
                  <ul>
                    <li>
                      Now there is more fashion. There is no so-called trends.
                    </li>
                    <li>
                      Now chase after anything not necessary — nor for fashionable
                      color nor the shape, nor for style.
                    </li>
                    <li>
                      Think about the content that you want to invest in a created
                      object, and only then will form.
                    </li>
                    <li>
                      The thing is your spirit. A spirit unlike forms hard copy.
                    </li>
                  </ul>
                  <p>
                    Now there is more fashion. There is no so-called trends. Now
                    chase after anything not necessary — nor for fashionable color
                    nor the shape, nor for style. Think about the content that you
                    want to invest in a created object, and only then will form.
                    The thing is your spirit. A spirit unlike forms hard copy.
                  </p>
                  <Link href={project.content.url}>
                    <a className="btn hover-animated">
                      <span className="circle" />
                      <span className="lnk">View Project</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
                )
              }
              if((filterKey=="box-item" || filterKey=="f-links") && project.hasOwnProperty("links")){
                return(
                  <div className="box-item f-links">
            <div className="image">
              <a
                href={project.links.url}
                className="has-popup-link hover-animated"
                target="_blank"
                rel="noreferrer"
              >
                <img src="images/work3.jpg" className="wp-post-image" alt="" />
                <span className="info circle">
                  <span className="centrize full-width">
                    <span className="vertical-center">
                      <span className="icon fas fa-link" />
                      <span className="desc">
                        <span className="category">{project.title}</span>
                        <span className="name">Nike Red</span>
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </div>
          </div>
                )
              }
            })
          }
        </div>
      </Fragment>
      }
    </>
  );
};
export default ItemIsotope;
