import { Modal, Stack, Box } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/loginSignup.css";
import { fetchSignup } from "../../Apis/LoginSignupApi";
import { useAuth } from "../../contexts/AuthorizationProvider";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const closeBtn = {
  "&:hover": {
    cursor: "pointer",
    color: "red",
  },
};

const SignupPage = () => {
  const { signupDetails, logSignDetails, tokenDetails } = useAuth();
  const { handleLoginClose, islogin } = logSignDetails;
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isSignup,
    setIsSignup,
  } = signupDetails;
  const { setToken } = tokenDetails;
  const [showPass, setShowPass] = useState(false);
  const [showConstraints, setShowConstraints] = useState(false);

  const handleSignupSubmit = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d@#]{8,}$/;
    if (name && regex.test(email) && passRegex.test(password)) {
      fetchSignup({ name, email, password, appType: "bookingportals" }).then(
        (response) => {
          if (response.status === "success") {
            toast.success("You have registered successfully", {
              theme: "colored",
            });
            localStorage.setItem("token", response.token);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(response?.data?.user)
            );
            setToken(response.token);
            handleSignupClose();
            handleLoginClose();
          } else {
            toast.error("Already you have an accoount , login please", {
              theme: "colored",
            });
          }
          setName("");
          setEmail("");
          setPassword("");
        }
      );
    } else if (email && !regex.test(email)) {
      toast.error("Email is invalid!", { theme: "colored" });
    } else if (password && !passRegex.test(password)) {
      toast.error(
        "Password has to contains 8 character of alphabet and number and special character!",
        {
          theme: "colored",
        }
      );
    } else {
      toast.error("Fill all the details!", { theme: "colored" });
    }
  };

  const handleSignupClose = () => {
    setIsSignup(false);
  };

  const hasUpperCase = () => /[A-Z]/.test(password);

  const hasLowerCase = () => /[a-z]/.test(password);

  const hasNumber = () => /\d/.test(password);

  const hasEightCharacter = () => password.length;

  const hasSpecialChar = () => /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div>
      <Modal
        open={isSignup}
        onClose={() => {
          handleSignupClose();
          handleLoginClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="login-modal">
          <div className="modal-left">
            <img
              src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider2.png"
              alt="login-left-photo"
              width={"100%"}
            />
          </div>
          <div className="modal-right">
            <Stack
              flexDirection={"row"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
              sx={closeBtn}
              onClick={() => {
                handleSignupClose();
                handleLoginClose();
              }}
            >
              <CloseIcon />
            </Stack>
            <div className="registration form">
              <header>Signup</header>
              <form action="#">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div style={{ display: "flex", position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setShowConstraints(true)}
                    required
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: "35%",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPass ? (
                      <VisibilityOffIcon
                        sx={{
                          bgcolor: "white",
                          border: "none",
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{ bgcolor: "white", border: "none" }}
                      />
                    )}
                  </button>
                </div>
                {showConstraints && (
                  <div style={{ fontSize: 12 }}>
                    <p
                      style={{
                        color: hasEightCharacter() >= 8 ? "green" : "red",
                      }}
                    >
                      Password has to contains 8 character
                    </p>
                    <p
                      style={{
                        color: hasUpperCase() ? "green" : "red",
                      }}
                    >
                      At least one Upper case letter(e.g A,B..)
                    </p>
                    <p
                      style={{
                        color: hasLowerCase() ? "green" : "red",
                      }}
                    >
                      At least one Lower case letter(e.g a,b..)
                    </p>
                    <p
                      style={{
                        color: hasNumber() ? "green" : "red",
                      }}
                    >
                      At least one Number(e.g 1,2,3..)
                    </p>
                    <p
                      style={{
                        color: hasSpecialChar() ? "green" : "red",
                      }}
                    >
                      One Special Character(e.g @,#,&..)
                    </p>
                  </div>
                )}
                <input
                  type="button"
                  className="button"
                  value="Signup"
                  onClick={handleSignupSubmit}
                />
              </form>
              <div className="signup">
                <span className="signup">
                  Already have an account?
                  <label htmlFor="check" onClick={() => setIsSignup(false)}>
                    Login
                  </label>
                </span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SignupPage;