import * as React from 'react';
import {
    Stack,
    Button,
    Typography,
    Box,
    Avatar,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Dialog,
    Grid,
} from '@mui/material';
import * as PlanStatus from '../../constants/planstatus';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as ImgUrl from '../../constants/officeimgurls';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import moment from 'moment/moment';
import AddEmployee from '../modals/addnewemployee';
import VestingChart from '../charts/vestingchart';
import { drawerBackground, grayText, primary } from '../../constants/colors';

export default function ActiveLoan({ benefitUser }) {
    const [value, setValue] = React.useState(0);
    const [bonusRows, setBonusRows] = React.useState([]);
    const [vestingModal, setVestingModal] = React.useState(false);
    const [forgiveModal, setForgiveModal] = React.useState(false);
    const [forgiveEmployeeInfo, setForgiveEmployeeInfo] = React.useState({
        name: '',
        nonvested: '',
    });
    const [chartData, setChartData] = React.useState([]);
    const [chartEmoloyeeName, setChartEmoloyeeName] = React.useState('');

    const columns = [
        {
            field: 'fullName',
            headerName: 'Full name',
            headerAlign: 'center',
            align: 'center',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) => {
                return `${params.row.employee?.firstName || ''} ${
                    params.row.employee?.lastName || ''
                }`;
            },
        },
        {
            field: 'uei',
            headerName: 'UEI /Number',
            // type: 'number',
            width: 110,
            headerAlign: 'center',
            align: 'center',
            editable: true,
            valueGetter: (params) => `${params.row.employee.uei}`,
        },
        {
            field: 'startdate',
            headerName: 'Start Date',
            type: 'date',
            width: 95,
            headerAlign: 'center',
            align: 'center',
            editable: true,
            valueGetter: (params) => moment(params.row.startDate).format('L'),
        },
        {
            field: 'enddate',
            headerName: '  Date Left      Company',
            type: 'date',
            width: 95,
            headerAlign: 'center',
            align: 'center',
            editable: true,
            valueGetter: (params) => moment(params.row.endDate).format('L'),
        },
        {
            field: 'activeamount',
            headerName: '    Active      Amount',
            type: 'number',
            width: 78,
            editable: true,
            renderCell: (params) => {
                // console.log(params);
                return (
                    <>
                        {params.row.amount
                            ? Number(params.row.amount).toLocaleString(
                                  'en-US',
                                  {
                                      style: 'currency',
                                      currency: 'USD',
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                  }
                              )
                            : 0}
                    </>
                );
            },
        },
        {
            field: 'vestsch',
            headerName: ' Vesting Schedule',
            width: 78,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log(params);
                return (
                    <>
                        {(params.row.vestsch || true) && (
                            <Button
                                onClick={() => {
                                    setChartEmoloyeeName(
                                        `${params.row.employee.firstName} ${params.row.employee.lastName}`
                                    );
                                    calcVestingData(params.row.id);
                                }}
                            >
                                Vesting
                            </Button>
                        )}
                    </>
                );
            },
        },
        {
            field: 'repaysch',
            headerName: '  Repay   Schedule',
            width: 80,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log(params);
                return (
                    <>
                        {(params.row.vestsch || true) && (
                            <Button
                                onClick={() => {
                                    alert('Display Schedule');
                                }}
                            >
                                Repay
                            </Button>
                        )}
                    </>
                );
            },
        },
        {
            field: 'intrate',
            headerName: 'Effective    Rate',
            type: 'number',
            headerAlign: 'center',
            align: 'center',
            width: 70,
            editable: true,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.interestrate
                            ? `${params.row.interestrate}%`
                            : ''}
                    </>
                );
            },
        },
        {
            field: 'forgive',
            headerName: 'Forgive',
            width: 80,
            editable: false,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                // console.log(params);
                return (
                    <>
                        <Button
                            onClick={() => {
                                defineForgiveModalInfo(params.row.id);
                            }}
                        >
                            Forgive
                        </Button>
                    </>
                );
            },
        },
    ];

    const { data: bonuses } = useQuery(
        ['getPlanById', benefitUser.id],
        EmployeeService.getBonusesByEmployerId
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const calcVestingData = (id) => {
        const data = bonusRows.find((el) => el.id === id);
        calcData(Number(data.amount), data.vestingPeriod);
        handleCloseVestingModal();
    };

    const defineForgiveModalInfo = (id) => {
        const data = bonusRows.find((el) => el.id === id);
        console.log(data);
        setForgiveEmployeeInfo({
            name: `${data.employee.firstName} ${data.employee.lastName}`,
            nonvested: Number(3000).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
        });
        setForgiveModal(!forgiveModal);
    };

    const handleCloseVestingModal = () => {
        if (vestingModal) setChartEmoloyeeName('');
        setVestingModal(!vestingModal);
    };

    const handleCloseForgiveModal = () => {
        if (forgiveModal) setForgiveEmployeeInfo({ name: '', nonvested: '' });
        setForgiveModal(!forgiveModal);
    };

    function calcData(amt, vest) {
        const vestingData = [];

        // add year 0
        vestingData.push({
            name: '0',
            vested: 0,
            nonvested: amt,
        });

        if (vest == 12) {
            // add year 1
            vestingData.push({
                name: '12 Months',
                vested: amt,
                nonvested: 0,
            });
        }

        if (vest == 24) {
            // add year 1
            vestingData.push({
                name: '12 Months',
                vested: amt / 2,
                nonvested: amt / 2,
            });
            // add year 2
            vestingData.push({
                name: '24 Months',
                vested: amt,
                nonvested: 0,
            });
        }

        if (vest == 36) {
            // add year 1
            vestingData.push({
                name: '12 Months',
                vested: amt * 0.333,
                nonvested: amt * 0.667,
            });
            // add year 2
            vestingData.push({
                name: '24 Months',
                vested: amt * 0.667,
                nonvested: amt * 0.333,
            });
            // add year 3
            vestingData.push({
                name: '36 Months',
                vested: amt,
                nonvested: 0,
            });
        }

        setChartData(vestingData);
    }

    React.useEffect(() => {
        if (!bonuses) return;
        const rowsData = bonuses.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });

        setBonusRows(rowsData);
    }, [benefitUser.id, bonuses]);

    return (
        <>
            <Box sx={{ height: 650, width: '100%' }}>
                {/*VESTING MODAL*/}
                <Dialog open={vestingModal} onClose={handleCloseVestingModal}>
                    <DialogTitle>{chartEmoloyeeName} Vesting</DialogTitle>
                    <DialogContent sx={{ height: '400px', width: '600px' }}>
                        <VestingChart chartData={chartData} height={'100%'} />
                    </DialogContent>
                </Dialog>
                {/*FORGIVE MODAL*/}
                <Dialog open={forgiveModal} onClose={handleCloseForgiveModal}>
                    {/*<DialogTitle>{chartEmoloyeeName} Vesting</DialogTitle>*/}
                    <DialogContent sx={{ width: '600px' }}>
                        <DialogContentText>
                            Ok - you&apos;ve chosen to forgive{' '}
                            {forgiveEmployeeInfo.name} outstanding balance of{' '}
                            {forgiveEmployeeInfo.nonvested}.
                            <Typography component={'div'}>
                                They&apos;ll be notified that this has been
                                forgiven.
                            </Typography>
                            <Typography component={'div'} mb={0}>
                                Confirm that you want to do this?
                            </Typography>
                        </DialogContentText>
                        <Grid container>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="end">
                                    <Button
                                        onClick={handleCloseForgiveModal}
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
                                        onClick={handleCloseForgiveModal}
                                    >
                                        Yes
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <DataGrid
                    rows={bonusRows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textOverflow: 'clip',
                            whiteSpace: 'break-spaces',
                            lineHeight: 1,
                        },
                    }}
                />
            </Box>
        </>
    );
}
