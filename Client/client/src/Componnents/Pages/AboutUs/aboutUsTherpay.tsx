import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./aboutUsTherpay.css";

export const AboutUsForTheraphy = () => {
  return (
    <>
      <Box className="constainer-about-t"></Box>
      <Box className="typographyContainer">
        <Typography className="typography">
          {`Returno farm in collaboration with the health funds 
          provides a solution for professional therapeutic riding 
          for the child's needs.`}
        </Typography>
      </Box>
    </>
  );
};

export default AboutUsForTheraphy;