import { Container, Box } from "@mui/material";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ flexGrow: 1, py: 4, display: "flex", alignItems: "center" }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
