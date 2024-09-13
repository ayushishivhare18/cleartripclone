import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const AboutCleartripHotelBooking = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        textAlign: "left",
      }}
    >
      <Box>
        <Typography component={"h4"} variant="h4" sx={{ pb: 4 }}>
          Why book hotels online on Cleartrip?
        </Typography>
        <Typography paragraph>
          Looking for online hotel booking sites? Your search ends here. From
          guest houses to resorts, from budget-friendly to luxury, whether for
          business or for leisure, Cleartrip is your go-to hotel booking app.
          Our curated, verified list of 400000+ hotels across 28000+ cities from
          around the globe ensures you have enough options to choose from and
          complete your online hotel booking at ease. Find a list of hotel
          chains such as oyo rooms, fabhotels, treebo hotels, etc. Seamlessly
          book hotels in Delhi, hotels in Mumbai, hotels in Bangalore, hotels in
          Goa and many more.
        </Typography>
        <Typography paragraph>
          With an array of filters and sorting options, you can simplify the
          search for your hotel room booking. It shows all the details of your
          preferred hotel, like description, highlights, photos, amenities, room
          types, rates all in one place. Additional features like pay-at-hotel,
          express checkout and free cancellations make the process of booking a
          hotel effortless.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "ceneter",
          justifyContent: "space-between",
          gap: 4,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Stack
          sx={{
            gap: 2,
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
        >
          <Typography component={"h6"} variant="h6">
            How to find and book hotels online on Cleartrip?
          </Typography>
          <Typography paragraph>
            With Cleartrip, booking a hotel online doesn't get simpler.
          </Typography>
          <ul
            style={{
              paddingLeft: 30,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <li>Click on the 'hotels' tab on the homepage</li>
            <li>
              Type in the city/ locality/ landmark/ hotel name in the search bar
            </li>
            <li>Fill in the check-in and check-out dates</li>
            <li>Choose the number of travellers and hit enter</li>
          </ul>
          <Typography paragraph>
            There you go! You can further narrow down your hotel booking search
            list by using filters like price, star rating, traveller rating,
            amenities and even preferences like hill-view or couple friendly
            hotels. For every kind of stay, Cleartrip has a hotel.
          </Typography>
        </Stack>
        <Stack
          sx={{
            gap: 2,
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
        >
          <Typography component={"h6"} variant="h6">
            How to Search for cheap hotels on Cleartrip?
          </Typography>
          <Typography paragraph>
            Cleartrip offers never-seen-before discounts on hotels, making your
            luxurious stay pocket-friendly.
          </Typography>
          <ul
            style={{
              paddingLeft: 30,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <li>
              Once you search for your preferred location or city, you can use
              an array of filters to refine your search.
            </li>
            <li>
              Enter the price range for your hotel room booking and get options
              accordingly.
            </li>
            <li>
              Compare, choose and complete your hotel booking by clicking on the
              'Book Now' button.
            </li>
          </ul>
          <Typography paragraph>
            So go ahead and book that long-awaited staycation, friends' trip,
            family holiday, or just a much-needed weekend getaway! Cleartrip has
            got you covered.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "ceneter",
          justifyContent: "space-between",
          gap: 4,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Stack
          sx={{
            gap: 2,
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
        >
          <Typography component={"h6"} variant="h6">
            What are the best offers available for hotel booking on Cleartrip?
          </Typography>
          <Typography paragraph>
            Here are some unmissable deals on hotel bookings. Use the mentioned
            coupon codes when you make your hotel booking and get exciting
            discounts.
          </Typography>
          <ul
            style={{
              paddingLeft: 30,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <li>
              5-20% Off Upto INR 4,000/- on Domestic and International Hotels -
              CTHOTEL
            </li>
            <li>Flat 25% off on Hotels with AU Bank Credit Card - AUFETS</li>
            <li>
              Great deals that run all year round, so you can book whenever you
              wish!
            </li>
            <li>10% Off Upto INR 4,000/- on International Hotels - CTINTL</li>
          </ul>
        </Stack>
        <Stack
          sx={{
            gap: 2,
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
        >
          <Typography component={"h6"} variant="h6">
            What are the benefits of booking hotels on Cleartrip?
          </Typography>
          <Typography paragraph>
            Booking hotels online with Cleartrip is as seamless as it can get.
          </Typography>
          <ul
            style={{
              paddingLeft: 30,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <li>Diverse range of hotels - from pocket-friendly to luxury</li>
            <li>
              Best offers using bank cards like Axis, ICICI, Kotak, Slice, Bank
              of Baroda, CITI, Federal, etc.
            </li>
            <li>Wallet cashbacks on Paytm and Mobikwik</li>
            <li>Exciting deals and discounts throughout the year</li>
            <li>Cancellation policies in case of last minute changes</li>
            <li>Upgrades on your stay</li>
            <li>EMI options</li>
          </ul>
        </Stack>
      </Box>
    </div>
  );
};

export default AboutCleartripHotelBooking;