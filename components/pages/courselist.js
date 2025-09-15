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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddCourse from  '../modals/addnewcourse' ;
import UpdateCourse from '../modals/updatecourse';
import * as PlanStatus from '../../constants/planstatus';
import { drawerBackground, grayText, primary } from '../../constants/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery } from 'react-query';
import CourseService from '../../ApiService/CourseService';
import { errorNotify, successNotify } from '../notifications/notify';

export default function CourseList(props) {
    const [courseModal, setCourseModal] = React.useState(false);
    const [updateCourseModal, setUpdateCourseModal] = React.useState(false);
    const [modalTask, setModalTask] = React.useState('add');
    const [deleteCourseModal, setDeleteCourseModal] = React.useState(false);
    const [deleteCourseId, setDeleteCourseId] = React.useState(null);
    const [courseRows, setCourseRows] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const [editCourseModal, setEditCourseModal] = React.useState(false);
    const [updateCourseId, setUpdateCourseId] = React.useState(null);
    const [updateCourseData, setUpdateCourseData] = React.useState({})

    const { data: courses, refetch: coursesRefetch } = useQuery(
        'courses',
        CourseService.getCourses
    );

    const { mutateAsync: deleteCourse, isSuccess: isCourseDeleted } =
        useMutation(CourseService.deleteCourse, {
            onSuccess: () => {
                setDeleteCourseId(null);
                handleOpenDeleteCourseModal();
                coursesRefetch();
                successNotify('Course has been deleted');
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
            field: 'courseName',
            headerName: 'Name',
            width: 70,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.course_name}`;
            }
        },
        {
            field: 'degreeType',
            headerName: 'Degree Type',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.degree_type}`;
            }
        },
        {
            field: 'interest',
            headerName: 'Interest',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => {
                return `${params.row?.interest}`;
            },
        },
        {
            field: 'institution',
            headerName: 'Institution',
            headerAlign: 'center',
            align: 'center',
            width: 130,
            valueGetter: (params) => `${params.row.institution}`, // must be id
        },
        {
            field: 'language',
            headerName: 'Language',
            headerAlign: 'center',
            align: 'center',
            width: 100,
            valueGetter: (params) => `${params.row.language}`,
        },
        {
            field: 'delivery',
            headerName: 'Delivery',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => `${params.row.delivery}`,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 180,
            headerAlign: 'center',
            align: 'center',
            valueGetter: (params) => `${params.row.location}`,
        },
        {
            field: 'duration',
            headerName: 'Duration',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.duration}`,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.cost}`,
        },
        {
            field: 'link',
            headerName: 'Link',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.link}`,
        },
        {
            field: 'target',
            headerName: 'Target',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.target}`,
        },
        {
            field: 'logoUrl',
            headerName: 'Logo',
            width: 70,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <img
                            src={params.row.logo}
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
            field: 'about',
            headerName: 'About',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.about}`,
        },
        {
            field: 'overview',
            headerName: 'Overview',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.overview}`,
        },
        {
            field: 'applicationDeadlines',
            headerName: 'Deadlines',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.application_deadline}`,
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.start_date}`,
        },
        {
            field: 'tuitionAndFee',
            headerName: 'Tuition and Fee',
            headerAlign: 'center',
            align: 'center',
            width: 140,
            valueGetter: (params) => `${params.row.tuition_and_fees}`,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <Tooltip title={'Update Course'}>
                            <Button
                                onClick={() => {                                    
                                    setUpdateCourseId(params.row._id);
                                    setUpdateCourseData(params.row);
                                    handleUpdateCourse();
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
                        <Tooltip title={'Delete Course'}>
                            <Button
                                onClick={() => {
                                    setDeleteCourseId(params.row._id);
                                    handleOpenDeleteCourseModal();
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

    async function handleDeleteCourse() {
        const course = courses.find((el) => el._id === deleteCourseId);
        if (!course?.bonus) {
            await deleteCourse(deleteCourseId);
        } else {
            console.log('!ifBonus');
            setDeleteCourseId(null);
            handleOpenDeleteCourseModal();
            coursesRefetch();
            errorNotify(
                "You can't remove it, please contact our support to resolve it."
            );
        }
    }

    function handleOpenDeleteCourseModal() {
        setDeleteCourseModal(!deleteCourseModal);
    }

    function handleAddCourse() {
        // open course modal
        setCourseModal(true);
    }

    function handleUpdateCourse() {
        // open course modal
        setUpdateCourseModal(true);
    }

    function handleCloseUpdateCourse() {
        // open course modal
        setUpdateCourseModal(false);
    }

    function handleCloseCourse() {
        // open course modal
        setCourseModal(false);
    }

    React.useEffect(() => {
        if (!courses) return;
        const rowsData = courses.map((el) => {
            return {
                id: el._id,
                ...el,
            };
        });
        console.log('COURSES: ', rowsData);
        setCourseRows(rowsData);
        console.log('rows:', courseRows);
    }, [courseModal, courses]);

    /** 
     * const [initialValues, setInitialValues] = useState({})
    */

    return (
        <>
            <div>
                <Dialog open={courseModal} onClose={handleCloseCourse} maxWidth='lg'>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please enter the course details and click save to
                            add a new course
                        </DialogContentText>
                        <AddCourse
                            setCourseModal={setCourseModal}
                            handleCloseCourse={handleCloseCourse}
                            coursesRefetch={coursesRefetch}
                        />
                    </DialogContent>
                </Dialog>                
                <Dialog open={updateCourseModal} onClose={handleCloseUpdateCourse} maxWidth='lg'>
                    <DialogTitle>Update Course</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Please edit the course details and click update to
                            update the course
                        </DialogContentText>
                        <UpdateCourse
                            editableData = {updateCourseData}
                            setUpdateCourseData = {setUpdateCourseData}
                            setCourseModal={setUpdateCourseModal}
                            handleCloseCourse={handleCloseUpdateCourse}
                            coursesRefetch={coursesRefetch}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={deleteCourseModal}
                    onClose={handleOpenDeleteCourseModal}
                >
                    <DialogTitle>Delete course</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom>
                            Are you sure you want to delete this course?
                        </DialogContentText>
                        <Grid container mt={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" justifyContent="end">
                                    <Button
                                        onClick={handleOpenDeleteCourseModal}
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
                                        onClick={handleDeleteCourse}
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
                    rows={courseRows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    // checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = courseRows.filter((row) =>
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
                    onClick={handleAddCourse}
                >
                    <AddIcon fontSize="small" style={{ marginRight: 5 }} />
                    Add Course
                </Button>
            </Box>
        </>
    );
}
