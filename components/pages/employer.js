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
    Tooltip,
    Grid,
} from '@mui/material';

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
import * as Pages from '../../constants/pages';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { errorNotify, successNotify } from '../notifications/notify';
import EditEmployer from '../modals/EditEmployer';
import AddEmployer from '../modals/AddEmployer';
import { EMPLOYEE_LIST_PAGE } from '../../constants/pages';

export default function EmployerList(props) {
    const [employerModal, setEmployerModal] = React.useState(false);
    const [editEmployerModal, setEditEmployerModal] = React.useState(false);
    const [editEmployerId, setEditEmployerId] = React.useState(null);
    const [deleteEmployerModal, setDeleteEmployerModal] = React.useState(false);
    const [deleteEmployerId, setDeleteEmployerId] = React.useState(null);
    const [employerRows, setEmployerRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const { data: employers, refetch: employersRefetch } = useQuery(
        'getEmployers',
        EmployeeService.getEmployers
    );

    React.useEffect(() => {
        props.setEmployeeFilter(null);
    }, []);

    const { mutateAsync: deleteEmployer, isSuccess: isEmployerDeleted } =
        useMutation(EmployeeService.deleteEmployer, {
            onSuccess: () => {
                setDeleteEmployerId(null);
                handleOpenDeleteEmployerModal();
                employersRefetch();
                successNotify('Employer has been deleted');
            },
            onError: () => {
                errorNotify('Something went wrong');
            },
        });

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'image-url',
            headerName: 'Image',
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
            field: 'isActivated',
            headerName: 'Is Activated',
            width: 100,
            editable: false,
            align: 'center',
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
        {
            field: 'company',
            headerName: 'Company name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.company?.companyName || ''}`;
            },
        },
        {
            field: 'employee',
            headerName: 'Employees',
            headerAlign: 'center',
            align: 'center',
            width: 100,
            // editable: true,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Show Employees">
                            <Button
                                // onClick={() => handleCreatePlan(params.row)}
                                onClick={() => {
                                    props.setEmployeeFilter(params.row.id);
                                    props.setCurrentPage(
                                        Pages.EMPLOYEE_LIST_PAGE
                                    );
                                }}
                                style={{
                                    padding: 5,
                                    borderRadius: 8,
                                    border: '1px solid #FF635E',
                                    color: primary,
                                }}
                            >
                                <VisibilityIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                    </>
                );
            }, // must be id
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
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
                        <Tooltip title={'Edit Employer'}>
                            <Button
                                onClick={() => {
                                    setEditEmployerId(params.row._id);
                                    handleCloseEmployerModal();
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
                        <Tooltip title={'Delete Employer'}>
                            <Button
                                onClick={() => {
                                    setDeleteEmployerId(params.row._id);
                                    handleOpenDeleteEmployerModal();
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
                    </div>
                );
            },
        },
    ];

    async function handleDeleteEmployer() {
        await deleteEmployer(deleteEmployerId);
    }

    function handleOpenDeleteEmployerModal() {
        setDeleteEmployerModal(!deleteEmployerModal);
    }

    function handleAddEmployer() {
        // open employee modal
        setEmployerModal(true);
    }

    function handleCloseEmployer() {
        // open employee modal
        setEmployerModal(false);
    }

    function handleCloseEmployerModal() {
        setEditEmployerModal(!editEmployerModal);
    }

    function handleCreatePlan(employer) {
        // set employee
        props.setEmployee([employer]);

        // move to create plan page
        props.setCurrentPage(Pages.CREATEPLAN_PAGE);
    }

    React.useEffect(() => {
        if (!employers) return;
        const rowsData = employers.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        setEmployerRows(rowsData);
    }, [employerModal, employers]);

    return (
        <>
            <div>
                <Dialog open={employerModal} onClose={handleCloseEmployer}>
                    <DialogTitle>Add New Employer</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the employer details and click save to
                            add a new employer
                        </DialogContentText>
                        <AddEmployer
                            setEmployerModal={setEmployerModal}
                            handleCloseEmployee={handleCloseEmployer}
                            employersRefetch={employersRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={editEmployerModal}
                    onClose={handleCloseEmployerModal}
                >
                    <DialogTitle>Edit Employer</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the employer details and click save to
                            edit the employer
                        </DialogContentText>
                        <EditEmployer
                            userId={editEmployerId}
                            setEmployerModal={setEditEmployerModal}
                            handleCloseEmployee={handleCloseEmployerModal}
                            employersRefetch={employersRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={deleteEmployerModal}
                    onClose={handleOpenDeleteEmployerModal}
                >
                    <DialogTitle>Delete employers account</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Are you sure you want to delete an employers
                            account?
                        </DialogContentText>
                        <Grid container mt={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="end">
                                    <Button
                                        onClick={handleOpenDeleteEmployerModal}
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
                                        onClick={handleDeleteEmployer}
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
                    rows={employerRows}
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
                    onClick={handleAddEmployer}
                >
                    <AddIcon fontSize="small" style={{ marginRight: 5 }} />
                    Add Employer
                </Button>
            </Box>
        </>
    );
}
