import React, { useState } from "react";
import API from "../../utils/API";

function JobCard({ jobInfo, applied }) {

    // set states
    const [shown, setShown] = useState(false);

    // event functions
    function createMarkup() {
        return { __html: jobInfo.description };
    }

    function handleShown() {
        setShown(!shown);
    }

    function handleSave(event) {
        event.preventDefault();
        window.open(jobInfo.url);

        // only add to database if it doesn't exist in applied array
        if (!applied.includes(jobInfo.id.toString())) {
            // add to applied array after click
            applied.push(jobInfo.id.toString());
            // save application to database
            API.saveApplication({
                job_id: jobInfo.id,
                job_title: jobInfo.title,
                company_name: jobInfo.company_name,
                job_link: jobInfo.url,
                status: "pending",
                UserId: "abc123"
            }).then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{jobInfo.title}</h4>
                <h4>{jobInfo.company_name}</h4>
                {shown ? <div dangerouslySetInnerHTML={createMarkup()}></div> : null}


                {!shown ? <button className="btn btn-primary" onClick={handleShown}>Show more</button> : null}
                {shown ? <button className="btn btn-primary" onClick={handleShown}>Show less</button> : null}
                <button className="btn btn-primary" onClick={handleSave}>Apply now!</button>
            </div>
        </div>
    )
}

export default JobCard;