import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../../components/PageHeader";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/all-jobs/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status}`);
        }
        
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "Enter Your Resume Link",
      inputPlaceholder: "Enter the Link",
    });

    if (url) {
      Swal.fire(`Successfully Applied to Job Id: ${id}`, "success");
    }
  };

  if (loading) return <div className="text-center py-10">Loading job details...</div>;
  
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  if (!job || Object.keys(job).length === 0) {
    return <div className="text-center py-10">No job details found</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Single Job Page"} path={"Single Job"} />
      <div className="pt-16">
        <h2>
          <span className="text-xl font-bold text-blue">Job Details: </span>
          {id}
        </h2>
        <h1>
          <span className="text-xl font-display text-gray-900">
            {job.jobTitle}
          </span>
        </h1>
        
        {/* Add more job details here */}
        <div className="my-5">
          <p><strong>Company:</strong> {job.companyName}</p>
          <p><strong>Location:</strong> {job.jobLocation}</p>
          <p><strong>Employment Type:</strong> {job.employmentType}</p>
          <p><strong>Salary Range:</strong> ${job.minPrice} - ${job.maxPrice} ({job.salaryType})</p>
          <p><strong>Posted on:</strong> {job.postingDate}</p>
        </div>
        
        <div className="my-5">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p>{job.description}</p>
        </div>
      </div>
      
      <button className="bg-blue px-8 py-2 text-white my-5" onClick={handleApply}>
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;