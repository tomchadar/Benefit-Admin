import React, {useState} from 'react'
import {Typography} from "@mui/material";
import {helpBorderColor} from "../../constants/colors";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const FAQCard = ({question, answer}) => {
    const [show, setShow] = useState(false)
    return (
        <div style={{ borderBottom: `1px solid ${helpBorderColor}`, flexDirection: 'row', display: 'flex', marginBottom: 20 }}>
            <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
                <Typography variant="h5" component="h6" style={{ paddingBottom: 20 }}>
                    {question}
                </Typography>
                {
                    show ?
                        <Typography variant="body1" component="h6" style={{ paddingBottom: 10, whiteSpace: 'pre-line' }}>
                            {answer}
                        </Typography>
                        : null
                }
            </div>
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                {
                    show ? <RemoveCircleOutlineIcon onClick={() => setShow(!show)} /> : <AddCircleOutlineIcon onClick={() => setShow(!show)} />
                }
            </div>
        </div>
    )
}
