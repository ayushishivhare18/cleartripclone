import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const AboutCleartrip = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        textAlign: "left",
      }}
    >
      <Stack sx={{ gap: 2 }}>
        <Typography component={"h4"} variant="h4" sx={{ pb: 2 }}>
          Why book on Cleartrip?
        </Typography>
        <Typography paragraph>
          On Cleartrip.com, you can turn all your plans into trips. From flight
          ticket bookings, and booking hotels online to airport, rental and
          outstation cab booking, with Cleartrip, no travel dream is far enough.
          Fly to your favourite destinations with the best flight offers across
          various airline options like IndiGo, Air India, SpiceJet, Go First,
          AirAsia, Vistara, etc. Make the most of your holiday plans by
          relaxing, rejuvenating and enjoying amazing leisure experiences at our
          vast range of hotels. From affordable and budget-friendly hotels to
          the best 5-star properties, book your stay on Cleartrip with
          unmissable offers. Be it for business travel or pleasure, you can now
          get the best deals on flights and hotels. So, where to?
        </Typography>

        <Typography component={"h6"} variant="h6" sx={{ pb: 1 }}>
          Booking flights & hotels online with Cleartrip
        </Typography>
        <Typography paragraph>
          From queries to itineraries, for all things travel, there is
          Cleartrip. Checking your flight updates and PNR status is easy with
          our simple, intuitive app and booking site. Booking online hotels gets
          seamless with a range of choices and the greatest hotel deals.
        </Typography>

        <Typography paragraph>
          Here’s why booking flights and hotels with Cleartrip is your Clear
          Advantage:
        </Typography>
        <Typography>
          <span style={{ fontWeight: 500 }}>ClearChoice Max: </span>
          <span>
            Free cancellation or rescheduling for domestic (up to 24 hrs before
            departure) & international flights (up to 72 hrs before departure).
          </span>
        </Typography>

        <Typography>
          <span style={{ fontWeight: 500 }}>ClearChoice Plus: </span>
          <span>
            Free date change or airline change up to 12 hrs (up to 24 hours for
            Air India*& Vistara*) before departure.
          </span>
        </Typography>

        <Typography>
          <span style={{ fontWeight: 500 }}>Easy hotel cancellation: </span>
          <span>
            Cancel your hotel stay easily. Zero fees on hotel cancellations up
            to 24 hours before check-in on 20k+ hotels.
          </span>
        </Typography>

        <Typography>
          <span style={{ fontWeight: 500 }}>Instant refund initiation: </span>
          <span>
            All refunds on flight and hotel cancellations are initiated
            instantly.
          </span>
        </Typography>

        <Typography>
          <span style={{ fontWeight: 500 }}>Medi-cancel refund: </span>
          <span>
            Cancel your domestic flight booking easily on valid medical grounds
            and get up to ₹3500 against airline cancellation charges per
            passenger per segment.
          </span>
        </Typography>

        <Typography>
          <span style={{ fontWeight: 500 }}>
            International travel insurance:{" "}
          </span>
          <span>
            Get stress-free coverage against a vast range of uncertainties for
            all international destinations at only ₹89 per user per day.
          </span>
        </Typography>

        <Typography>
          <span style={{ fontWeight: 500 }}>
            Special Fares For Armed Personnel, Senior Citizens and Student
            travellers:{" "}
          </span>
          <span>
            Cleartrip introduces discounted fares for armed personnel, senior
            citizens and students on domestic flights. Additional discounts with
            coupon codes.
          </span>
        </Typography>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Typography component={"h6"} variant="h6">
          What are the best offers available for travel bookings on Cleartrip?
        </Typography>
        <Typography paragraph>
          Get the best offers on hotels and flights using bank cards such as
          HDFC, ICICI, Bank of Baroda, Federal Bank, etc. You can also grab
          amazing discounts during our exciting sale events. Apart from this,
          find unmissable deals and offers on hotel stays and flight bookings
          throughout the year.
        </Typography>
      </Box>

      <Box>
        <Typography component={"h6"} variant="h6">
          Are there any offers for new users on Cleartrip?
        </Typography>
        <Typography paragraph>
          Firsts are always special. So new users, you get FLAT 12% off on your
          airfare and up to 18% off on hotels using code CTFIRST. Cleartrip is
          here to make your online flight booking seamless and simple.
        </Typography>
      </Box>

      <Box>
        <Typography component={"h6"} variant="h6">
          How can I find the best deals and discounts on flights and hotels
          online on Cleartrip?
        </Typography>
        <Typography paragraph>
          With Cleartrip, there are multiple deals available for your online
          flight and hotel booking. Whenever you select a hotel or a flight
          ticket, you can find the best available deals mentioned on the booking
          page. You can then use any of the available deals and coupon codes to
          avail your offer. Explore all flight booking discount offers & hotels
          booking discount offers.
        </Typography>
      </Box>

      <Box>
        <Typography component={"h6"} variant="h6">
          Which is the best time to book flight tickets online?
        </Typography>
        <Typography paragraph>
          There’s no specific right time to book your travel. With Cleartrip,
          there are deals and offers available on online flight tickets all year
          round, to make your booking easy and affordable. However, there are
          many exciting sale events Cleartrip has that offer the best deals on
          travel such as Travel Maxx sale, #NoEndWeekend sale, Big Billion Days,
          Big Travel Sale, etc. Stay tuned and keep an eye on when the travel
          sales are and book hotels and flights online for the best price!
        </Typography>
      </Box>
    </div>
  );
};

export default AboutCleartrip;