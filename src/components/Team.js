import { useEffect, useState } from "react";
import Loading from "../../pages/loading";

const Team = () => {
  const [team, setTeam] = useState([]);
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
        setTeam(data?.team); // Corrected typo 
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
      {!isLoading && team && (
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
      )}
    </>
  );
};
export default Team;
