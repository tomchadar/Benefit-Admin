import * as React from 'react';
// import { Amplify, API, graphqlOperation } from 'aws-amplify';
// import '@aws-amplify/ui-react/styles.css';
// import awsconfig from '../aws-exports';
import AdminDrawer from '../components/admindrawer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient();

// Amplify.configure(awsconfig);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            
            <AuthProvider>
                <AdminDrawer />
                <ToastContainer />
                
            </AuthProvider>
           
        </QueryClientProvider>
    );
};

export default App;
