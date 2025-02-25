import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdoptionRequest = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchAdoptionRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosSecure.get('/adopts/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdoptionRequests(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching adoption requests:', err);
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosSecure.delete(`/adopts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert('Adoption request rejected and deleted successfully.');
        fetchAdoptionRequests(); // Refresh the list
      }
    } catch (err) {
      console.error('Error rejecting adoption request:', err);
      alert('Failed to reject the adoption request.');
    }
  };

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  if (loading) return <div>Loading adoption requests...</div>;

  if (!adoptionRequests.length) {
    return <div>No adoption requests found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Adoption Requests</h2>
      <table className="table-auto w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Pet Name</th>
            <th className="p-2 border">Requester Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {adoptionRequests.map((request) => (
            <tr key={request._id} className="text-center">
              <td className="p-2 border">{request.petName}</td>
              <td className="p-2 border">{request.userName}</td>
              <td className="p-2 border">{request.userEmail}</td>
              <td className="p-2 border">{request.phone}</td>
              <td className="p-2 border">{request.address}</td>
              <td className="p-2 border">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleReject(request._id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequest;


