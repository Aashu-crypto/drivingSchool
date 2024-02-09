import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
function InstructorDialog({ openModal, handleCloseModal, edit, id }) {
  const instructorData = useSelector((state) => state.instructor.instructor).flat();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    number: '',
    totalEarning: '',
    balance: '',
    whatsappNumber: '',
    verified: '',
    status: '',
    gender: '',
    image: null,
    imageUrl: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    bankDetails: {
      accountNumber: '',
      bankName: '',
      branch: '',
      transitNumber: '',
      swiftCode: '',
      documents: [], // Array to hold multiple document files
      documentUrls: [],
    },
    carDetails: {
      carModel: '',
      carYear: '',
      vinNumber: '',
      licensePlate: '',
    },
  });

  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Nova Scotia',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Northwest Territories',
    'Nunavut',
    'Yukon',
  ];
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserData((prevState) => ({
        ...prevState,
        image: file,
        imageUrl: URL.createObjectURL(file), // Create and store the URL for preview
      }));
    }
  };
  const handleGenderChange = (event) => {
    const { value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  const handleChange = (event, nested = null) => {
    const { name, value } = event.target;
    if (nested) {
      // Handling nested objects like address, bankDetails, carDetails
      setUserData((prevState) => ({
        ...prevState,
        [nested]: {
          ...prevState[nested],
          [name]: value,
        },
      }));
    } else {
      // Directly updating state for non-nested properties like gender
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleDocumentChange = (event) => {
    const files = Array.from(event.target.files); // Convert the FileList to an Array
    const documentUrls = files.map((file) => URL.createObjectURL(file)); // Create URLs for each file

    setUserData((prevState) => ({
      ...prevState,
      bankDetails: {
        ...prevState.bankDetails,
        documents: [...prevState.bankDetails.documents, ...files], // Append new files
        documentUrls: [...prevState.bankDetails.documentUrls, ...documentUrls], // Append new URLs
      },
    }));
  };

  const handleAddInstructor = () => {
    if (edit == 1) {
      fetch(`http://localhost:3000/api/v1/Instuctor/updateInstructor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.error('Error:', error);
        });
      console.log('Instructor added', userData);
      handleCloseModal();
    } else {
      fetch('http://localhost:3000/api/v1/Instuctor/addInstructor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.error('Error:', error);
        });
      console.log('Instructor added', userData);
      handleCloseModal();
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Here, you can also implement additional validation if needed
    const formData = new FormData();
    // Add other user data to formData
    userData.bankDetails.documents.forEach((file, index) => {
      formData.append(`bankDocument${index + 1}`, file);
    });
    console.log('Form submitted', userData);
    handleAddInstructor();
  };
  const handleDeleteDocument = (indexToDelete) => {
    setUserData((prevState) => ({
      ...prevState,
      bankDetails: {
        ...prevState.bankDetails,
        documents: prevState.bankDetails.documents.filter((_, index) => index !== indexToDelete),
        documentUrls: prevState.bankDetails.documentUrls.filter(
          (_, index) => index !== indexToDelete
        ),
      },
    }));
  };
  const [foundObject, setFoundObject] = useState();

  useEffect(() => {
    // Define an async function inside useEffect
    if (instructorData && instructorData.length > 0) {
      console.log('id', id);
      const fetchData = async () => {
        try {
          // Find the record asynchronously
          const object = await instructorData.find((record) => record._id == id);

          if (object) {
            console.log(object);
            setFoundObject(object);

            // Update user data safely, checking for undefined object properties
            setUserData((prevState) => ({
              ...prevState,
              name: object.name || prevState.name,
              email: object.email || prevState.email,
              number: object.number || prevState.number,
              totalEarning: object.totalEarning || prevState.totalEarning,
              balance: object.balance || prevState.balance,
              whatsappNumber: object.whatsappNumber || prevState.whatsappNumber,
              verified: object.verified || prevState.verified,
              status: object.status || prevState.status,
              gender: object.gender || prevState.gender,
              image: object.image || prevState.image,
              imageUrl: object.imageUrl || prevState.imageUrl,
              bankDetails: {
                ...prevState.bankDetails,
                accountNumber:
                  object.bankDetails?.accountNumber || prevState.bankDetails.accountNumber,
                bankName: object.bankDetails?.bankName || prevState.bankDetails.bankName,
                documents: object.bankDetails?.documents || prevState.bankDetails.documents,
                documentUrls:
                  object.bankDetails?.documentUrls || prevState.bankDetails.documentUrls,
                accountNumber: '',

                branch: object.bankDetails?.branch || prevState.bankDetails.branch,
                transitNumber:
                  object.bankDetails?.transitNumber || prevState.bankDetails.transitNumber,
                swiftCode: object.bankDetails?.swiftCode || prevState.bankDetails.swiftCode,
              },
              carDetails: {
                ...prevState.carDetails,
                licensePlate: object.carDetails?.licensePlate || prevState.carDetails.licensePlate,
                carModel: object.carDetails?.carModel || prevState.carDetails.carModel,
                carYear: object.carDetails?.carYear || prevState.carDetails.carYear,
                vinNumber: object.carDetails?.vinNumber || prevState.carDetails.vinNumber,
                // Assuming you handle missing car details elsewhere or they can remain as previously set
              },
              address: {
                ...prevState.address,
                street: object.address?.street || prevState.address.street,
                city: object.address?.city || prevState.address.city,
                state: object.address?.state || prevState.address.state,
                postalCode: object.address?.postalCode || prevState.address.postalCode,
              },
            }));
          }
        } catch (error) {
          // Handle any errors that occur during fetch
          console.error('Failed to fetch instructor data', error);
        }
      };

      // Call the async function
      fetchData();
    }
  }, []);

  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth={true}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Add Instructor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Button variant="contained" component="label">
                  Upload Photo
                  <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                </Button>
                {userData.imageUrl && (
                  <img
                    src={userData.imageUrl}
                    alt="Uploaded Preview"
                    style={{ marginTop: 20, maxWidth: '100px', height: '100px' }}
                  />
                )}
              </FormControl>
            </Grid>
            {instructorData.map((i, index) => {
              return <h1>{i._id}</h1>;
            })}
            {foundObject && <div>Found Object: {JSON.stringify(foundObject)}</div>}
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="email"
                variant="outlined"
                fullWidth
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="number"
                value={userData.number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="WhatsApp Number"
                variant="outlined"
                fullWidth
                name="whatsappNumber"
                value={userData.whatsappNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Total Earning"
                variant="outlined"
                fullWidth
                name="totalEarning"
                value={userData.totalEarning}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Balance"
                variant="outlined"
                fullWidth
                name="balance"
                value={userData.balance}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  value={userData.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleGenderChange}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Verified"
                variant="outlined"
                fullWidth
                name="verified"
                value={userData.verified}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                name="status"
                value={userData.status}
                onChange={handleChange}
              />
            </Grid>
            {/* Address Section */}
            <Grid item xs={12}>
              <DialogTitle>Address</DialogTitle>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Street"
                variant="outlined"
                fullWidth
                name="street"
                value={userData.address.street}
                onChange={(e) => handleChange(e, 'address')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="city"
                value={userData.address.city}
                onChange={(e) => handleChange(e, 'address')}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="Provinces/Territories">Provinces/Territories</InputLabel>
                <Select
                  labelId="Provinces/Territories"
                  id="Provinces-select"
                  value={userData.state}
                  label="Provinces/Territories"
                  name="Provinces/Territories"
                  onChange={(e) => handleChange(e, 'address')}
                  required
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Adjust this value to control when the scrollbar appears
                        width: 'auto', // Adjust width as necessary, or remove if not needed
                      },
                    },
                  }}
                >
                  {provinces.map((i) => {
                    return <MenuItem value={i}>{i}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                name="postalCode"
                value={userData.address.postalCode}
                onChange={(e) => handleChange(e, 'address')}
              />
            </Grid>
            {/* Bank Details Section */}
            <Grid item xs={12}>
              <DialogTitle>Bank Details</DialogTitle>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Button variant="contained" component="label">
                  Upload Bank Documents
                  <input
                    type="file"
                    hidden
                    onChange={handleDocumentChange}
                    multiple // Allow multiple file selection
                    accept=".pdf,.doc,.docx" // Specify accepted file types
                  />
                </Button>
              </FormControl>
            </Grid>
            {/* Display links to uploaded documents */}
            {userData.bankDetails.documentUrls.map((url, index) => (
              <Grid
                item
                xs={12}
                key={index}
                style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: '10px' }}
                >
                  View Uploaded Document {index + 1}
                </a>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteDocument(index)}
                >
                  Delete
                </Button>
              </Grid>
            ))}
            <Grid item xs={6}>
              <TextField
                label="Account Number"
                variant="outlined"
                fullWidth
                name="accountNumber"
                value={userData.bankDetails.accountNumber}
                onChange={(e) => handleChange(e, 'bankDetails')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bank Name"
                variant="outlined"
                fullWidth
                name="bankName"
                value={userData.bankDetails.bankName}
                onChange={(e) => handleChange(e, 'bankDetails')}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Branch"
                variant="outlined"
                fullWidth
                name="branch"
                value={userData.bankDetails.branch}
                onChange={(e) => handleChange(e, 'bankDetails')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Transit Number"
                variant="outlined"
                fullWidth
                name="transitNumber"
                value={userData.bankDetails.transitNumber}
                onChange={(e) => handleChange(e, 'bankDetails')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Swift Number"
                variant="outlined"
                fullWidth
                name="swiftNumber"
                value={userData.bankDetails.swiftNumber}
                onChange={(e) => handleChange(e, 'bankDetails')}
              />
            </Grid>
            {/* Car Details Section */}
            <Grid item xs={12}>
              <DialogTitle>Car Details</DialogTitle>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Car Model"
                variant="outlined"
                fullWidth
                name="carModel"
                value={userData.carDetails.carModel}
                onChange={(e) => handleChange(e, 'carDetails')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Car Year"
                variant="outlined"
                fullWidth
                name="carYear"
                value={userData.carDetails.carYear}
                onChange={(e) => handleChange(e, 'carDetails')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="VIN Number"
                variant="outlined"
                fullWidth
                name="vinNumber"
                value={userData.carDetails.vinNumber}
                onChange={(e) => handleChange(e, 'carDetails')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="License Plate"
                variant="outlined"
                fullWidth
                name="licensePlate"
                value={userData.carDetails.licensePlate}
                onChange={(e) => handleChange(e, 'carDetails')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAddInstructor} variant="contained" color="primary">
            {edit == 1 ? 'Edit' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default InstructorDialog;
