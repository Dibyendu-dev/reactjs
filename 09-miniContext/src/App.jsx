import Login from "./components/Login";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <div className=" text-3xl text-center bg-gray-600">hello context!</div>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}

export default App;
