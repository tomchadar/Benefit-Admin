import React, { useContext } from 'react';
import {
    Typography,
    Box,
    Avatar,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Chip,
    IconButton,
    Tooltip,
    MenuItem,
    Grid,
} from '@mui/material';

import * as Pages from '../../constants/pages';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddAdmin from '../modals/AddAdmin';
import * as PlanStatus from '../../constants/planstatus';
import { drawerBackground, grayText, primary } from '../../constants/colors';
// import AddIcon from '../assets/svg/add.svg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment/moment';
import { errorNotify, successNotify } from '../notifications/notify';
import { planTypes } from '../../constants/planTypes';
import EditEmployee from '../modals/EditEmployee';
import EditAdmin from '../modals/EditAdmin';

export default function EmployeeList(props) {
    const [employeeModal, setEmployeeModal] = React.useState(false);
    const [deleteEmployeeModal, setDeleteEmployeeModal] = React.useState(false);
    const [deleteEmployeeId, setDeleteEmployeeId] = React.useState(null);
    const [editEmployeeModal, setEditEmployeeModal] = React.useState(false);
    const [editEmployeeId, setEditEmployeeId] = React.useState(null);
    const [employeeRows, setEmployeeRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const { data: employees, refetch: employeesRefetch } = useQuery(
        'getAllAdmins',
        EmployeeService.getAllAdmins
    );

    const { mutateAsync: deleteEmployee, isSuccess: isEmployeeDeleted } =
        useMutation(EmployeeService.deleteEmployee, {
            onSuccess: () => {
                setDeleteEmployeeId(null);
                handleOpenDeleteEmployeeModal();
                employeesRefetch();
                successNotify('Employee has been deleted');
            },
            onError: () => {
                errorNotify('Something went wrong');
            },
        });

    function getStatusColor(status) {
        if (status === PlanStatus.VESTING_STATUS_VESTING) return '#FFF4E6';
        if (status === PlanStatus.VESTING_STATUS_VESTED) return '#FFF4E6';
        if (status === PlanStatus.VESTING_STATUS_IN_DEFAULT) return '#F1F3F5';
        if (status === PlanStatus.VESTING_STATUS_EMP_DEPART) return '#E3FAFC';
        else {
            return '#F0FFF8';
        }
    }

    function getFontColor(status) {
        if (status === PlanStatus.VESTING_STATUS_VESTING) return '#FD7E14';
        if (status === PlanStatus.VESTING_STATUS_VESTED) return '#FD7E14';
        if (status === PlanStatus.VESTING_STATUS_IN_DEFAULT) return '#868E96';
        if (status === PlanStatus.VESTING_STATUS_EMP_DEPART) return '#15AABF';
        else {
            return '#18AB56';
        }
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'image-url',
            headerName: 'Image',
            width: 70,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                // console.log(params)
                return (
                    <>
                        <img
                            src={imgUrl}
                            alt="Benefit"
                            style={{ borderRadius: 200 }}
                            width={30}
                            height={30}
                        />
                    </>
                );
            },
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => {
                return `${params.row?.firstName || ''} ${
                    params.row?.lastName || ''
                }`;
            },
        },
        {
            field: 'email',
            headerName: 'Admin Email',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            // editable: true,
            valueGetter: (params) => `${params.row?.email}`, // must be id
        },
        {
            field: 'isActivated',
            headerName: 'Is Activated',
            headerAlign: 'center',
            align: 'center',
            width: 100,
            // editable: true,

            renderCell: (params) => {
                // console.log(params)
                return (
                    <>
                        {params.row?.isActivated ? (
                            <Tooltip title="Active">
                                <div
                                    style={{
                                        padding: 5,
                                        borderRadius: 8,
                                        backgroundColor: 'rgb(4,155,87)',
                                        color: '#fff',
                                    }}
                                >
                                    <Typography fontSize={16}>
                                        Active
                                    </Typography>
                                </div>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Not Active">
                                <div
                                    style={{
                                        padding: 5,
                                        borderRadius: 8,
                                        backgroundColor: 'rgb(128,133,131)',
                                        color: '#fff',
                                    }}
                                >
                                    <Typography fontSize={15}>
                                        Not Active
                                    </Typography>
                                </div>
                            </Tooltip>
                        )}
                    </>
                );
            },
        },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     width: 160,
        //     editable: false,
        //     align: 'center',
        //     headerAlign: 'center',
        //     renderCell: (params) => {
        //         return (
        //             <div
        //                 style={{
        //                     display: 'flex',
        //                     justifyContent: 'space-between',
        //                     width: '100%',
        //                 }}
        //             >
        //                 <Tooltip title={'Delete Admin'}>
        //                     <Button
        //                         onClick={() => {
        //                             setDeleteEmployeeId(params.row._id);
        //                             handleOpenDeleteEmployeeModal();
        //                         }}
        //                         style={{
        //                             padding: 5,
        //                             borderRadius: 8,
        //                             border: '1px solid #FF635E',
        //                             color: primary,
        //                         }}
        //                     >
        //                         <DeleteIcon fontSize="small" />
        //                     </Button>
        //                 </Tooltip>
        //                 <Tooltip title={'Edit Admin'}>
        //                     <Button
        //                         onClick={() => {
        //                             setEditEmployeeId(params.row._id);
        //                             handleOpenEditEmployeeModal();
        //                         }}
        //                         style={{
        //                             padding: 5,
        //                             borderRadius: 8,
        //                             border: '1px solid #FF635E',
        //                             color: primary,
        //                         }}
        //                     >
        //                         <EditIcon fontSize="small" />
        //                     </Button>
        //                 </Tooltip>
        //             </div>
        //         );
        //     },
        // },
    ];

    async function handleDeleteEmployee() {
        await deleteEmployee(deleteEmployeeId);
    }

    function handleOpenDeleteEmployeeModal() {
        setDeleteEmployeeModal(!deleteEmployeeModal);
    }

    function handleOpenEditEmployeeModal() {
        setEditEmployeeModal(!editEmployeeModal);
    }

    function handleAddEmployee() {
        // open employee modal
        setEmployeeModal(true);
    }

    function handleCloseEmployee() {
        // open employee modal
        setEmployeeModal(false);
    }

    function handleCreatePlan(employee) {
        // set employee
        props.setEmployee([employee]);

        // move to create plan page
        props.setCurrentPage(Pages.CREATEPLAN_PAGE);
    }

    React.useEffect(() => {
        if (!employees) return;
        const rowsData = employees.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log('EMPLOYEES: ', rowsData);
        setEmployeeRows(rowsData);
    }, [employeeModal, employees]);

    return (
        <>
            <div>
                <Dialog open={employeeModal} onClose={handleCloseEmployee}>
                    <DialogTitle>Add Admin</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the employee details and click save to
                            add a new employee
                        </DialogContentText>
                        <AddAdmin
                            setEmployeeModal={setEmployeeModal}
                            handleCloseEmployee={handleCloseEmployee}
                            employeesRefetch={employeesRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={editEmployeeModal}
                    onClose={handleOpenEditEmployeeModal}
                >
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the employee details and click save to
                            edit an employee
                        </DialogContentText>
                        <EditAdmin
                            setEmployeeModal={setEditEmployeeModal}
                            handleCloseEmployee={handleOpenEditEmployeeModal}
                            employeesRefetch={employeesRefetch}
                            adminId={editEmployeeId}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={deleteEmployeeModal}
                    onClose={handleOpenDeleteEmployeeModal}
                >
                    <DialogTitle>Delete employee&apos;s account</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Are you sure you want to delete an admin account?
                        </DialogContentText>
                        <Grid container mt={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="end">
                                    <Button
                                        onClick={handleOpenDeleteEmployeeModal}
                                        variant="outlined"
                                        style={{
                                            marginRight: 10,
                                            borderColor: grayText,
                                            color: drawerBackground,
                                        }}
                                    >
                                        No
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: primary,
                                        }}
                                        onClick={handleDeleteEmployee}
                                    >
                                        Yes
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
            <Box sx={{ width: '100%', position: 'relative' }}>
                <DataGrid
                    autoHeight
                    rows={employeeRows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    // checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = employeeRows.filter((row) =>
                            selectedIDs.has(row.id)
                        );
                        setSelectedRows(selectedRows);
                    }}
                    on
                    disableSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textOverflow: 'clip',
                            whiteSpace: 'break-spaces',
                            lineHeight: 1,
                        },
                    }}
                />
                <Button
                    sx={{
                        borderColor: drawerBackground,
                        color: drawerBackground,
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                    variant="outlined"
                    onClick={handleAddEmployee}
                >
                    <AddIcon fontSize="small" style={{ marginRight: 5 }} />
                    Add Admin
                </Button>
            </Box>
        </>
    );
}
