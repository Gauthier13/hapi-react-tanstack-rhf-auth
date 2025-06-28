import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter, Route, Routes } from "react-router"
import SearchPage from "./pages/SearchPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from "./store/store"
import FilmDetailsCard from "./components/cards/DetailsCards/FilmDetailsCard.tsx"
import PlanetDetailsCard from "./components/cards/DetailsCards/PlanetDetailCard.tsx"
import PeopleDetailCard from "./components/cards/DetailsCards/PeopleDetailCard.tsx"
import StarshipDetailCard from "./components/cards/DetailsCards/StarshipDetailCard.tsx"
import SpecieDetailCard from "./components/cards/DetailsCards/SpecieDetailCard.tsx"
import VehicleDetailCard from "./components/cards/DetailsCards/VehicleDetailCard.tsx"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/films/:id" element={<FilmDetailsCard />} />
            <Route path="/search/planets/:id" element={<PlanetDetailsCard />} />
            <Route path="/search/peoples/:id" element={<PeopleDetailCard />} />
            <Route path="/search/species/:id" element={<SpecieDetailCard />} />
            <Route
              path="/search/starships/:id"
              element={<StarshipDetailCard />}
            />
            <Route
              path="/search/vehicles/:id"
              element={<VehicleDetailCard />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
