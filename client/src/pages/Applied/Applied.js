import React, { useEffect, useState, useContext } from 'react';
import API from '../../utils/API';
import BENCHMARKS from '../../utils/PassportAPI';
import Accordion from '../../components/Accordion/index';
import ResponsiveDrawer from "../../components/SideBar/SideBar";
import { makeStyles } from '@material-ui/core';
import { userContext } from '../../App';

//styling
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

function Applied() {

    //set classes
    const classes = useStyles();

    //set states
    const [jobs, setJobs] = useState([]);

    //set user
    const { user } = useContext(userContext);

    //manage state to update status of job in accordion
    const handleJobStatusUpdate = (index, status) => {
        const updatedJobs = [...jobs];
        updatedJobs[index].status = status;
        setJobs(updatedJobs);
        //increment and decrement according to user's application statuses for benchmarks
        if (status === "Viewed") {
            return (BENCHMARKS.incrementUserValue("jobs_pending"))
        }
        if (status === "Applied") {
            BENCHMARKS.incrementUserValue("jobs_applied")
                .then(BENCHMARKS.decrementUserValue())
        }
        if (status === "Interviewed") {
            BENCHMARKS.incrementUserValue("jobs_interviewed")
                .then(BENCHMARKS.decrementUserValue())
        }
        if (status === "Thank You Letter Sent") {
            BENCHMARKS.incrementUserValue("jobs_lettersent")
                .then(BENCHMARKS.decrementUserValue())
        }
        if (status === "Received Offer") {
            BENCHMARKS.incrementUserValue("jobs_offered")
                .then(BENCHMARKS.decrementUserValue())
        }
        if (status === "Not Selected") {
            BENCHMARKS.incrementUserValue("jobs_rejected")
                .then(BENCHMARKS.decrementUserValue())
        }
        if (status === "No Response") {
            BENCHMARKS.incrementUserValue("jobs_noresponse")
                .then(BENCHMARKS.decrementUserValue())
        }
        if (status === "Accepted") {
            BENCHMARKS.incrementUserValue("jobs_accepted")
                .then(BENCHMARKS.decrementUserValue())
        }
    }

    //use effect for api calls
    useEffect(() => {
        //get applications from current user
        API.getApplications(user.id)
            .then(res => setJobs(res.data.map(job => (
                job))))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={classes.root}>
            <ResponsiveDrawer />
            <div>
                {jobs ? jobs.map((job, index) => (
                    <Accordion
                        key={job.id}
                        indexPosition={index}
                        jobInfo={job}
                        page="applied"
                        setJobs={setJobs}
                        onJobStatusUpdate={handleJobStatusUpdate}
                    />
                )) : null}
            </div>
        </div>
    )
};

export default Applied;