import Providers from "./contexts/Providers";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
