import { Button, TextField } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Form: FC = () => {
  const [countryInput, setCountryInput] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryInput}?fullText=true`
      );
      const data = response.data;
      navigate(`/details/${countryInput}`, { state: data });
    } catch (error) {
      toast.error("Not Found , Try Again.");
    } finally {
      setCountryInput("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryInput(e.target.value);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="form-container">
        <h2>Search Any Country !</h2>
        <form className="form-content" onSubmit={handleSubmit}>
          <TextField
            placeholder="Enter country"
            value={countryInput}
            onChange={handleInputChange}
            sx={{
              color: "white",
              backgroundColor: "#000",
              borderRadius: "6px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!countryInput}
          >
            Search
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;
