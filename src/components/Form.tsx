import { Button, TextField } from "@mui/material";
import { Component } from "react";
import { Toaster } from "react-hot-toast";
import withRouter from "./withRouter";

interface FormState {
  countryInput: string;
}

interface FormProps {
  navigate: (url: string, any: any) => void;
}

class Form extends Component<FormProps, FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryInput: "",
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      countryInput: e.target.value,
    });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${this.state.countryInput}?fullText=true`
      );
      const data = await response.json();
      this.props.navigate(`/details/${this.state.countryInput}`, {
        state: data,
      });
    } catch (error) {
      console.log(error);
      // toast.error(``);
    } finally {
      this.setState({
        countryInput: "",
      });
    }
  };

  render() {
    const { countryInput } = this.state;
    return (
      <>
        <div>
          <Toaster />
        </div>
        <div className="form-container">
          <h2>Search Any Country !</h2>
          <form className="form-content" onSubmit={this.handleSubmit}>
            <TextField
              label="Enter country"
              value={countryInput}
              onChange={this.handleInputChange}
              inputProps={{ pattern: "[a-z]{1,15}", style: { color: "black" } }}
              sx={{
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
  }
}

export default withRouter(Form);
