import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Flight from "./pages/flight/Flight";
import FlightResultsPage from "./pages/flight/FlightResultsPage";
import FlightBookingPage from "./pages/flight/FlightBookingPage";

import Hotel from "./pages/hotel/Hotel";
import HotelResultPage from "./pages/hotel/HotelResultPage";
import HotelDetailsPage from "./pages/hotel/HotelDetailsPage";
import HotelBookingPage from "./pages/hotel/HotelBookingPage";
import HotelCheckoutPage from "./pages/hotel/HotelCheckoutPage";

import Offers from "./pages/hotel/Hotel";
import MyTrip from "./pages/myTrip/MyTrip";

import { FlightsSearchProvider } from "./contexts/FlightsSearchProvider";
import { HotelDetailsProvider } from "./contexts/HotelDetailsProvider";
import { OfferDetailsProvider } from "./contexts/OfferDetailsProvider";
import AuthorizationProvider from "./contexts/AuthorizationProvider";
import { FontProvider } from "./contexts/FontProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/flights",
        element: <Flight />,
      },
      {
        path: "/hotels",
        element: <Hotel />,
      },
    ],
  },
  {
    path: "/flights/:searchQuery",
    element: <FlightResultsPage />,
  },
  {
    path: "/flights/itinerary/:flightId",
    element: <FlightBookingPage />,
  },
  {
    path: "/hotels/results",
    element: <HotelResultPage />,
  },
  {
    path: "/hotels/results/:hotelID",
    element: <HotelDetailsPage />,
  },
  {
    path: "/hotels/itinerary/:hotelID",
    element: <HotelCheckoutPage />,
  },
  {
    path: "/hotels/HBConfirmation/:hotelID",
    element: <HotelBookingPage />,
  },
  {
    path: "/offers",
    element: <Offers />,
  },
  {
    path: "/mytrip",
    element: <MyTrip />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <FontProvider>
    <AuthorizationProvider>
      <OfferDetailsProvider>
        <HotelDetailsProvider>
          <FlightsSearchProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </FlightsSearchProvider>
        </HotelDetailsProvider>
      </OfferDetailsProvider>
    </AuthorizationProvider>
  </FontProvider>
  // </React.StrictMode>
);