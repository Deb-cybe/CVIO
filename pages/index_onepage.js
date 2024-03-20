import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CustomText from "../src/components/CustomText";
import Interests from "../src/components/Interests";
import ResumeSection from "../src/components/ResumeSection";
import Service from "../src/components/Service";
import { CodingSkills, DesignSkills, KnowledgeSkills, LanguagesSkills } from "../src/components/Skills";
import Testimonials from "../src/components/Testimonials";
import TypingAnimation from "../src/components/TypingAnimation";
import Layout from "../src/layout/Layout";
import Loading from "./loading";
const ItemIsotope = dynamic(() => import("../src/components/ItemIsotope"), {
  ssr: false,
});
const IndexOnePage = () => {
  const [userData, setUserData] = useState(null);
  const [personalData, setPersonalData] = useState(null); 
  const [timeline, setTimeline] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 
 
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [typingData,setTypingData]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const userTimeline = data.user.timeline;
        setUserData(data.user.about);
        setPersonalData(data.user);

        // Process and sort timeline data
        const exp = userTimeline.filter((item) => !item.forEducation).sort((a, b) => a.sequence - b.sequence);
        const edn = userTimeline.filter((item) => item.forEducation).sort((a, b) => a.sequence - b.sequence);

        setTimeline(userTimeline); // For potential future use
        setExperience(exp);
        setEducation(edn);

        setIsLoading(false);
        setTypingData(splitStringToArray(data.user.about.subTitle));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const formatDate=(start,end)=>{
    var startDate = new Date(start);
    var endDate = new Date(end);

    // Get the current year
    var currentYear = new Date().getFullYear();

    // Format the date range
    var dateRange;

    if (endDate.getFullYear() === currentYear) {
        // If the end year is the current year, show "present"
        return dateRange = startDate.getFullYear() + " - present";
    } else {
        // Otherwise, show the end year
        return dateRange = startDate.getFullYear() + " - " + endDate.getFullYear();
    }
  }
  function splitStringToArray(str) {
    // Split the string using commas and spaces as delimiters (", ")
    const splitArray = str.split(", ");
  
    // Extract the first element (without modification)
    const firstSkill = splitArray.shift();
  
    // Prepend "I develop" to remaining elements and trim leading/trailing spaces
    const remainingSkills = splitArray.map(skill => `I develop <strong>${skill.trim()}</<strong>`);
  
    // Combine the first skill and modified skills
    return [firstSkill, ...remainingSkills];
  }
  return ( 
    <>
    {isLoading && <Loading/>}
    {!isLoading && 
    (
      <>
    <Layout > 
      {/* Wrapper */}
      <div className="wrapper">
        {/* Section Started */}
        <div className="section started" id="section-started">
          {/* background */}
          <div
            className="video-bg jarallax"
            style={{ backgroundImage: `url(${userData.avatar.url})` }}
          >
            <div className="video-bg-mask" />
            <div className="video-bg-texture" id="grained_container" />
          </div>
          {/* started content */}
          <div className="centrize full-width">
            <div className="vertical-center">
              <div className="started-content">
              <h1 className="h-title">
                Hello, {`I’m`} <strong>{userData?.name}</strong>, {userData?.title} <br/>Based in {userData?.address}.
              </h1>
                <TypingAnimation extraClassName={"typed-subtitle"} typingData={typingData}/>
                <span className="typed-subtitle" />
              </div>
            </div>
          </div>
          {/* mosue button */}
          <a href="#" className="mouse_btn" style={{ display: "none" }}>
            <span className="icon fas fa-chevron-down" />
          </a>
        </div>
        {/* Section About */}
        <div className="section about" id="section-about">
          {/* title */}
          <div className="title">
            <div className="title_inner">About</div>
          </div>
          <div className="content content-box">
            {/* image */}
            <div className="image">
              <img src={userData.alternateAvatars.length>0?userData.alternateAvatars[0]:userData.avatar.url} alt="" />
            </div>
            {/* desc */}
            <div className="desc">
              <p>
                Hello! I’m {userData?.name}.{userData?.subTitle}.<br/>{userData?.description}
              </p>
              <div className="info-list">
                <ul>
                  <li>
                    <strong>Age:</strong> 24
                  </li>
                  <li>
                    <strong>Residence:</strong> USA
                  </li>
                  <li>
                    <strong>Freelance:</strong> Available
                  </li>
                  <li>
                    <strong>Address:</strong> {userData?.address}
                  </li>
                  <li>
                    <strong>Phone:</strong> {userData?.phoneNumber}
                  </li>
                  <li>
                    <strong>E-mail:</strong> {personalData?.email}
                  </li>
                </ul>
              </div>
              <div className="bts">
                <a href="#" className="btn hover-animated">
                  <span className="circle" />
                  <span className="lnk">Download CV</span>
                </a>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        {/* Section Service */}
        <Service/>
        {/* Section Pricing */}
        {
          personalData.hasOwnProperty("pricing") && (
            <div className="section pricing" id="section-pricing">
          <div className="content">
            {/* title */}
            <div className="title">
              <div className="title_inner">Pricing Table</div>
            </div>
            {/* pricing items */}
            <div className="pricing-items">
              <div className="pricing-col">
                <div className="pricing-item content-box">
                  <div className="icon">
                    <span className="fas fa-star" />
                  </div>
                  <div className="name">Basic</div>
                  <div className="amount">
                    <span className="number">
                      <span className="dollar">$</span>
                      <span>39</span>
                      <span className="period">hour</span>
                    </span>
                  </div>
                  <div className="feature-list">
                    <ul>
                      <li>Web Development</li>
                      <li>Advetising</li>
                      <li>Game Development</li>
                      <li className="disable">Music Writing</li>
                      <li className="disable">Photography</li>
                    </ul>
                  </div>
                  <div className="bts">
                    <a href="#" className="btn hover-animated">
                      <span className="circle" />
                      <span className="lnk">Buy Now</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pricing-col">
                <div className="pricing-item content-box">
                  <div className="icon">
                    <span className="fas fa-rocket" />
                  </div>
                  <div className="name">Premium</div>
                  <div className="amount">
                    <span className="number">
                      <span className="dollar">$</span>
                      <span>59</span>
                      <span className="period">hour</span>
                    </span>
                  </div>
                  <div className="feature-list">
                    <ul>
                      <li>Web Development</li>
                      <li>Advetising</li>
                      <li>Game Development</li>
                      <li>Music Writing</li>
                      <li>
                        Photography <strong>new</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="bts">
                    <a href="#" className="btn hover-animated">
                      <span className="circle" />
                      <span className="lnk">Buy Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          ) 
        }
        
        {/* Section Resume */}
        <ResumeSection/>
        {/* Section Design Skills */}
        <DesignSkills/>
        {/* Section Languages Skills */}
        <LanguagesSkills/>
        {/* Section Coding Skills */}
        <CodingSkills />
        {/* Section Knowledge Skills */}
        <KnowledgeSkills/>
        {/* Section Interests */}
        <Interests/>
        {/* Section Team */}
        {
          personalData.team && (
            <div className="section team" id="section-team">
          <div className="content">
            {/* title */}
            <div className="title">
              <div className="title_inner">Our Team</div>
            </div>
            {/* team items */}
            <div className="team-items">
              <div className="team-col">
                <div className="team-item content-box">
                  <div className="image">
                    <img src="images/team1.jpg" alt="" />
                  </div>
                  <div className="desc">
                    <div className="name">Alejandro Abeyta</div>
                    <div className="category">Web Developer</div>
                    <div className="soc">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.pinterest.com/"
                      >
                        <span className="icon fab fa-pinterest" />
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/"
                      >
                        <span className="icon fab fa-instagram" />
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://dribbble.com/"
                      >
                        <span className="icon fab fa-dribbble" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-col">
                <div className="team-item content-box">
                  <div className="image">
                    <img src="images/team2.jpg" alt="" />
                  </div>
                  <div className="desc">
                    <div className="name">Peter Green</div>
                    <div className="category">Back-end Developer</div>
                    <div className="soc">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.pinterest.com/"
                      >
                        <span className="icon fab fa-pinterest" />
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/"
                      >
                        <span className="icon fab fa-instagram" />
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://dribbble.com/"
                      >
                        <span className="icon fab fa-dribbble" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          )
        }
        {/* Section Testimonials */}
        <Testimonials />
        {/* Section Clients */}
        {personalData.clients && (
          <div className="section clients" id="section-clients">
          <div className="content">
            {/* title */}
            <div className="title">
              <div className="title_inner">Clients</div>
            </div>
            {/* clients items */}
            <div className="content-box">
              <div className="clients-items">
                <div className="clients-col">
                  <div className="clients-item">
                    <a target="_blank" rel="noreferrer" href="#">
                      <img src="images/client1.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="clients-col">
                  <div className="clients-item">
                    <a target="_blank" rel="noreferrer" href="#">
                      <img src="images/client3.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="clients-col">
                  <div className="clients-item">
                    <a target="_blank" rel="noreferrer" href="#">
                      <img src="images/client2.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="clients-col">
                  <div className="clients-item">
                    <a target="_blank" rel="noreferrer" href="#">
                      <img src="images/client4.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        )}
        {/* Section Custom Text */}
        <CustomText/>
        {/* Works */}
        <div className="section works" id="section-portfolio">
          <div className="content">
            {/* title */}
            <div className="title">
              <div className="title_inner">Portfolio</div>
            </div>
            <ItemIsotope />
            <div className="clear" />
          </div>
        </div>
        {/* Section Contacts Info */}
        <div className="section contacts" id="section-contacts">
          <div className="content">
            {/* title */}
            <div className="title">
              <div className="title_inner">Contacts</div>
            </div>
            {/* contacts items */}
            <div className="service-items">
              <div className="service-col">
                <div className="service-item content-box">
                  <div className="icon">
                    <span className="fas fa-phone" />
                  </div>
                  <div className="name">Phone</div>
                  <div className="text">+ (231) 456 67 89</div>
                </div>
              </div>
              <div className="service-col">
                <div className="service-item content-box">
                  <div className="icon">
                    <span className="fas fa-envelope" />
                  </div>
                  <div className="name">Email</div>
                  <div className="text">
                    <a href="mailto:steve-pearson@gmail.com">
                      steve-pearson@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="service-col">
                <div className="service-item content-box">
                  <div className="icon">
                    <span className="fas fa-map-marker-alt" />
                  </div>
                  <div className="name">Address</div>
                  <div className="text">2621 W Pico Blvd, Los Angeles</div>
                </div>
              </div>
              <div className="service-col">
                <div className="service-item content-box">
                  <div className="icon">
                    <span className="fas fa-user-tie" />
                  </div>
                  <div className="name">Freelance Available</div>
                  <div className="text">I am available for Freelance hire</div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        {/* Section Contacts Form */}
        <div className="section contacts" id="section-contacts-form">
          <div className="content">
            {/* title */}
            <div className="title">
              <div className="title_inner">Hire Me</div>
            </div>
            {/* form */}
            <div className="contact_form content-box">
              <form id="cform" method="post">
                <div className="group-val">
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="group-val">
                  <input type="email" name="email" placeholder="Email" />
                </div>
                <div className="group-val ct-gr">
                  <textarea
                    name="message"
                    placeholder="Message"
                    defaultValue={""}
                  />
                </div>
                <div className="group-bts">
                  <button type="submit" className="btn hover-animated">
                    <span className="circle" />
                    <span className="lnk">Send Message</span>
                  </button>
                </div>
              </form>
              <div className="alert-success">
                <p>Thanks, your message is sent successfully.</p>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
        {/* Section Started */}
        <div className="section started section-title" id="section-map">
          {/* background */}
          <div className="video-bg">
            <div className="map" id="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d136834.1519573059!2d-74.0154445224086!3d40.7260256534837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1639991650837!5m2!1sen!2sbd"
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div className="video-bg-mask" />
            <div className="video-bg-texture" id="grained_container" />
          </div>
        </div>
      </div>
    </Layout>
    </>
    )
}
  </>
  );
};
export default IndexOnePage;
