export async function fetchOffers(type) {
    try {
      const res = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${type}"}`,
        {
          method: "GET",
          headers: {
            projectID: "ti65fq50h0gi",
          },
        }
      );
      const jsonRes = await res.json();
      return jsonRes;
    } catch (error) {
      console.log("could not fetch OFFERs", error);
    }
  }