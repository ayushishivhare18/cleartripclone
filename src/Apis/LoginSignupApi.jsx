export async function fetchSignup(userInfo) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "ti65fq50h0gi",
          },
          body: JSON.stringify(userInfo),
        }
      );
      return await res.json();
    } catch (error) {
      console.log("couldn't fetch signup api", error);
    }
  }
  
  export async function fetchLogin(userInfo) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "ti65fq50h0gi",
          },
          body: JSON.stringify(userInfo),
        }
      );
      return await res.json();
    } catch (error) {
      console.log("couldn't fetch login api", error);
    }
  }