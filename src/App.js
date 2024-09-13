import "./styles/App.css";
import SideNavbar from "./components/flightPage/navbarSection/SideNavbar";
import Navbar from "./components/flightPage/navbarSection/Navbar";
import Flight from "./pages/flight/Flight";
import { Divider, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthorizationProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/footer/Footer";

function App() {
  const { pathname } = useLocation();
  const { logSignDetails } = useAuth();
  const { handleLoginOpen } = logSignDetails;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        {/* NAVBAR */}
        <Navbar handleLoginOpen={handleLoginOpen} />
        {/* MAIN CONTENT OR DIFFERENT ROUTE DISPLAY */}
        <Stack
          sx={{
            flexDirection: {
              xxs: "column",
              xs: "column",
              sm: "row",
            },
          }}
          className="home-main"
        >
          <SideNavbar />
          {pathname === "/" ? (
            <Flight />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Outlet />
            </div>
          )}
        </Stack>

        {/* FOOTER */}
        <div style={{ backgroundColor: "#F7F7F7",}}>
        {/* DIVIDER */}
        <Divider sx={{ my: "4rem" }} />
        <Footer />
        </div>
        {/* TOAST_CONATINER */}
        <ToastContainer />
      </div>
    </LocalizationProvider>
  );
}

export default App;