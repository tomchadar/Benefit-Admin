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
import CreateTransaction from '../modals/CreateTransaction';
import EditTransactions from '../modals/EditTransactions';

export default function Transactions(props) {
    const [transactionModal, setTransactionModal] = React.useState(false);
    const [editTransactionModal, setEditTransactionModal] =
        React.useState(false);
    const [editTransactionId, setEditTransactionId] = React.useState(null);
    const [deleteTransactionModal, setDeleteTransactionModal] =
        React.useState(false);
    const [deleteTransactionId, setDeleteTransactionId] = React.useState(null);
    const [transactionRows, setTransactionRows] = React.useState([]);

    const { data: transactions, refetch: transactionRefetch } = useQuery(
        'getTransactions',
        EmployeeService.getTransactions
    );

    const { mutateAsync: deleteTransaction, isSuccess: isTransactionDelted } =
        useMutation(EmployeeService.deleteTransaction, {
            onSuccess: () => {
                setDeleteTransactionId(null);
                handleOpenDeleteTransactionModal();
                transactionRefetch();
                successNotify('Transaction has been deleted');
            },
            onError: () => {
                errorNotify('Something went wrong');
            },
        });

    React.useEffect(() => {
        if (isTransactionDelted) transactionRefetch();
    }, [isTransactionDelted]);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'id',
            headerName: 'ID',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.id}`;
            },
        },
        {
            field: 'bankName',
            headerName: 'Bank Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.bankName}`;
            },
        },
        {
            field: 'description',
            headerName: 'Description',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.description}`;
            },
        },
        {
            field: 'ampunt',
            headerName: 'Amount',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
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
            field: 'date',
            headerName: 'Date',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${moment(params.row?.date).format('L')}`;
            },
        },
        // {
        //     field: 'currency',
        //     headerName: 'Currency',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 130,
        //     headerAlign: 'center',
        //     align: 'center',
        //     valueGetter: (params) => {
        //         return `${params.row?.firstName || ''} ${
        //             params.row?.lastName || ''
        //         }`;
        //     },
        // },
        {
            field: 'externalId',
            headerName: 'External Id',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.externalId}`;
            },
        },
        {
            field: 'paymentSystem',
            headerName: 'Payment System',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.paymentSystem}`;
            },
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.company?.companyName}`;
            },
        },
        {
            field: 'employeeName',
            headerName: 'Employee Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
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
            field: 'editTransaction',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <div style={{ marginRight: '10px' }}>
                            <Tooltip title="Edit transaction">
                                <Button
                                    onClick={() =>
                                        handleEditTransaction(params.row)
                                    }
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
                        <div>
                            <Tooltip title={'Delete transaction'}>
                                <Button
                                    onClick={() => {
                                        setDeleteTransactionId(params.row._id);
                                        handleOpenDeleteTransactionModal();
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
                    </>
                );
            },
        },
    ];

    async function handleDeleteTransaction() {
        await deleteTransaction(deleteTransactionId);
    }

    async function handleEditTransaction(data) {
        setEditTransactionId(data.id);
        setEditTransactionModal(!editTransactionModal);
    }

    function handleOpenDeleteTransactionModal() {
        setDeleteTransactionModal(!deleteTransactionModal);
    }

    function handleCreateTransaction() {
        setTransactionModal(true);
    }

    function handleCloseTransaction() {
        setTransactionModal(false);
    }

    function handleCloseTransactionModal() {
        setEditTransactionModal(!editTransactionModal);
    }

    React.useEffect(() => {
        if (!transactions) return;
        const rowsData = transactions.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log('TRANSACTIONS: ', rowsData);
        setTransactionRows(rowsData);
    }, [transactionModal, transactions]);

    return (
        <>
            <div>
                <Dialog
                    open={transactionModal}
                    onClose={handleCloseTransaction}
                >
                    <DialogTitle>Create Transaction</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the transaction details and click save
                            to create new transaction
                        </DialogContentText>
                        <CreateTransaction
                            setTransactionModal={setTransactionModal}
                            handleCloseTransaction={handleCloseTransaction}
                            transactionRefetch={transactionRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={editTransactionModal}
                    onClose={handleCloseTransactionModal}
                >
                    <DialogTitle>Edit Employer</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the employer details and click save to
                            edit the employer
                        </DialogContentText>
                        <EditTransactions
                            transactionId={editTransactionId}
                            setTransactionModal={setEditTransactionModal}
                            handleCloseTransactionModal={
                                handleCloseTransactionModal
                            }
                            transactionRefetch={transactionRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={deleteTransactionModal}
                    onClose={handleOpenDeleteTransactionModal}
                >
                    <DialogTitle>Delete transaction</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Are you sure you want to delete transaction?
                        </DialogContentText>
                        <Grid container mt={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="end">
                                    <Button
                                        onClick={
                                            handleOpenDeleteTransactionModal
                                        }
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
                                        onClick={handleDeleteTransaction}
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
                    rows={transactionRows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
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
                    onClick={handleCreateTransaction}
                >
                    <AddIcon fontSize="small" style={{ marginRight: 5 }} />
                    Create Transaction
                </Button>
            </Box>
        </>
    );
}
