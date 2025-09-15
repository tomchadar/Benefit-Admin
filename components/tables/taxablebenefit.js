import * as React from 'react';
import { Stack, Button, Typography, Box, Avatar } from '@mui/material';
import * as PlanStatus from '../../constants/planstatus';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as ImgUrl from '../../constants/officeimgurls';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import { useQuery } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import moment from 'moment';

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    // {
    //   field: 'image-url',
    //   headerName: 'image',
    //   width: 100,
    //   renderCell: (params) => {
    //     console.log(params)
    //     return (
    //       <>
    //         <Avatar
    //           src={params.row.avatar}
    //           alt={params.row.firstName}
    //           variant="square"
    //           sx={{ width: 80, height: 80 }}
    //         />
    //       </>
    //     )
    //   },
    // },
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
        width: 100,
        headerAlign: 'center',
        align: 'center',
        editable: true,
        valueGetter: (params) => moment(params.row.endDate).format('L'),
    },
    {
        field: 'activeamount',
        headerName: '    Active        Amount',
        type: 'number',
        headerAlign: 'center',
        align: 'center',
        width: 90,
        editable: true,
        renderCell: (params) => {
            // console.log(params)
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
        field: 'vestamount',
        headerName: '  Vested    Amount',
        type: 'number',
        width: 80,
        headerAlign: 'center',
        align: 'center',
        editable: true,
        renderCell: (params) => {
            // console.log(params)
            return (
                <>
                    {params.row.amountToVest
                        ? Number(params.row.amountToVest).toLocaleString(
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
        field: 'benefit',
        headerName: '  Tax Benefit       (T4 Code 36)',
        headerAlign: 'center',
        // renderHeader: () => (
        //   <strong>
        //     {'Tax Benefit '}
        //     <span role="img" aria-label="enjoy">
        //       🎂
        //     </span>
        //     {'Tax Benefit '}
        //   </strong>
        // ),
        type: 'number',
        width: 120,
        align: 'center',
        editable: true,
        renderCell: (params) => {
            if (!params.row.taxBenefit) return <></>;
            const taxObj = JSON.parse(params.row.taxBenefit);
            return (
                <>
                    {taxObj && taxObj.T4Code36Amt
                        ? taxObj.T4Code36Amt.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : 0}
                </>
            );
        },
    },
    {
        field: 'benefit2',
        headerName: '    Amount         Forgiven   (T4 Code 40)',
        type: 'number',
        width: 100,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            if (!params.row.taxBenefit) return <></>;
            const taxObj = JSON.parse(params.row.taxBenefit);
            return (
                <>
                    {taxObj && taxObj.T4Code40Amt
                        ? taxObj.T4Code40Amt.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                          })
                        : 0}
                </>
            );
        },
    },
];

const rows = [
    {
        id: 1,
        lastName: 'Scott',
        firstName: 'Michael',
        uei: 123456789,
        startdate: '01/01/2022',
        enddate: '01/01/2024',
        actamount: 10000,
        vestamount: 7500,
        benefit: 81.25,
        forgiven: 0,
        avatar: ImgUrl.imgUrlMichael,
        intrate: 3.25,
    },
    {
        id: 2,
        lastName: 'Philbin',
        firstName: 'Darryl',
        uei: 123456789,
        startdate: '01/01/2022',
        enddate: '01/01/2024',
        actamount: 10000,
        vestamount: 5000,
        benefit: 162.5,
        forgiven: 0,
        avatar: ImgUrl.imgUrlDarryl,
        intrate: 3.25,
    },
    {
        id: 3,
        lastName: 'Howard',
        firstName: 'Ryan',
        uei: 123456789,
        startdate: '01/01/2022',
        enddate: '01/01/2024',
        actamount: 10000,
        vestamount: 0,
        benefit: 325,
        forgiven: 0,
        avatar: ImgUrl.imgUrlRyan,
        intrate: 3.25,
    },
    {
        id: 4,
        lastName: 'Beesly',
        firstName: 'Pam',
        uei: 123456789,
        startdate: '01/01/2022',
        enddate: '01/01/2024',
        actamount: 1000,
        vestamount: 0,
        benefit: 0,
        forgiven: 1000,
        avatar: ImgUrl.imgUrlPam,
        intrate: 3.25,
        planstatus: PlanStatus.VESTING_STATUS_EMP_DEPART,
    },
];

export default function TaxableBenefit({ benefitUser }) {
    const [value, setValue] = React.useState(0);
    const [taxRows, setTaxRows] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        console.log(taxRows);
    }, [taxRows]);

    const { data: bonuses } = useQuery(
        ['getPlanById', benefitUser.id],
        EmployeeService.getBonusesByEmployerId
    );

    React.useEffect(() => {
        if (!bonuses) return;
        const rowsData = bonuses.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        // console.log('Bonuses', rowsData);
        setTaxRows(rowsData);
    }, [benefitUser.id, bonuses]);

    return (
        <>
            {/* <Typography variant="h4" component="h6">
        Active Bonuses
      </Typography> */}

            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={taxRows}
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
