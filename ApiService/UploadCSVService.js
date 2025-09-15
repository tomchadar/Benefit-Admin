import api from './http';
import Box from '@mui/material/Box';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { drawerFontColorActive, primary } from '../constants/colors';

  function FileUpload({user, token}) {
    const [uploading, setUploding] = useState(false);
    const { setUser, saveToken } = useContext(AuthContext);
    
    const handleFileUpload = async (event) => {

        setUploding(true);

      const file = event.target.files[0];

      try {
            const formData = new FormData();
            formData.append('csv', file);
            
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
        
            api.post('/file/upload-csv', formData, config).then((res) => {
                if(res.data.msg == "successed") {
                  alert("CSV File Import Successed !!! ");
                  setUser(user);
                  saveToken(token);
                }
            });
        
      } catch (error) {
        console.error('Error uploading CSV:', error.message);
      }
    };
  
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: '#fff',
                p: 3,
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
            }}
        >
          <CssVarsProvider>
            <Sheet
                  sx={{
                      width: 400,
                      mx: 'auto', // margin left & right
                      my: 4, // margin top & botom
                      py: 3, // padding top & bottom
                      px: 2, // padding left & right
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      borderRadius: 15,
                      boxShadow: 'md',
                      border: `1px solid ${drawerFontColorActive}`,
                  }}
              >
                <div>
                  <Typography
                      level="h4"
                      component="h1"
                      textAlign="center"
                  >
                      <b>Upload CSV File</b>
                  </Typography>
                </div>
                <input type="file" id="actual-btn" onChange={handleFileUpload} hidden/>
                <label htmlFor="actual-btn" onChange={handleFileUpload} className='custom-upload-button'>
                    {uploading? "Uploading..." : "Choose File"}
                </label>
              
              </Sheet>
          </CssVarsProvider>
        </Box>
      );
  }
  
  export default FileUpload;
