import { useEffect, useState } from "react";
import Loading from "../../pages/loading";
import { createSkillsDot, dotResize } from "../utils";

export const DesignSkills = () => {
  const [design, setDesign] = useState([]);
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
        setDesign(data?.design); // Corrected typo 
      } catch (error) {
        setError(error.message); // Store the error message
      } finally {
        setIsLoading(false); // Always set loading to false after fetching
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading && <Loading/>}
      {!isLoading && !error && design && (<div className="section skills" id="section-skills">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Design Skills</div>
        </div>
        {/* skills items */}
        <div className="skills percent content-box">
          <ul>
            <li>
              <div className="name">Web Design</div>
              <div className="progress ">
                <div className="percentage" style={{ width: "90%" }}>
                  <span className="percent">90%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="name">Illustrations</div>
              <div className="progress ">
                <div className="percentage" style={{ width: "70%" }}>
                  <span className="percent">70%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="name">Photoshop</div>
              <div className="progress ">
                <div className="percentage" style={{ width: "95%" }}>
                  <span className="percent">95%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="name">Graphic Design</div>
              <div className="progress ">
                <div className="percentage" style={{ width: "85%" }}>
                  <span className="percent">85%</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>)}
    </>
  );
};
export const LanguagesSkills = () => {
  useEffect(() => {
    dotResize();
    setTimeout(createSkillsDot, 1000);
  }, []);
  const [language, setLanguage] = useState([]);
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
        setLanguage(data?.language); // Corrected typo 
      } catch (error) {
        setError(error.message); // Store the error message
      } finally {
        setIsLoading(false); // Always set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  return (
   <>
    {isLoading && <Loading/>}
    {!isLoading && !error && language && ( <div className="section skills" id="section-skills-lang">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Languages Skills</div>
        </div>
        {/* skills items */}
        <div className="skills percent content-box">
          <ul>
            <li>
              <div className="name">English</div>
              <div className="progress">
                <div className="percentage" style={{ width: "90%" }}>
                  <span className="percent">90%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="name">German</div>
              <div className="progress">
                <div className="percentage" style={{ width: "70%" }}>
                  <span className="percent">70%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="name">Italian</div>
              <div className="progress">
                <div className="percentage" style={{ width: "55%" }}>
                  <span className="percent">55%</span>
                </div>
              </div>
            </li>
            <li>
              <div className="name">French</div>
              <div className="progress">
                <div className="percentage" style={{ width: "85%" }}>
                  <span className="percent">85%</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>)}
   </>
  );
};

export const CodingSkills = () => {
  const [skills, setSkills] = useState([]);
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
        const allSkills=data.user.skills;
        allSkills.sort((skl1,skl2)=>skl1.sequence-skl2.sequence)
        setSkills(allSkills); // Assuming skills array is within data.user
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Loading/>}
      {!isLoading && <><div className="section skills" id="section-skills-code">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Coding Skills</div>
        </div>
        {/* skills items */}
        <div className="skills circles content-box">
          <ul>
            {(
              skills.map((skill) => (
                skill.enabled && (
                  <li key={skill._id}>
                  <div className="name">{skill.name}</div>
                  <div className={`progress p${skill.percentage}`}>
                    <div className="percentage">
                      <span className="percent">{skill.percentage}</span>
                      
                    </div>
                    <span><img src={skill.image.url} style={{width:"1.875rem", marginTop:"1.875rem"}}/></span>
                    
                    <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                    </div>
                  </div>
                </li>
                )
              ))
            )}
          </ul>
        </div>
      </div>
    </div></>}
    </>
  );
};

export const KnowledgeSkills = () => {
  const [knowledge, setKnowledge] = useState([]);
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
        setKnowledge(data?.knowledge); // Corrected typo 
      } catch (error) {
        setError(error.message); // Store the error message
      } finally {
        setIsLoading(false); // Always set loading to false after fetching
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading && <Loading/>}
      {!isLoading && !error && knowledge && (<div className="section skills" id="section-skills-know">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Knowledge</div>
        </div>
        {/* skills */}
        <div className="skills list content-box">
          <ul>
            <li>
              <div className="name">Website hosting</div>
            </li>
            <li>
              <div className="name">iOS and android apps</div>
            </li>
            <li>
              <div className="name">Create logo design</div>
            </li>
            <li>
              <div className="name">Design for print</div>
            </li>
            <li>
              <div className="name">Modern and mobile-ready</div>
            </li>
            <li>
              <div className="name">Advertising services include</div>
            </li>
            <li>
              <div className="name">Graphics and animations</div>
            </li>
            <li>
              <div className="name">Search engine marketing</div>
            </li>
          </ul>
        </div>
      </div>
    </div>)}
    </>
  );
};
