import { Grid, Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Pages from '../../constants/pages';
import { Stepper, Step, StepLabel } from '@mui/material';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useMutation } from 'react-query';
import EmployeeService from '../../ApiService/EmployeeService';
import { errorNotify, successNotify } from '../notifications/notify';

const steps = ['Create Plan', 'Plan Summary', 'Send To Employee'];
const DATE_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

export default function CreatePlanSummary(props) {
    const { user, savePlan, isCreatePlan, setIsCreatePlan } =
        useContext(AuthContext);

    const { mutateAsync: createBonus } = useMutation(
        EmployeeService.createBonusPlan,
        {
            onSuccess: async (data) => {
                console.log(data);
                await successNotify('Bonus plan has been created!');
                props.setCurrentPage(Pages.CREATEPLAN_PAGE_3);
            },
            onError: (error) => {
                errorNotify('Something went wrong');
            },
        }
    );

    const { mutateAsync: updateBonus } = useMutation(
        EmployeeService.updateBonusPlan,
        {
            onSuccess: async (data) => {
                console.log(data);
                await successNotify('Bonus plan has been updated!');
                setIsCreatePlan(true);
                props.setCurrentPage(Pages.CREATEPLAN_PAGE_3);
            },
            onError: (error) => {
                errorNotify('Something went wrong');
            },
        }
    );

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography
                    variant="h4"
                    component="h6"
                    style={{ paddingBottom: 20 }}
                >
                    Vesting Plan Summary
                </Typography>

                <Stepper
                    activeStep={1}
                    alternativeLabel
                    style={{ paddingBottom: 30 }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
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
                            justifyContent: 'center',
                            padding: '10px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flex: 1,
                                borderBottomStyle: 'solid',
                                borderBottom: '1px solid #DEE2E6',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                padding: '5px',
                            }}
                        >
                            <img
                                src={imgUrl}
                                alt="Benefit"
                                style={{ borderRadius: 200, marginRight: 20 }}
                                width={80}
                                height={80}
                            />
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {props.employee[0].firstName +
                                    ' ' +
                                    props.employee[0].lastName}
                            </Typography>
                        </div>
                        <div>
                            <Typography style={{ color: grayText }}>
                                Email
                            </Typography>
                            <Typography>{props.employee[0].email}</Typography>
                            <Typography style={{ color: grayText }}>
                                Phone
                            </Typography>
                            <Typography>{props.employee[0].phone}</Typography>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            padding: '5px',
                            marginRight: 10,
                            marginLeft: 10,
                            background:
                                'linear-gradient(114.6deg, rgba(248, 249, 250, 0) 0.94%, #F8F9FA 99.8%)',
                            border: '1px solid #F1F3F5',
                        }}
                    >
                        <div>
                            <Typography style={{ color: grayText }}>
                                Vesting Plan Amount
                            </Typography>
                            <Typography>
                                {parseFloat(props.plan.amount).toLocaleString(
                                    'en-US',
                                    {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }
                                )}
                            </Typography>
                            <Typography style={{ color: grayText }}>
                                Vesting Plan Start Date
                            </Typography>
                            <Typography>
                                {props.plan.startDate.toLocaleDateString(
                                    'en-US',
                                    DATE_OPTIONS
                                )}
                            </Typography>
                            <Typography style={{ color: grayText }}>
                                Vesting Plan End Date
                            </Typography>
                            <Typography>
                                {props.plan.endDate.toLocaleDateString(
                                    'en-US',
                                    DATE_OPTIONS
                                )}
                            </Typography>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            padding: '5px',
                            background:
                                'linear-gradient(114.6deg, rgba(248, 249, 250, 0) 0.94%, #F8F9FA 99.8%)',
                            border: '1px solid #F1F3F5',
                        }}
                    >
                        <div>
                            <Typography style={{ color: grayText }}>
                                Vesting Period
                            </Typography>
                            <Typography>
                                {props.plan.vestingOptionsDesc}
                            </Typography>
                            <Typography style={{ color: grayText }}>
                                Vesting Frequency
                            </Typography>
                            <Typography>
                                {props.plan.vestingFreqDesc}
                            </Typography>
                            <Typography style={{ color: grayText }}>
                                Vesting Cliff
                            </Typography>
                            <Typography>
                                {props.plan.vestingCliffDesc}
                            </Typography>
                        </div>
                    </div>
                </div>

                <Button
                    variant="outlined"
                    style={{
                        marginTop: 20,
                        marginRight: 10,
                        borderColor: grayText,
                        color: drawerBackground,
                    }}
                    onClick={() => {
                        props.setCurrentPage(Pages.CREATEPLAN_PAGE);
                    }}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    style={{ marginTop: 20, background: primary }}
                    onClick={async () => {
                        if (isCreatePlan) {
                            await createBonus(savePlan);
                        } else {
                            await updateBonus(savePlan);
                        }
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </>
    );
}
