export async function fetchFlights(source, destination, day, limit, page) {
    try {
      const flightsUrl = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&limit=${limit}&page=${page}`;
      const res = await fetch(flightsUrl, {
        method: "GET",
        headers: {
          projectID: "ti65fq50h0gi",
        },
      });
      const jsonRes = await res.json();
      return jsonRes;
    } catch (error) {
      console.log("couldn't fetch api", error);
    }
  }
  
  export async function fetchFilteredFlights(
    source,
    destination,
    day,
    limit,
    page,
    filterItems
  ) {
    const flightsUrl = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}&limit=${limit}&page=${page}&filter=${filterItems}`;
    try {
      const res = await fetch(flightsUrl, {
        method: "GET",
        headers: {
          projectID: "ti65fq50h0gi",
        },
      });
      return await res.json();
    } catch (error) {
      console.log("clouldn't fetch sort by depart time", error);
    }
  }
  
  export async function fetchSingleFlightDetails(flightID) {
    const fetchUrl = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightID}`;
    try {
      const res = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          projectID: "ti65fq50h0gi",
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Error while getting single flight details:", error);
    }
  }