import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import CountryDetails from "./components/CountryDetails";
import { ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import theme from "./theme";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" Component={Form} />
          <Route path="/details/:country" Component={CountryDetails} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
