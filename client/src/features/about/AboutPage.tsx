import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";
const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationErrors() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this."))
      .catch((error) => setValidationErrors(error));
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        {" "}
        Errors for testing purposes{" "}
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.getError400().catch((error) => console.log(error))
          }
        >
          Test 400 Error{" "}
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.getError401().catch((error) => console.log(error))
          }
        >
          Test 401 Error{" "}
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.getError404().catch((error) => console.log(error))
          }
        >
          Test 404 Error{" "}
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.getError500().catch((error) => console.log(error))
          }
        >
          Test 500 Error{" "}
        </Button>
        <Button variant="contained" onClick={getValidationErrors}>
          Test Validation Error{" "}
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};

export default AboutPage;
