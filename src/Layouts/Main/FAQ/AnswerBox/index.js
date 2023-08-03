import { Box, Button, Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../../constants/Colors";

const QuestionDisplay = ({ answer }) => {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                border: `1px solid ${Colors.primaryColor}`,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                padding: '1rem',
                margin: '1rem 0',
                borderRadius: '5px',
            }}
        >
            <Typography
                sx={{
                    fontFamily: "Inria Sans",
                    color: Colors.primaryColor,
                    fontWeight: "700",
                    fontSize: { md: "1.5rem", xs: "1.2rem" },
                    marginBottom: '1rem',
                }}
            >
                {question.answerBody}

            </Typography>
            <Typography
                sx={{
                    fontFamily: "Inria Sans",
                    color: Colors.primaryColor,
                    fontWeight: "600",
                    fontSize: { md: "1rem", xs: "1.2rem" },
                    marginBottom: '1rem',
                }}
            >
                By:  {question.userName}
            </Typography>
        </Box>
    );
}

export default QuestionDisplay;
