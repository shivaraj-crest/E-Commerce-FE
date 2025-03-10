import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={true}  // ✅ Always open for Suspense fallback
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
