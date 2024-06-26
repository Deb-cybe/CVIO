import { useEffect, useState } from "react";
import Loading from "../../pages/loading";

const CustomText = () => {
  const [customText, setCustomText] = useState([]);
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
        setCustomText(data?.customText); // Corrected typo 
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
    {!isLoading && customText &&
    (<div className="section custom-text" id="section-custom-text">
    <div className="content">
      {/* title */}
      <div className="title">
        <div className="title_inner">Custom Text</div>
      </div>
      {/* clients items */}
      <div className="content-box">
        <div className="single-post-text">
          <p>
            Now there is more fashion. There is no so-called trends. Now chase
            after anything not necessary — nor for fashionable color nor the
            shape, nor for style. Think about the content that you want to
            invest in a created object, and only then will form. The thing is
            your spirit. A spirit unlike forms hard copy.
          </p>
          <p>
            Here choose yourself like that, without any looking back, do your
            personal, home, small fashion, and all will be well.
          </p>
        </div>
      </div>
      <div className="clear" />
    </div>
  </div>)}
    </>
  );
};
export default CustomText;
