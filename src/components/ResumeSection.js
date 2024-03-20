import React, { useEffect, useState } from 'react';

const ResumeSection = () => {
  const [timeline, setTimeline] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const userTimeline = data.user.timeline;

        // Process and sort timeline data
        const exp = userTimeline.filter((item) => !item.forEducation).sort((a, b) => a.sequence - b.sequence);
        const edn = userTimeline.filter((item) => item.forEducation).sort((a, b) => a.sequence - b.sequence);

        setTimeline(userTimeline); // For potential future use
        setExperience(exp);
        setEducation(edn);
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

  return (
    <div className="section resume" id="section-history">
      <div className="content">
        <div className="cols">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="col col-md">
              <div className="title">
                <div className="title_inner">Experience</div>
              </div>
              <div className="resume-items">
                {/* Map experience items here */}
                {experience.map((item) => (
                  item.enabled && (
                    <div className="resume-item content-box active" key={item._id}>
                    <div style={{display:"flex", alignItems:"center"}}>

                    {("icon" in item) && (<img src={item?.icon?.url} style={{width:"2.5rem", marginRight:"0.5rem"}}/>)}
                    <div className="date">{formatDate(item.startDate, item.endDate)}</div>
                    </div>
                    <div className="name">{item.company_name},  {item.jobLocation}</div>
                    <div className="text">{item.summary}</div>
                    <ul>
                      <h5 className='name'style={{color:"lightblue"}}>Activities</h5>
                    {item.bulletPoints.map((point) => (
                      <li key={point}>{point.replace(/\n/g, '')}</li>
                    ))}
                  </ul>
                  </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="col col-md">
              <div className="title">
                <div className="title_inner">Education</div>
              </div>
              <div className="resume-items">
                {/* Map education items here */}
                {education.map((item) => (
                  item.enabled && (
                    <div className="resume-item content-box" key={item._id}>
                    <div style={{display:"flex", alignItems:"center"}}>

                    {("icon" in item) && (<img src={item?.icon?.url} style={{width:"2.5rem", marginRight:"0.5rem"}}/>)}
                    <div className="date">{formatDate(item.startDate, item.endDate)}</div>
                    </div>
                    <div className="name">{item.company_name },  {item.jobLocation}</div>
                    {/* Use company_name if available, otherwise use icon url */}
                    <div className="text">{item.summary}</div>
                    <ul>
                      <h5 className='name'style={{color:"lightblue"}}>Activities</h5>
                    {item.bulletPoints.map((point) => (
                      <li key={point}>{point.replace(/\n/g, '')}</li>
                    ))}
                  </ul>
                  </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;
