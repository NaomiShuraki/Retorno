import Image from "material-ui-image";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./aboutUsForRidders.css";

export const AboutUsForRidders = () => {
  return (
    <>
      <Box className="constainer-about"></Box>
      <Box className="typographyContainer">
        <Typography className="typography">
          {`The riding school at Returno 360 Farm in collaboration with Ofek Center
           is focuses on providing Outer and inner shell for the development
           of the rider in a variety of riding and training professions.`}
        </Typography>
      </Box>
    </>
  );
};

export default AboutUsForRidders;
