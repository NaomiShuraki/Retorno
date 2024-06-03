import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./aboutUsMain.css";

export const AboutUsMain = () => {
  return (
    <>
      <Box className="constainer-about-m"></Box>
      <Box className="typographyContainer-m">
        <Typography className="typography-m">
          {`Established in 1995, Returno Farm has become a cornerstone for the renowned rehab center, 
          "Returno." In a significant development in May 2022, the farm transitioned into the capable hands of Omri Livni, 
          the esteemed CEO of the Ofek Center, and Nathaniel Kouseks.
Under their stewardship, Returno Farm has flourished into a haven for Western and therapeutic riding services,
 catering to diverse audiences.  Returno 360 Farm has evolved into a warm and welcoming home for hundreds of children, teenagers, and adults.
 Here, they discover not only the joy of riding but also a pathway to excel in various equestrian and handling professions. 
 The farm's commitment to providing a fulfilling experience is evident in its role
 as a nurturing environment for those seeking satisfaction, progress, and a genuine connection with the equestrian world.`}
        </Typography>
      </Box>
    </>
  );
};

export default AboutUsMain;
