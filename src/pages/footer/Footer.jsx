import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import "../../styles/footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  otherLinks,
  footerFlightHotelLinks,
} from "../../static-data/footerLinks";
import { toast } from "react-toastify";

const Footer = () => {
  return (
    <Box
      id="home-footer"
      sx={{
        width: "80%",
        m: "0 auto",
        mb: "4rem",
        mt: "2rem",
      }}
    >
      <Stack
        flexDirection={{
          xs: "column",
          md: "row",
        }}
        gap={{
          xs: 2,
          md: 8,
        }}
      >
        <img
          width={250}
          src="/assets/Cleartrip-footer-logo.png"
          alt="footer-cleartrip-logo"
        />
        <Stack
          sx={{
            width: {
              xs: "90%",
              md: "75%",
            },
          }}
          gap={2}
        >
          <ul className="other-links">
            {otherLinks.map((item, indx) => (
              <a href={item.link} key={item.title + indx} target="_blank">
                <li className="hoverStyle">{item.title}</li>
              </a>
            ))}
          </ul>
          <Stack
            flexDirection={{
              xs: "column",
              md: "row",
            }}
            justifyContent={"space-between"}
          >
            <Typography fontSize={"11px"}>
              © 2024 Cleartrip Pvt. Ltd. ·{" "}
              <a
                href="https://www.cleartrip.com/privacy-policy/"
                target="_blank"
                className="footer_item"
              >
                Privacy
              </a>{" "}
              ·{" "}
              <a
                href="https://www.cleartrip.com/security/"
                target="_blank"
                className="footer_item"
              >
                Security
              </a>{" "}
              ·{" "}
              <a
                href="https://www.cleartrip.com/terms/"
                target="_blank"
                className="footer_item"
              >
                Terms of Use
              </a>{" "}
              ·{" "}
              <a
                href="https://www.cleartrip.com/grievance"
                target="_blank"
                className="footer_item"
              >
                Grievance Redressal
              </a>
            </Typography>
            <Stack flexDirection={"row"} gap={2}>
              <Typography>Connect</Typography>
              <a href="https://www.facebook.com/cleartrip" target="_blank">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/cleartrip/" target="_blank">
                <InstagramIcon />
              </a>
              <a href="https://twitter.com/Cleartrip" target="_blank">
                <XIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/cleartrip/"
                target="_blank"
              >
                <LinkedInIcon />
              </a>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* DIVIDER */}
      <Divider sx={{ my: "4rem" }} />
      <div>
        <ul style={{ textAlign: "left" }}>
          {footerFlightHotelLinks.map((footerFlightHotel) => (
            <li
              style={{ marginBottom: 30, listStyleType: "none" }}
              key={footerFlightHotel.title}
            >
              <h4 style={{ color: "	#505050" }}>{footerFlightHotel.title}</h4>
              <Box sx={{ mt: 2 }}>
                {footerFlightHotel.routeLocation.map((location) => (
                  <span
                    key={location.name}
                    style={{
                      marginRight: 20,
                      lineHeight: 2,
                      fontSize: 12,
                      fontWeight: 500,
                      color: "gray",
                    }}
                    className="route_location"
                    onClick={() =>
                      toast.info("Coming soon !", { theme: "colored" })
                    }
                  >
                    {location.name}
                  </span>
                ))}
              </Box>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default Footer;