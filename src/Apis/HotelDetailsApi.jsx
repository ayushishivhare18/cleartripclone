export async function fetchHotels(location, limit, page) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}&limit=${limit}&page=${page}`,
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
      console.log("couln't fetch hotels", error);
    }
  }
  
  export async function fetchFilteredHotels(location, limit, page, filterItems) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}&limit=${limit}&page=${page}&filter=${filterItems}`,
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
  
  export async function fetchSingleHotel(hotelID) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelID}`,
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
      console.log("couln't fetch hotels", error);
    }
  }