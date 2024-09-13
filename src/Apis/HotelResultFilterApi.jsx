export async function fetchSortByPrice(location, limit, page, price) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}&limit=${limit}&page=${page}&sort={"avgCostPerNight":${price}}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            projectID: "ti65fq50h0gi",
          },
        }
      );
      return await res.json();
    } catch (error) {
      console.log("couldn't fetch hotels by price", error);
    }
  }
  