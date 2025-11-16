import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Real-time Currency Converter
        </Typography>
        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
