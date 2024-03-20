import { useEffect, useState } from "react";


const Service = () => {
  const [services, setServices] = useState([]);
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
        setServices(data.user.services); // Corrected typo
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section service" id="section-services">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Services</div>
        </div>
        {/* service items */}
        <div className="service-items">
          {isLoading ? (
            <div>Loading services...</div>
          ) : error ? (
            <div>Error fetching services: {error.message}</div>
          ) : (
            services.map((service) => (
              <div className="service-col" key={service.id}>
              <div className="service-item content-box">
                <div className="icon">
                  {/* <span className="fas fa-code" /> */}
                  <img src={service.image.url} className="image" style={{width: "160px"}}/>
                </div>
                <div className="name">{service?.name}</div>
                <div className="text">{service?.desc}</div>
                <div style={{marginTop:"1rem"}}><span style={{color:"orange"}}>Charge :</span> {service?.charge}</div>
              </div>
            </div>
            ))
          )}
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default Service;