import { Box, Button, Typography, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../../constants/Colors";

const QuestionBox = ({ question }) => {

    const navigate = useNavigate();
    const formattedDate = question.timeStamp ? question.timeStamp.toDate().toLocaleDateString() : "Error cannot find date";

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
                }}
            >
                {question.questionTitle}

            </Typography>
            <Typography
                sx={{
                    fontFamily: "Inria Sans",
                    color: Colors.primaryColor,
                    fontWeight: "400",
                    fontSize: { md: "1rem", xs: "1.2rem" },
                }}
            >
                Posted on: {formattedDate}
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
            <Button
                variant="contained"
                onClick={() => navigate(`/questions/${question.id}`)}
                sx={{
                    backgroundColor: Colors.primaryColor,
                    color: Colors.white,
                    "&:hover": {
                        backgroundColor: Colors.primaryColorDark
                    },
                }}
            >
                See the Question and Answers
            </Button>
        </Box>
    );
}

export default QuestionBox;
