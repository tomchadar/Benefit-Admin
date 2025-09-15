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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

import * as Pages from '../../constants/pages';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddEmployee from '../modals/addnewemployee';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment/moment';
import { errorNotify, successNotify } from '../notifications/notify';
import { planTypes } from '../../constants/planTypes';
import EditEmployee from '../modals/EditEmployee';
import CircularProgress from '@mui/material/CircularProgress';

export default function EmployeesListByEmployer(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [employeeModal, setEmployeeModal] = React.useState(false);
    const [deleteEmployeeModal, setDeleteEmployeeModal] = React.useState(false);
    const [deleteEmployeeId, setDeleteEmployeeId] = React.useState(null);
    const [editEmployeeModal, setEditEmployeeModal] = React.useState(false);
    const [editEmployeeId, setEditEmployeeId] = React.useState(null);
    const [employeeRows, setEmployeeRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const {
        data: employees,
        refetch: employeesRefetch,
        isSuccess,
    } = useQuery(
        'getPlanById',
        () => EmployeeService.getEmployees(props.employeeFilter),
        {
            enabled: !!props.employeeFilter,
            cacheTime: 0,
        }
    );

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [isSuccess]);

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

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'image-url',
            headerName: 'image',
            width: 70,
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
            valueGetter: (params) => {
                return `${params.row?.firstName || ''} ${
                    params.row?.lastName || ''
                }`;
            },
        },
        {
            field: 'eid',
            headerName: 'Employee Id',
            headerAlign: 'center',
            align: 'center',
            width: 130,
            // editable: true,
            valueGetter: (params) => `${params.row.employeeId}`, // must be id
        },
        {
            field: 'uei',
            headerName: 'UEI /Number',
            headerAlign: 'center',
            align: 'center',
            width: 100,
            // editable: true,
            valueGetter: (params) => `${params.row.uei}`,
        },
        {
            field: 'startdate',
            headerName: '  Employee     Start Date',
            type: 'date',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            // editable: true,
            valueGetter: (params) => moment(params.row.startDate).format('L'),
        },
        {
            field: 'dept',
            headerName: 'Department',
            width: 180,
            // editable: true,
            headerAlign: 'center',
            align: 'center',
            // renderCell: (params) => {
            //   console.log(params)
            //   return <>{params.row.dept}</>
            // },
            valueGetter: (params) => `${params.row.departmentId}`,
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            width: 180,
            // editable: true,
            headerAlign: 'center',
            align: 'center',
            // renderCell: (params) => {
            //   console.log(params)
            //   return <>{params.row.dept}</>
            // },
            valueGetter: (params) =>
                `${params.row?.company?.companyName || ''}`,
        },
        {
            field: 'planstatus',
            headerName: 'Plan Status',
            width: 100,
            editable: false,
            align: 'center',
            renderCell: (params) => {
                // console.log(params)
                return (
                    <>
                        {params.row?.bonus?.planStatus === 'active' ? (
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
        {
            field: 'planType',
            headerName: 'Plan Type',
            width: 150,
            // editable: true,
            headerAlign: 'center',
            align: 'center',
            // renderCell: (params) => {
            //   console.log(params)
            //   return <>{params.row.dept}</>
            // },
            valueGetter: (params) => {
                return params.row?.bonus?.planType
                    ? planTypes[params.row.bonus.planType]
                    : '';
            },
        },
        {
            field: 'Bonus Plan',
            headerName: 'Bonus Plan',
            width: 240,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                // console.log(params)
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        {!params.row.bonus ? (
                            <Tooltip title="Assign new bonus plan">
                                <Button
                                    onClick={() => handleCreatePlan(params.row)}
                                    style={{
                                        padding: 5,
                                        borderRadius: 8,
                                        border: '1px solid #FF635E',
                                        color: primary,
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Edit bonus plan">
                                <Button
                                    onClick={() => handleCreatePlan(params.row)}
                                    style={{
                                        padding: 5,
                                        borderRadius: 8,
                                        border: '1px solid #FF635E',
                                        color: primary,
                                    }}
                                >
                                    <AttachMoneyIcon fontSize="small" />
                                </Button>
                            </Tooltip>
                        )}
                        <Tooltip title={'Delete employee'}>
                            <Button
                                onClick={() => {
                                    setDeleteEmployeeId(params.row._id);
                                    handleOpenDeleteEmployeeModal();
                                }}
                                style={{
                                    padding: 5,
                                    borderRadius: 8,
                                    border: '1px solid #FF635E',
                                    color: primary,
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                        <Tooltip title={'Edit employee'}>
                            <Button
                                onClick={() => {
                                    setEditEmployeeId(params.row._id);
                                    handleOpenEditEmployeeModal();
                                }}
                                style={{
                                    padding: 5,
                                    borderRadius: 8,
                                    border: '1px solid #FF635E',
                                    color: primary,
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                    </div>
                );
            },
        },
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

    return isLoading ? (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            <CircularProgress size={100} />
        </Box>
    ) : (
        <>
            <div>
                <Dialog open={employeeModal} onClose={handleCloseEmployee}>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the employee details and click save to
                            add a new employee
                        </DialogContentText>
                        <AddEmployee
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
                        <EditEmployee
                            setEmployeeModal={setEditEmployeeModal}
                            handleCloseEmployee={handleOpenEditEmployeeModal}
                            employeesRefetch={employeesRefetch}
                            employeeId={editEmployeeId}
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
                            Are you sure you want to delete an employee’s
                            account?
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
                    Add Employee
                </Button>
            </Box>
        </>
    );
}
