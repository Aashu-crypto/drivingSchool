import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import InstructorTableToolbar from '../instructor-table-toolbar';
import { users } from 'src/_mock/user';
import InstructorTableRow from '../instructor-table-row';
import InstructorTableHead from '../instrutor-table-head';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import InstructorDialog from '../insturctor-dialog';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useDispatch } from 'react-redux';
import { instructor } from 'src/sections/redux/slice/InstructorSlice';

function InstructorView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAddInstructor = () => {
    // Add logic to handle adding a new instructor
    // You can send a request to your server or update the local state
    // ...

    // Close the modal after adding the instructor
    handleCloseModal();
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const [instructorData, setInstructordata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/Instuctor/details`);
        const data = await response.json();
        setInstructordata(data.instructor);
        dispatch(instructor(data.instructor));
        console.log('data fetched ', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  console.log(users);
  const dataFiltered = applyFilter({
    inputData: instructorData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Insturctors</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}
        >
          Add Instructors
        </Button>
      </Stack>
      <InstructorDialog openModal={openModal} handleCloseModal={handleCloseModal} />

      <Card>
        <InstructorTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <InstructorTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'Number', label: 'Number' },
                  { id: 'Total Earning', label: 'Total Earning' },
                  { id: 'Balance', label: 'Balance' },
                  { id: 'WhatsApp Number', label: 'Whatsapp Number' },

                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <InstructorTableRow
                      id={row._id}
                      key={row.id}
                      name={row.name}
                      email={row.email}
                      phone={row.number}
                      totalEarning={row.totalEarning}
                      balance={row.balance}
                      whatsappNumber={row.whatsappNumber}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}

export default InstructorView;
