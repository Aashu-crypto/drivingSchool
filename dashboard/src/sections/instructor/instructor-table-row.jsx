import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InstructorDialog from './insturctor-dialog';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

export default function InstructorTableRow({
  selected,
  name,
  email,
  avatarUrl,
  company,
  role,
  balance,
  phone,
  totalEarning,
  isVerified,
  status,
  handleClick,
  whatsappNumber,
  id,
}) {
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const instructorData = useSelector((state) => state.instructor.instructor);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleEditMenu = () => {
    console.log('data', instructorData);
    console.log('flatData', instructorData.flat());
    setOpenModal(true);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteMenu = async () => {
    console.log('Id', typeof id);
    setOpen(null);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/Instuctor/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log('Delete response:', data);
      setOpen(null);

      if (response.ok) {
        alert('Instructor deleted successfully');
        // Handle successful deletion (e.g., update UI)
      } else {
        alert('Failed to delete instructor');
        // Handle failure
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting instructor');
    }
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phone}</TableCell>
        <TableCell>{totalEarning}</TableCell>
        <TableCell>{balance}</TableCell>
        <TableCell>{whatsappNumber}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <InstructorDialog openModal={openModal} handleCloseModal={handleCloseModal} edit='1' id={id} />

        <MenuItem onClick={handleDeleteMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

InstructorTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
