import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { DrugsProvider } from './context/DrugsProvider.jsx';
import { ThemeProvider } from "./context/ThemeContext";
import './index.css';
import AuthLayout from './routes/Auth/Auth.jsx';
import PassReset from './routes/Auth/PassReset.jsx';
import PrivateRoute from './routes/Auth/PrivateRoute.jsx';
import DrugClassification from './routes/Hcp/Classlist.jsx';
import DrugListClassification from './routes/Hcp/DrugListClassifcation.jsx'
import SubClassList from './routes/Hcp/SubClassList.jsx'
import Drug_List from './routes/Hcp/Drug_List.jsx';
import DrugCarousel from './routes/Hcp/DrugCarousel.jsx';
import DrugListDrawer from './routes/Patient/DrugListDrawer.jsx';
import DrugList from './routes/Patient/DrugList.jsx';
import InteractionList from './routes/Hcp/InteractionListClassification.jsx';
import HcpfoodInteraction from './routes/Hcp/hcp_foodInteraction.jsx';
import Interaction from './routes/Patient/interactions.jsx';
// import { ThemeProvider } from "./context/ThemeContext";
import FoodSearch from './routes/Patient/FoodSearch.jsx';
import DrugInteractionList from './routes/Patient/DrugInteractionList.jsx';
import FoodInteraction from './routes/Patient/FoodInteraction.jsx';
import General from './routes/Patient/General_Instruction.jsx';
import Instruction from './routes/Patient/instructions.jsx';
import Suggestions from './routes/Suggestions.jsx';
import Home from './routes/Home.jsx'
import Profile from './routes/Hcp/Profile.jsx'
const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/general" element={<General />} />
      <Route path="/general/:id" element={<Instruction />} />
      <Route path="/PasswordReset" element={<PassReset />} />
      {/* <Route path="/food-interaction/:drug_id" element={<FoodInteraction />} /> */}

      <Route path="/food-interaction/:drug_id" element={<FoodInteraction moduleType="patient" />} />


      <Route path="/foodSearch" element={<FoodSearch />} />
      <Route path="/interactions" element={<DrugsProvider moduleType="patient">
        <Interaction />
      </DrugsProvider>} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/drug-interaction/:id/:name" element={<DrugInteractionList />} /> {/* Add the DrugInteractionList route */}
      {/* Drug Interaction & HCP Routes */}
      <Route path="/druglist" element={
        <DrugsProvider moduleType="hcp">
          <Drug_List />
        </DrugsProvider>
      } />
      <Route path="/hcpdruglist" element={
        <DrugsProvider moduleType="hcp">
          <DrugCarousel />
        </DrugsProvider>
      } />
      {/* <Route path="/hcp_foodInteraction/:id" element={
        <DrugsProvider moduleType="hcp">
          <HcpfoodInteraction />
        </DrugsProvider>
      } /> */}

      <Route path="/hcp_foodInteraction/:drug_id" element={
        <DrugsProvider moduleType="hcp">
          <FoodInteraction moduleType="hcp" />
        </DrugsProvider>
      } />



      <Route path="/suggestions" element={<Suggestions />} />
      {/* Classification routes wrapped in HCP DrugsProvider */}
      <Route path="/classification" element={
        <DrugsProvider moduleType="hcp">
          <DrugClassification />
        </DrugsProvider>
      } />
      <Route path="/sub-classes/:class_id" element={
        <DrugsProvider moduleType="hcp">
          <SubClassList />
        </DrugsProvider>
      } />
      <Route path="/drugs/:sub_class_id" element={
        <DrugsProvider moduleType="hcp">
          <DrugListClassification />
        </DrugsProvider>
      } />

      {/* Patient Routes wrapped in DrugsProvider */}
      <Route path="/drug-list" element={
        <DrugsProvider moduleType="patient">
          <DrugListDrawer />
        </DrugsProvider>
      } />
      {/* Classification routes */}
      <Route path="/classification" element={<DrugClassification />} />
      <Route path="/sub-classes/:class_id" element={<SubClassList />} />
      <Route path="/drugs/:sub_class_id" element={<DrugListClassification />} />
      <Route path="/interactions/:drug_id" element={<InteractionList />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);






// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { Route, RouterProvider, createRoutesFromElements } from "react-router";
// import AuthLayout from './routes/Auth/Auth.jsx';
// import Home from './routes/Home.jsx';
// import { createBrowserRouter } from "react-router-dom";
// import AuthProvider from './context/AuthProvider.jsx';
// import PrivateRoute from './routes/Auth/PrivateRoute.jsx';
// import Profile from './routes/Hcp/Profile.jsx';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import General from './routes/Patient/General_Instruction.jsx';
// import Instruction from './routes/Patient/instructions.jsx';
// import PassReset from './routes/Auth/PassReset.jsx';

// import FoodInteraction from './routes/Patient/FoodInteraction.jsx';
// import { DrugsProvider } from './context/DrugsProvider.jsx';  // Correct import
// import Drug_List from './routes/Hcp/Drug_List.jsx';
// import DrugCarousel from './routes/Hcp/DrugCarousel.jsx';
// import DrugListDrawer from './routes/Patient/DrugListDrawer.jsx';
// import InteractionList from './routes/Hcp/InteractionListClassification.tsx';
// import HcpfoodInteraction from './routes/Hcp/hcp_foodInteraction.jsx';
// import Interaction from './routes/Patient/interactions.jsx';
// import { ThemeProvider } from "./context/ThemeContext";
// import FoodSearch from './routes/Patient/FoodSearch.jsx';
// import DrugInteractionList from './routes/Patient/DrugInteractionList.jsx';
// import SubClassList from './routes/Hcp/SubClassList.tsx';
// import DrugClassification from './routes/Hcp/Classlist.tsx';
// import DrugListClassification from './routes/Hcp/DrugListClassifcation.jsx';

// const queryClient = new QueryClient();

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/auth" element={<AuthLayout />} />
//       <Route path="/general" element={<General />} />
//       <Route path="/general/:id" element={<Instruction />} />
//       <Route path="/PasswordReset" element={<PassReset />} />
//       <Route path="/food-interaction/:drug_id" element={<FoodInteraction />} />
//       <Route path="/foodSearch" element={<FoodSearch />} />
//       <Route path="/interactions" element={<Interaction />} />
//       <Route index={true} path="/" element={<Home />} />

//       {/* Wrap Patient Routes with Patient's DrugsProvider */}
//       <Route
//         path=""
//         element={
//           <DrugsProvider moduleType="patient">
//             <Route path="/drug-list" element={<DrugListDrawer />} />
//           </DrugsProvider>
//         }
//       />

//       {/* Wrap HCP Routes with HCP's DrugsProvider */}
//       <Route
//         path=""
//         element={
//           <DrugsProvider moduleType="hcp">
//             <Route path="/druglist" element={<Drug_List />} />
//             <Route path="/hcpdruglist" element={<DrugCarousel />} />
//           </DrugsProvider>
//         }
//       />

//       <Route path="/hcp_foodInteraction/:id" element={<HcpfoodInteraction />} />
//       <Route path="/classification" element={<DrugClassification />} />
//       <Route path="/sub-classes/:class_id" element={<SubClassList />} />
//       <Route path="/drugs/:sub_class_id" element={<DrugListClassification />} />

//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/profile" element={<Profile />} />
//       </Route>
//     </Route>
//   )
// );

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider>
//         <AuthProvider>
//           {/* Wrap everything inside DrugsProvider */}
//           <DrugsProvider moduleType="patient">  {/* Change this dynamically if needed */}
//             <RouterProvider router={router} />
//           </DrugsProvider>
//         </AuthProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   </StrictMode>
// );

