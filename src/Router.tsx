import { createBrowserRouter } from "react-router-dom";

import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "movies",
                element: <Home />,
                children: [
                    {
                        path: "*",
                        element: <Home />,
                    }
                ]
                
            },
            {
                path: "tv",
                element: <Tv />,
                children: [
                    {
                        path:"*",
                        element: <Tv />,
                    }
                ]
            },
            {
                path: "search",
                element: <Search />,
            },
        ]
    }
])

export default router;