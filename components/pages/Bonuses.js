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
    Link,
} from '@mui/material';
import { Amplify, Logger, Hub, ConsoleLogger } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';

import * as Pages from '../../constants/pages';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddEmployee from '../modals/addnewemployee';
import CancelIcon from '@mui/icons-material/Cancel';
// import AddBoxIcon from '@mui/icons-material/AddBox'
import AddBoxIcon from '@mui/icons-material/AddCircle';
import * as PlanStatus from '../../constants/planstatus';
import * as Images from '../../constants/officeimgurls';
import { drawerBackground, grayText, primary } from '../../constants/colors';
// import AddIcon from '../assets/svg/add.svg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddIconOutline from '../assets/svg/add_outline.svg';
import Close from '../assets/svg/close.svg';
import { useMutation, useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment/moment';
import { errorNotify, successNotify } from '../notifications/notify';
import { planTypes } from '../../constants/planTypes';
import EditCompany from '../modals/EditCompany';
import EditEmployer from '../modals/EditEmployer';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function Bonuses(props) {
    const [employerModal, setEmployerModal] = React.useState(false);
    const [editEmployerModal, setEditEmployerModal] = React.useState(false);
    const [editEmployerId, setEditEmployerId] = React.useState(null);
    const [deleteEmployerModal, setDeleteEmployerModal] = React.useState(false);
    const [deleteEmployerId, setDeleteEmployerId] = React.useState(null);
    const [bonusesRows, setBonusesRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const { data: bonuses, refetch: refetchBonuses } = useQuery(
        'getBonuses',
        EmployeeService.getBonusesByEmployee
    );

    const { mutateAsync: deleteEmployer, isSuccess: isEmployerDeleted } =
        useMutation(EmployeeService.deleteEmployer, {
            onSuccess: () => {
                setDeleteEmployerId(null);
                handleOpenDeleteEmployerModal();
                refetchBonuses();
                successNotify('Employer has been deleted');
            },
            onError: () => {
                errorNotify('Something went wrong');
            },
        });

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'id',
            headerName: 'ID',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            valueGetter: (params) => {
                return `${params.row?.id}`;
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 110,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${
                    params?.row?.amount
                        ? parseFloat(params?.row?.amount).toLocaleString(
                              'en-US',
                              {
                                  style: 'currency',
                                  currency: 'USD',
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                              }
                          )
                        : ''
                }`;
            },
        },
        {
            field: 'employerName',
            headerName: 'Employer Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip
                            title=""
                            onClick={() =>
                                console.log(params.row?.employer?.id)
                            }
                            style={{
                                color: '#1976d2',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography fontSize={16}>
                                {params.row?.employer?.firstName}{' '}
                                {params.row?.employer?.lastName}
                            </Typography>
                        </Tooltip>
                    </>
                );
            },
        },
        {
            field: 'EmployeeName',
            headerName: 'Employee Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip
                            title=""
                            onClick={() =>
                                console.log(params.row?.employee?.id)
                            }
                            style={{
                                color: '#1976d2',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography fontSize={16}>
                                {params.row?.employee?.firstName}{' '}
                                {params.row?.employee?.lastName}
                            </Typography>
                        </Tooltip>
                    </>
                );
            },
        },
        {
            field: 'InterestRate',
            headerName: 'Interest Rate',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.signedBonus?.percentage}`;
            },
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => moment(params.row?.startDate).format('L'),
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => moment(params.row?.endDate).format('L'),
        },
        {
            field: 'planType',
            headerName: 'Plan Type',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return params.row?.planType
                    ? planTypes[params.row.planType]
                    : '';
            },
        },
        {
            field: 'isForgive',
            headerName: 'Is Forgive',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return params.row?.isForgive ? 'true' : 'false';
            },
        },
        {
            field: 'vestingCliff',
            headerName: 'Vesting Cliff',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 110,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.vestingCliff}`;
            },
        },
        {
            field: 'vestingPeriod',
            headerName: 'Vesting Period',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 110,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.vestingPeriod}`;
            },
        },
        {
            field: 'vestingFreq',
            headerName: 'Vesting Freq',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 110,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.vestingFreq}`;
            },
        },
        {
            field: 'document',
            headerName: 'Document',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 110,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log(params);
                return (
                    <>
                        {params.row?.docs3FileKey && (
                            <Link
                                href={params.row?.docs3FileKey}
                                // target="_blank"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(params.row.docs3FileKey);
                                }}
                            >
                                <CloudDownloadIcon />
                            </Link>
                        )}
                    </>
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
        if (!bonuses) return;
        const rowsData = bonuses.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log('BONUSES: ', rowsData);
        setBonusesRows(rowsData);
    }, [employerModal, bonuses]);

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
                        <AddEmployee
                            setEmployeeModal={setEmployerModal}
                            handleCloseEmployee={handleCloseEmployer}
                            employeesRefetch={refetchBonuses}
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
                            companyId={editEmployerId}
                            setCompanyModal={setEditEmployerModal}
                            handleCloseEmployee={handleCloseEmployerModal}
                            employeesRefetch={refetchBonuses}
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
                    rows={bonusesRows}
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
                    Create Bonus
                </Button>
            </Box>
        </>
    );
}
