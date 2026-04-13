import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./container/Auth/Auth";
import About from "./components/About/About";
import Data from "./container/Data/Data";
import Layout from "./components/Layout/Layout";
import Contact from "./components/Contact/Contact";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Contact />} />
					<Route path='/login' index element={<Auth />} />
					<Route path='/about' element={<About />} />
					<Route path='posts' element={<Data />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
