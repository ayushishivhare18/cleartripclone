export async function fetchFlightBookingInfo(flightID, departDate, returnDate) {
    const apiUrl =
      "https://academics.newtonschool.co/api/v1/bookingportals/booking";
    const token = localStorage.getItem("token");
    const projectID = "ti65fq50h0gi";
  
    const requestBody = {
      bookingType: "flight",
      bookingDetails: {
        flightId: flightID,
        startDate: departDate,
        endDate: returnDate,
      },
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: projectID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error while booking flight:", error);
    }
  }
  
  export async function fetchHotelBookingInfo(hotelID, startDate, endDate) {
    const apiUrl =
      "https://academics.newtonschool.co/api/v1/bookingportals/booking";
    const token = localStorage.getItem("token");
    const projectID = "ti65fq50h0gi";
  
    const requestBody = {
      bookingType: "hotel",
      bookingDetails: {
        hotelId: hotelID,
        startDate: startDate,
        endDate: endDate,
      },
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: projectID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error while booking flight:", error);
    }
  }