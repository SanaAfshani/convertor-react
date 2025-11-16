import { Container, Box, Typography } from "@mui/material";
import CurrencyConverter from "./components/converter/CurrencyConverter";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
  return (
      <Layout>
      <Box sx={{ display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom textAlign="center">
          Wallex Currency Converter
        </Typography>
        <CurrencyConverter />
      </Container>
    </Box>
      </Layout>
  );
};

export default App;
