import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { grayText, primary } from '../../constants/colors';
import moment from 'moment';

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

export default function EmployeeCard({ employee }) {
    return (
        <div
            style={{
                padding: '20px',
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                border: '1px solid #DEE2E6',
                borderRadius: '10px',
                marginBottom: '30px',
                marginTop: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    borderRightStyle: 'solid',
                    borderRight: '1px solid #DEE2E6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                }}
            >
                <img src={imgUrl} alt="Benefit" width={80} height={80} />
                <Button
                    variant="contained"
                    style={{
                        marginTop: 5,
                        background: 'rgba(255, 99, 94, 0.1)',
                        color: primary,
                    }}
                >
                    Manager
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '10px',
                }}
            >
                <div>
                    <Typography style={{ color: grayText }}>
                        First Name
                    </Typography>
                    <Typography>{employee?.firstName}</Typography>
                    <Typography style={{ color: grayText }}>
                        Employee ID
                    </Typography>
                    <Typography>{employee?.employeeId}</Typography>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '10px',
                }}
            >
                <div>
                    <Typography style={{ color: grayText }}>
                        Last Name
                    </Typography>
                    <Typography>{employee?.lastName}</Typography>
                    <Typography style={{ color: grayText }}>Phone</Typography>
                    <Typography>{employee?.phone}</Typography>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '10px',
                }}
            >
                <div>
                    <Typography style={{ color: grayText }}>Email</Typography>
                    <Typography>{employee?.email}</Typography>
                    <Typography style={{ color: grayText }}>
                        Start Date
                    </Typography>
                    <Typography>
                        {moment(employee?.startDate).format('LL')}
                    </Typography>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    padding: '10px',
                }}
            >
                <Button
                    variant="contained"
                    style={{
                        marginTop: 5,
                        background: 'rgba(255, 99, 94, 0.1)',
                        color: primary,
                    }}
                >
                    More Details
                </Button>
            </div>
        </div>
    );
}
