import * as React from 'react';
import { Stack, Button, Typography, Box, Avatar, Link } from '@mui/material';
import * as PlanStatus from '../../constants/planstatus';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as ImgUrl from '../../constants/officeimgurls';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import moment from 'moment';

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
        // editable: true,
        valueGetter: (params) => `${params.row.employee.uei}`,
    },
    {
        field: 'startdate',
        headerName: 'Start Date',
        type: 'date',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        // editable: true,
        valueGetter: (params) => moment(params.row.startDate).format('L'),
    },
    {
        field: 'enddate',
        headerName: '   Vesting        End Date',
        type: 'date',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        // editable: true,
        valueGetter: (params) => moment(params.row.endDate).format('L'),
    },
    {
        field: 'activeamount',
        headerName: 'Active Amount',
        type: 'number',
        width: 70,
        headerAlign: 'center',
        align: 'center',
        // editable: true,
        renderCell: (params) => {
            // console.log(params);
            return (
                <>
                    {params.row.amount
                        ? Number(params.row.amount).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                          })
                        : 0}
                </>
            );
        },
    },
    {
        field: 'amounttovest',
        headerName: 'Amount To Vest',
        type: 'number',
        width: 70,
        headerAlign: 'center',
        align: 'center',
        // editable: true,
        renderCell: (params) => {
            // console.log(params);
            return (
                <>
                    {params.row.amountToVest
                        ? params.row.amountToVest.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                          })
                        : 0}
                </>
            );
        },
    },
    {
        field: 'vestsch',
        headerName: 'Vesting Schedule',
        width: 90,
        editable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            // console.log(params);
            return (
                <>
                    {params.vestsch && (
                        <Button
                            onClick={() => {
                                alert('Display Schedule');
                            }}
                        >
                            Schedule
                        </Button>
                    )}
                </>
            );
        },
    },
    {
        field: 'docs',
        headerName: 'Documents',
        width: 100,
        editable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            // console.log(params);
            return (
                <>
                    {params.row.docs3FileKey && (
                        <Link
                            href={params.row.docs3FileKey}
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
    // {
    //   field: 'dept',
    //   headerName: 'Department',
    //   width: 100,
    //   editable: true,
    //   headerAlign: 'center',
    //   align: 'center',
    //   // renderCell: (params) => {
    //   //   console.log(params)
    //   //   return <>{params.row.dept}</>
    //   // },
    // },
    {
        field: 'terminate',
        headerName: '  Terminate         Plan',
        width: 100,
        editable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            // console.log(params);
            return (
                <>
                    {params.vestsch && (
                        <Button
                            onClick={() => {
                                alert('Terminate');
                            }}
                        >
                            Terminate
                        </Button>
                    )}
                </>
            );
        },
    },
];

export default function ActiveBonus({ benefitUser }) {
    const [value, setValue] = React.useState(0);
    const [bonusRows, setBonusRows] = React.useState([]);

    React.useEffect(() => {
        // console.log(bonusRows);
    }, [bonusRows]);

    const { data: bonuses } = useQuery(
        ['getPlanById', benefitUser.id],
        EmployeeService.getBonusesByEmployerId
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        if (!bonuses) return;
        const rowsData = bonuses.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log('Bonuses', rowsData);
        setBonusRows(rowsData);
    }, [benefitUser.id, bonuses]);

    return (
        <>
            {/* <Typography variant="h4" component="h6">
        Active Bonuses
      </Typography> */}

            {/* <Stack direction="row" spacing={2} style={{ paddingBottom: 10 }}>
        <Button variant="contained">Button 1</Button>
        <Button variant="contained">Button 2</Button>
      </Stack> */}

            <Box sx={{ height: 650, width: '100%' }}>
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
