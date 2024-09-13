export async function fetchAirportNames() {
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/airport",
        {
          method: "GET",
          headers: {
            projectID: "ti65fq50h0gi",
          },
        }
      );
      return await res.json();
    } catch (error) {
      console.log("Couldn't ftech the details", error);
    }
  }