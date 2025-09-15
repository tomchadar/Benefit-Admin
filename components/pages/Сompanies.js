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
import UpdateIcon from '@mui/icons-material/Update';

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
import * as Pages from '../../constants/pages';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as PlanStatus from '../../constants/planstatus';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment/moment';
import { errorNotify, successNotify } from '../notifications/notify';
import AddNewCompany from '../modals/AddNewCompany';
import EditCompany from '../modals/EditCompany';

export default function Companies(props) {
    const [companyModal, setCompanyModal] = React.useState(false);
    const [editCompanyModal, setEditCompanyModal] = React.useState(false);
    const [editCompanyId, setEditCompanyId] = React.useState(null);
    const [deleteCompanyModal, setDeleteCompanyModal] = React.useState(false);
    const [deleteCompanyId, setDeleteCompanyId] = React.useState(null);
    const [companiesRows, setCompaniesRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const { data: companies, refetch: companiesRefetch } = useQuery(
        'getCompanies',
        EmployeeService.getCompanies
    );

    const { mutateAsync: deleteCompany, isSuccess: isCompanyDeleted } =
        useMutation(EmployeeService.deleteCompany, {
            onSuccess: () => {
                setDeleteCompanyId(null);
                handleOpenDeleteCompanyModal();
                companiesRefetch();
                successNotify('Company has been deleted');
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
            field: 'companyName',
            headerName: 'Company name',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 140,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.companyName || ''}`;
            },
        },
        {
            field: 'companyCountry',
            headerName: 'Country',
            headerAlign: 'center',
            align: 'center',
            width: 170,
            // editable: true,
            valueGetter: (params) => `${params.row.companyCountry}`, // must be id
        },
        {
            field: 'companyCity',
            headerName: 'City',
            headerAlign: 'center',
            align: 'center',
            width: 170,
            // editable: true,
            valueGetter: (params) => `${params.row.companyCity}`, // must be id
        },
        {
            field: 'companyAddress',
            headerName: 'Address',
            headerAlign: 'center',
            align: 'center',
            width: 210,
            // editable: true,
            valueGetter: (params) => `${params.row.companyAddress}`, // must be id
        },
        {
            field: 'companyZipCode',
            headerName: 'Zip Code',
            headerAlign: 'center',
            align: 'center',
            width: 170,
            // editable: true,
            valueGetter: (params) => `${params.row.zipCode}`, // must be id
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
                                onClick={() => {
                                    props.setCompanyFilter(params.row?._id);
                                    props.setCurrentPage(
                                        Pages.COMPANY_LIST_PAGE
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
            field: 'actionsList',
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
                        <Tooltip title={'Edit Company'}>
                            <Button
                                onClick={() => {
                                    setEditCompanyId(params.row._id);
                                    handleCloseEditModal();
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
                        <Tooltip title={'Delete Company'}>
                            <Button
                                onClick={() => {
                                    setDeleteCompanyId(params.row._id);
                                    handleOpenDeleteCompanyModal();
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

    async function handleDeleteCompany() {
        await deleteCompany(deleteCompanyId);
    }

    function handleOpenDeleteCompanyModal() {
        setDeleteCompanyModal(!deleteCompanyModal);
    }

    function handleAddEmployee() {
        // open employee modal
        setCompanyModal(true);
    }

    function handleCloseEmployee() {
        // open employee modal
        setCompanyModal(false);
    }

    function handleCloseEditModal() {
        setEditCompanyModal(!editCompanyModal);
    }

    function handleCreatePlan(employee) {
        // set employee
        props.setEmployee([employee]);

        // move to create plan page
        props.setCurrentPage(Pages.CREATEPLAN_PAGE);
    }

    React.useEffect(() => {
        if (!companies) return;
        const rowsData = companies.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log('Companies: ', rowsData);
        setCompaniesRows(rowsData);
    }, [companyModal, companies]);

    return (
        <>
            <div>
                <Dialog open={companyModal} onClose={handleCloseEmployee}>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the company details and click save to
                            add a new company
                        </DialogContentText>
                        <AddNewCompany
                            setCompanyModal={setCompanyModal}
                            handleCloseEmployee={handleCloseEmployee}
                            employeesRefetch={companiesRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog open={editCompanyModal} onClose={handleCloseEditModal}>
                    <DialogTitle>Edit Company</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the company details and click save to
                            edit a company
                        </DialogContentText>
                        <EditCompany
                            companyId={editCompanyId}
                            setCompanyModal={setEditCompanyModal}
                            handleCloseEmployee={handleCloseEditModal}
                            employeesRefetch={companiesRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={deleteCompanyModal}
                    onClose={handleOpenDeleteCompanyModal}
                >
                    <DialogTitle>Delete company</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Are you sure you want to delete company?
                        </DialogContentText>
                        <Grid container mt={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="end">
                                    <Button
                                        onClick={handleOpenDeleteCompanyModal}
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
                                        onClick={handleDeleteCompany}
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
                    rows={companiesRows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    // checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = companiesRows.filter((row) =>
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
                    Add Company
                </Button>
            </Box>
        </>
    );
}
