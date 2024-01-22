import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
} from "@mui/material";

interface countryDetails {
  name: {
    common: string;
    official: string;
  };
  capital: string;
  population: number;
  latlng: number[];
  flags: {
    png: string;
  };
}

interface capitalWeather {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}

const CountryDetails: FC = () => {
  const location = useLocation();
  const countryData = location.state[0] as countryDetails;
  const [capitalWeatherDetails, setCapitalWeatherDetails] =
    useState<capitalWeather | null>(null);
  const [buttonClick, setButtonClick] = useState(false);
  const capitalCity = countryData.capital;

  const handleButtonClick = () => {
    setButtonClick(true);
  };

  useEffect(() => {
    const findWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=f3b4975bca9e4694be980822242201&q=${capitalCity}`
        );
        const data = response.data.current;
        setCapitalWeatherDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    findWeather();
  }, [capitalCity, buttonClick]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h3" gutterBottom>
          {countryData.name.common}
        </Typography>

        <Card style={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            height="180"
            image={countryData.flags.png}
            alt="Country Flag"
          />
        </Card>
      </Box>
      <Paper elevation={3} style={{ margin: "16px 0", padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Country Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Official Name: {countryData.name.official}</Typography>
            <Typography>Capital: {countryData.capital}</Typography>
            <Typography>Population: {countryData.population}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Latitude: {countryData.latlng[0]}</Typography>
            <Typography>Longitude: {countryData.latlng[1]}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {!buttonClick && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "20%", padding: "5px" }}
          onClick={handleButtonClick}
        >
          <Typography>Find Capital Weather</Typography>
        </Button>
      )}

      {buttonClick && capitalWeatherDetails && (
        <Paper elevation={3} style={{ margin: "16px 0", padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Weather Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                Temperature: {capitalWeatherDetails.temp_c} °C
              </Typography>
              <Typography>
                Condition: {capitalWeatherDetails.condition.text}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Wind Direction: {capitalWeatherDetails.wind_dir}
              </Typography>
              <Typography>
                Wind Speed: {capitalWeatherDetails.wind_kph} kph
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
        variant="outlined"
        sx={{ width: "10%", padding: "5px", marginTop: "10px" }}
        color="secondary"
      >
        <Typography>Go Back</Typography>
      </Button>
    </Box>
  );
};

export default CountryDetails;
