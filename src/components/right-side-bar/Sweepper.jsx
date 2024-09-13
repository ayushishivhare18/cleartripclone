import React from "react";
import { MobileStepper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const Sweepper = ({ activeStep, handleNext, handleBack, maxSteps }) => {
  const theme = useTheme();

  return (
    <div id="sweepper">
      <MobileStepper
        className="css-rh92k-MuiPaper-root-MuiMobileStepper-root"
        position="static"
        steps={maxSteps}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft htmlColor="#B3B3B3" />
            ) : (
              <KeyboardArrowRight htmlColor="#B3B3B3" />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight htmlColor="#B3B3B3" />
            ) : (
              <KeyboardArrowLeft htmlColor="#B3B3B3" />
            )}
          </Button>
        }
      />
    </div>
  );
};

export default Sweepper;